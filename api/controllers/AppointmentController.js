const db = global.db;

exports.createAppointment = async (req, res) => {
  try {
    console.log("🟢 Received appointment request:", req.body);

    if (!db) {
      console.error("❌ Database connection is NOT available (global.db is undefined)");
      return res.status(500).json({ error: "Database connection error" });
    }

    const { patient_id, doctor_id, clinic_id, appointment_date_time, status } = req.body;

    // ✅ Convert ISO DateTime to MySQL DATETIME format
    const formattedDateTime = new Date(appointment_date_time)
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    if (!patient_id || !doctor_id || !clinic_id || !appointment_date_time || !status) {
      return res.status(400).json({ error: "All fields are required" });
    }

    console.log("🟢 Database Connection Available, Inserting Appointment...");

    // ✅ Use formattedDateTime in the query
    const [result] = await db.query(
      "INSERT INTO Appointment (patient_id, doctor_id, clinic_id, appointment_date_time, status) VALUES (?, ?, ?, ?, ?)",
      [patient_id, doctor_id, clinic_id, formattedDateTime, status]
    );

    console.log("✅ Appointment Created, ID:", result.insertId);
    res.json({ message: "✅ Appointment booked successfully", appointment_id: result.insertId });
  } catch (err) {
    console.error("❌ Error creating appointment:", err.message);
    res.status(500).json({ error: "Internal server error", details: err.message });
  }
};

exports.getAppointments = async (req, res) => {
  try {
    if (!db) {
      console.error("❌ Database connection is NOT available");
      return res.status(500).json({ error: "Database connection error" });
    }

    console.log("🟢 Fetching all appointments...");
    const [appointments] = await db.query("SELECT * FROM Appointment");

    res.json({ appointments });
  } catch (err) {
    console.error("❌ Error fetching appointments:", err.message);
    res.status(500).json({ error: "Internal server error", details: err.message });
  }
};
