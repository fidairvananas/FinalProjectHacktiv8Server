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
        },
        {
          model: Dealer,
        },
        {
          model: Brand,
        },
      ],
    });

    if (!car) {
      throw {
        code: 404,
        name: "NOT_FOUND",
        message: "Car not found.",
      };
    }

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
          brand: car.Brand.name,
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
        "permata_va",
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
        va_number: "125" + phoneNumber,
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
        va_number: "145" + phoneNumber,
      },
      permata_va: {
        va_number: "165" + phoneNumber,
      },
      callbacks: {
        finish: "https://demo.midtrans.com",
      },
      expiry: {
        start_time: new Date(),
        unit: "minutes",
        duration: 1,
      },
      custom_field1: notes ? notes : "",
    };

    const { data } = await midtrans.post("snap/v1/transactions/", payload);

    if (!data) {
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
      broughtDate: new Date(),
      paidOff: true,
      price: car.price,
      BuyerId: buyerId,
      orderId,
      installment: installment ? true : false,
      currentInstallment: 1
    })

    res.status(200).json({ message: "Transastion has been succeed." });
    await t.commit();
  } catch (err) {
    await t.rollback();
    next(err);
  }
};

module.exports = { payment };
