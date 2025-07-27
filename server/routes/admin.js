import express from "express";
import jwt from "jsonwebtoken";
import { Feedback } from "../models/Feedback.js";
import { Admin } from "../models/Admin.js";
import { authenticateToken } from "../middleware/auth.js";
import bcrypt from "bcryptjs";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign(
      { username: admin.username, role: "admin" },
      JWT_SECRET,
      { expiresIn: "24h" }
    );
    res.json({ token, message: "Login successful" });
  } catch (err) {
    console.error("Admin login error:", err);
    res.status(500).json({ error: "Server error during login" });
  }
});

router.get("/feedbacks", authenticateToken, async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (error) {
    console.error("Error fetching feedbacks:", error);
    res.status(500).json({ error: "Server error while fetching feedbacks" });
  }
});

// Delete feedback by ID
router.delete("/feedbacks/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Feedback.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: "Feedback not found" });
    }
    res.json({ message: "Feedback deleted successfully" });
  } catch (error) {
    console.error("Error deleting feedback:", error);
    res.status(500).json({ error: "Server error while deleting feedback" });
  }
});

export default router;