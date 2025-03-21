const express = require("express");
const router = express.Router();

// ✅ Ensure DB Connection
if (!global.db) {
  console.error("❌ Database connection is NOT established.");
}

// ✅ Fetch All Clinics
router.get("/", async (req, res) => {
  try {
    if (!global.db) {
      return res.status(500).json({ error: "Database connection error." });
    }

    const [results] = await global.db.query("SELECT * FROM Clinic");

    if (results.length === 0) {
      return res.status(404).json({ error: "No clinics found." });
    }

    res.json(results);
  } catch (err) {
    console.error("❌ Error fetching clinics:", err.message);
    res.status(500).json({ error: "Internal server error", details: err.message });
  }
});

// ✅ Fetch Doctors by Clinic ID
router.get("/:clinic_id/doctors", async (req, res) => {
  try {
    if (!global.db) {
      return res.status(500).json({ error: "Database connection error." });
    }

    const clinicId = req.params.clinic_id;
    const [results] = await global.db.query(
      "SELECT * FROM Doctor WHERE clinic_id = ?",
      [clinicId]
    );

    if (results.length === 0) {
      return res.status(404).json({ error: "No doctors found for this clinic." });
    }

    res.json(results);
  } catch (err) {
    console.error("❌ Error fetching doctors:", err.message);
    res.status(500).json({ error: "Internal server error", details: err.message });
  }
});

module.exports = router;
