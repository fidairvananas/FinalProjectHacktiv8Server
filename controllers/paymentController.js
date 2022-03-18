const midtrans = require("../API/MidtransAPI");
const { BoughtHistory, Buyer, Car, Dealer, Type, Brand, sequelize } = require("../models");

const payment = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const { quantity, carId, buyerId, notes, installment} = req.body;

    if (!quantity) {
      throw {
        code: 400,
        name: "FORBIDDEN",
        message: "Quantity can't be empty.",
      };
    }

    const buyer = await Buyer.findByPk(buyerId);

    if (!buyer) {
      throw {
        code: 404,
        name: "NOT_FOUND",
        message: "Please register first before buy.",
      };
    }

    const car = await Car.findOne({
      where: {
        id: carId,
      },
      include: [
        {
          model: Type,
          include: {
            model: Brand
          }
        },
        {
          model: Dealer,
        }
      ],
    });

    if (!car || car.status == 'sold') {
      throw {
        code: 404,
        name: "NOT_FOUND",
        message: "Car not found.",
      };
    }

    const history = await BoughtHistory.findAll()
    let orderId;
    
    if (!history.length) {
      orderId = 'JMB-' + 1 + '-' + new Date().getTime()
    } else {
      let num = history[history.length - 1].id + 1
      orderId = 'JMB-' + num + '-' + new Date().getTime()
    }

    
    const date = new Date().toISOString().split('T').join(' ').split('.')[0] + ' +0700'

    const payload = {
      transaction_details: {
        order_id: orderId,
        gross_amount: car.price,
      },
      item_details: [
        {
          id: carId,
          price: car.price,
          quantity: quantity,
          name: car.name,
          brand: car.Type.Brand.name,
          category: car.Type.modelName,
          merchant_name: car.Dealer.name,
        },
      ],
      customer_details: {
        username: buyer.username,
        email: buyer.email,
        phone: buyer.phoneNumber,
        shipping_address: {
          name: buyer.username,
          email: buyer.email,
          phone: buyer.phoneNumber,
          address: buyer.address,
        },
      },
      enabled_payments: [
        "credit_card",
        "mandiri_clickpay",
        "cimb_clicks",
        "bca_klikbca",
        "bca_klikpay",
        "bri_epay",
        "echannel",
        "mandiri_ecash",
        "bca_va",
        "bni_va",
        "other_va",
        "gopay",
        "indomaret",
        "alfamart",
        "danamon_online",
        "akulaku",
      ],
      credit_card: {
        secure: true,
        installment: {
          required: true,
          terms: {
            bni: [12, 24, 36, 48, 60],
            mandiri: [12, 24, 36, 48, 60],
            cimb: [12, 24, 36, 48, 60],
            bca: [12, 24, 36, 48, 60],
            offline: [12, 24, 36, 48, 60],
          },
        },
      },
      schedule: {
        interval: 1,
        interval_unit: "month",
        max_interval: 60,
        start_time: new Date(),
      },
      bca_va: {
        va_number: "125" + buyer.phoneNumber,
        sub_company_code: "00000",
        free_text: {
          inquiry: [
            {
              en: "text in English",
              id: "text in Bahasa Indonesia",
            },
          ],
          payment: [
            {
              en: "text in English",
              id: "text in Bahasa Indonesia",
            },
          ],
        },
      },
      bni_va: {
        va_number: "145" + buyer.phoneNumber,
      },
      callbacks: {
        finish: "https://demo.midtrans.com",
      },
      expiry: {
        start_time: '2022-04-17 19:31:01 +0700',
        unit: "minutes",
        duration: 1,
      },
      custom_field1: notes ? notes : "",
    };

    const {data} = await midtrans.post("snap/v1/transactions/", payload);

    if (!data.token) {
      throw {
        code: 403,
        name: "FORBIDDEN",
        message: "Access denied.",
      };
    }

    await Car.update(
      {
        status: "sold",
      },
      {
        where: {
          id: carId,
        },
        transaction: t,
      }
    );

    await BoughtHistory.create({
      carName: car.name,
      description: car.description,
      boughtDate: new Date(),
      paidOff: true,
      price: car.price,
      BuyerId: buyerId,
      orderId,
      installment: installment ? true : false,
      currentInstallment: installment ? 1 : 0
    })

    res.status(200).json({ message: "Transastion has been succeed.", paymentUrl: data.redirect_url });
    await t.commit();
  } catch (err) {
    await t.rollback();
    next(err);
  }
};

module.exports = { payment };
