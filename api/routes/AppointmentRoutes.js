const express = require("express");
const router = express.Router();
const appointmentController = require("../controllers/appointmentController"); // ✅ Ensure correct path

// ✅ Check if controller functions exist before using them
if (!appointmentController.createAppointment || !appointmentController.getAppointments) {
  console.error("❌ Appointment Controller methods are undefined! Check appointmentController.js.");
}

// ✅ Define Routes
router.post("/", appointmentController.createAppointment);
router.get("/", appointmentController.getAppointments);

module.exports = router;
