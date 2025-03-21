const db = global.db; // Ensure global database connection

exports.createAppointment = async (patient_id, doctor_id, clinic_id, appointment_date_time, status) => {
  try {
    const [result] = await db.query(
      "INSERT INTO Appointment (patient_id, doctor_id, clinic_id, appointment_date_time, status) VALUES (?, ?, ?, ?, ?)",
      [patient_id, doctor_id, clinic_id, appointment_date_time, status]
    );
    return result.insertId;
  } catch (error) {
    console.error("❌ Error inserting appointment:", error.message);
    throw error;
  }
};

exports.getAppointmentsByPatient = async (patient_id) => {
  try {
    const [appointments] = await db.query(
      "SELECT * FROM Appointment WHERE patient_id = ?",
      [patient_id]
    );
    return appointments;
  } catch (error) {
    console.error("❌ Error fetching patient appointments:", error.message);
    throw error;
  }
};

exports.getAppointmentsByDoctor = async (doctor_id) => {
  try {
    const [appointments] = await db.query(
      "SELECT * FROM Appointment WHERE doctor_id = ?",
      [doctor_id]
    );
    return appointments;
  } catch (error) {
    console.error("❌ Error fetching doctor appointments:", error.message);
    throw error;
  }
};

exports.get
