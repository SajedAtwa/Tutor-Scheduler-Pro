require("dotenv").config();

const express = require("express");
const cors = require("cors");

const customerRoutes = require("./routes/customerRoutes");
const providerRoutes = require("./routes/providerRoutes");
const reportRoute = require("./routes/reportRoute");

const { errorHandler, notFound } = require("./middlewares/errorMiddleware");

const app = express();

/* ==============================
   Middleware
================================ */
app.use(express.json());
app.use(
  cors({
    origin: (origin, cb) => {
      // allow server-to-server + curl/postman (no origin)
      if (!origin) return cb(null, true);

      const allowed = [
        process.env.FRONTEND_URL,          // e.g. https://tutor-scheduler-pro-mauve.vercel.app
      ].filter(Boolean);

      if (allowed.includes(origin)) return cb(null, true);
      return cb(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);
/* ==============================
   Health Check (VERY IMPORTANT)
   Helps verify Railway deploy
================================ */
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

/* ==============================
   API Routes
================================ */
app.use("/api/users", customerRoutes);
app.use("/api/providers", providerRoutes);
app.use("/api/report", reportRoute);

/* ==============================
   Basic test routes
================================ */
app.get("/", (req, res) => {
  res.send("<h1>Tutor Scheduler Pro API</h1>");
});

app.get("/test", (req, res) => {
  res.send("Test route works!");
});

/* ==============================
   Error Handling
================================ */
app.use(notFound);
app.use(errorHandler);

/* ==============================
   Start Server (Railway-safe)
================================ */
const { initDb } = require("./db/initDb");

const PORT = process.env.PORT || 3001;

(async () => {
  try {
    await initDb();             // ✅ auto-create tables
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to init DB:", err);
    process.exit(1);
  }
})();