const router = require("express").Router();

const { payment, firstInstallment, nextInstallment, status, updatePayment } = require("../controllers/paymentController");

router.post("/", payment);
router.get('/status', status)
router.patch('/update/:id', updatePayment)
router.post('/credits/cars', nextInstallment )
router.post('/credits/:id', firstInstallment )

module.exports = router;
