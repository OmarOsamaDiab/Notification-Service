const router = require("express").Router();
const notificationControllers = require("../controllers/notification.controllers.js");

router.post('/send', notificationControllers.send)
module.exports = router