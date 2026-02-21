const express = require("express");
const router = express.Router();
const db = require("../config/database");
const ExcelJS = require("exceljs");

// Helper: revenue grouped by service_type
async function revenueByServiceType(serviceType) {
  const [rows] = await db.query(
    `
    SELECT 
      s.service_type,
      COUNT(b.id) AS total_bookings,
      COALESCE(SUM(c.cost), 0) AS total_revenue
    FROM booking b
    JOIN class c ON c.id = b.class_id
    JOIN service s ON s.id = c.service_id
    WHERE LOWER(s.service_type) = LOWER(?)
    `,
    [serviceType]
  );
  return rows;
}

// Helper: total revenue overall
async function totalRevenue() {
  const [rows] = await db.query(
    `
    SELECT 
      COALESCE(SUM(c.cost), 0) AS total_revenue,
      COUNT(b.id) AS total_bookings
    FROM booking b
    JOIN class c ON c.id = b.class_id
    `
  );
  return rows;
}

// Helper: total orders/bookings grouped by service_type
async function totalOrdersByService() {
  const [rows] = await db.query(
    `
    SELECT 
      s.service_type,
      COUNT(b.id) AS total_bookings,
      COALESCE(SUM(c.cost), 0) AS total_revenue
    FROM booking b
    JOIN class c ON c.id = b.class_id
    JOIN service s ON s.id = c.service_id
    GROUP BY s.service_type
    ORDER BY total_bookings DESC
    `
  );
  return rows;
}

// Helper: bookings in a specific month (1-12)
async function totalOrdersByMonth(month) {
  const [rows] = await db.query(
    `
    SELECT 
      s.service_type,
      COUNT(b.id) AS total_bookings,
      COALESCE(SUM(c.cost), 0) AS total_revenue
    FROM booking b
    JOIN class c ON c.id = b.class_id
    JOIN service s ON s.id = c.service_id
    WHERE MONTH(b.created_at) = ?
    GROUP BY s.service_type
    ORDER BY total_bookings DESC
    `,
    [month]
  );
  return rows;
}

router.get("/download-excel", async (req, res) => {
  try {
    // ✅ Replace hardcoded weird categories with actual ones in your app:
    // Math, English, Science, History, Foreign Language
    const serviceTypes = ["Math", "English", "Science", "History", "Foreign Language"];

    const totalRevenueResults = await totalRevenue();
    const totalOrdersResults = await totalOrdersByService();

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Report");

    worksheet.columns = [
      { header: "Total Revenue", key: "total_revenue", width: 18 },
      { header: "Service Type", key: "service_type", width: 22 },
      { header: "Total Bookings", key: "total_bookings", width: 15 },
    ];

    const addSection = (title, data, color = "FFD9D9D9") => {
      worksheet.addRow([title, "---", "---"]).font = { bold: true };
      worksheet.lastRow.fill = { type: "pattern", pattern: "solid", fgColor: { argb: color } };

      data.forEach((row) => {
        worksheet.addRow({
          total_revenue: row.total_revenue,
          service_type: row.service_type ?? "N/A",
          total_bookings: row.total_bookings ?? "N/A",
        });
      });

      worksheet.addRow([]);
    };

    // Total revenue section
    addSection(
      "Total Revenue (All)",
      totalRevenueResults.map((r) => ({
        total_revenue: r.total_revenue,
        service_type: "ALL",
        total_bookings: r.total_bookings,
      })),
      "FFF0F0F0"
    );

    // Revenue per service type
    for (const st of serviceTypes) {
      const rows = await revenueByServiceType(st);
      addSection(`Revenue by ${st}`, rows.length ? rows : [{ total_revenue: 0, service_type: st, total_bookings: 0 }], "FFCCFFFF");
    }

    // Month breakdown
    for (let month = 1; month <= 12; month++) {
      const rows = await totalOrdersByMonth(month);
      addSection(`Orders in Month ${month}`, rows, "FFCCFFFF");
    }

    // Total orders section
    addSection("Total Orders (Grouped by Service)", totalOrdersResults, "FFF0F0F0");

    const buffer = await workbook.xlsx.writeBuffer();

    res.header("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    res.header("Content-Disposition", 'attachment; filename="report.xlsx"');
    res.send(buffer);
  } catch (error) {
    console.error("Detailed Error:", error);
    res.status(500).json({ message: "Error generating Excel file", error: error.message });
  }
});

module.exports = router;