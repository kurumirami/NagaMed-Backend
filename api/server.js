const express = require("express");
const dotenv = require("dotenv").config();
const mysql = require("mysql2/promise");
const cors = require("cors");

const authController = require("./controllers/authController");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
};

async function connectDB() {
  try {
    global.db = await mysql.createPool(dbConfig);
    console.log("Connected to MySQL Database");

    const clinicsRouter = require("./routes/ClinicsRoutes");
    const doctorsRouter = require("./routes/DoctorsRoutes");
    const appointmentsRouter = require("./routes/AppointmentRoutes");

    app.use("/api/clinics", clinicsRouter);
    app.use("/api/doctors", doctorsRouter);
    app.use("/api/appointments", appointmentsRouter);
    app.post("/register", authController.register);
    app.post("/login", authController.login);

    const PORT = process.env.PORT || 8080;
    app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error("Database Connection Error:", error.message);
    process.exit(1);
  }
}

connectDB();
