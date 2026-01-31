const express = require("express");
const axios = require("axios");
const ML_BASE_URL = process.env.ML_SERVICE_URL || "http://127.0.0.1:8000";
const mlClient = axios.create({ baseURL: ML_BASE_URL, timeout: 5000 });

const router = express.Router();

// Health check proxy for ML service
router.get("/health", async (req, res) => {
  try {
    const r = await mlClient.get("/");
    res.json({ ok: true, ml: r.data });
  } catch (err) {
    console.error("ML health check failed:", err.message || err);
    const status = err.response ? err.response.status : 500;
    const body = err.response ? err.response.data : { message: err.message };
    res.status(status).json({ ok: false, error: body });
  }
});

// Sentiment prediction
router.post("/sentiment", async (req, res) => {
  try {
    const { text } = req.body;

    // call the ML Flask service via configured client
    const response = await mlClient.post(
      "/predict/sentiment",
      { text }
    );
    res.json({
      success: true,
      model: "sentiment",
      result: response.data
    });
  } catch (error) {
    // better error logging
    console.error(error.response ? error.response.data : error.message);
    const status = error.response ? error.response.status : 500;
    const message = error.response ? error.response.data : { message: "ML service error" };
    res.status(status).json({
      success: false,
      message
    });
  }
});

// Selection prediction
router.post("/selection", async (req, res) => {
  try {
    const { text } = req.body;

    // call the ML Flask service via configured client
    const response = await mlClient.post(
      "/predict/selection",
      { text }
    );

    res.json({
      success: true,
      model: "selection",
      result: response.data
    });
  } catch (error) {
    // better error logging
    console.error(error.response ? error.response.data : error.message);
    const status = error.response ? error.response.status : 500;
    const message = error.response ? error.response.data : { message: "ML service error" };
    res.status(status).json({
      success: false,
      message
    });
  }
});

module.exports = router;
