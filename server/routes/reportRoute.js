const express = require('express');
const router = express.Router();
const db = require('../config/database');
const ExcelJS = require('exceljs');

router.get('/download-excel', async (req, res) => {
    try {
        // Execute stored procedures for total revenue and service types
        const [totalRevenueResults] = await db.query('CALL totalRevenue();');
        const [revenueByFightClubResults] = await db.query('CALL totalRevenueByServiceType(?);', ['fight club']);
        const [revenueByFinancialAdvResults] = await db.query('CALL totalRevenueByServiceType(?);', ['financial advisement']);
        const [revenueByHomeFlavorsResults] = await db.query('CALL totalRevenueByServiceType(?);', ['home flavors']);
        const [totalOrdersResults] = await db.query('CALL totalOrdersByService();');

        // Create a new workbook and a worksheet
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Report');

        // Define columns
        worksheet.columns = [
            { header: 'Total Revenue', key: 'total_revenue', width: 18, style: { alignment: { horizontal: 'right' } } },
            { header: 'Service Type', key: 'service_type', width: 20 },
            { header: 'Total Bookings', key: 'total_bookings', width: 15, style: { alignment: { horizontal: 'right' } } }
        ];

        // Function to add section with formatting
        const addSection = (title, data, color = 'FFD9D9D9') => {
            worksheet.addRow([title, '---', '---']).font = { bold: true };
            worksheet.lastRow.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: color } };
            data.forEach(row => worksheet.addRow(row).commit());
            worksheet.addRow([]); // Adds a blank row after the section
        };

        // Add total revenue and revenues by service type
        addSection('Total Revenue', totalRevenueResults[0].map(row => ({ total_revenue: row.total_revenue, service_type: 'N/A', total_bookings: 'N/A' })), 'FFF0F0F0');
        addSection('Revenue by Fight Club', revenueByFightClubResults[0].map(row => ({ total_revenue: row.total_revenue, service_type: 'fight club', total_bookings: 'N/A' })), 'FFCCFFFF');
        addSection('Revenue by Financial Advisement', revenueByFinancialAdvResults[0].map(row => ({ total_revenue: row.total_revenue, service_type: 'financial advisement', total_bookings: 'N/A' })), 'FFCCFFFF');
        addSection('Revenue by Home Flavors', revenueByHomeFlavorsResults[0].map(row => ({ total_revenue: row.total_revenue, service_type: 'home flavors', total_bookings: 'N/A' })), 'FFCCFFFF');
        
        // Execute and add orders by service month for each month
        for (let month = 1; month <= 12; month++) {
            const [results] = await db.query('CALL totalOrderByServiceMonth(?);', [month]);
            addSection(`Orders in Month ${month}`, results[0], 'FFCCFFFF');
        }

        // Add total orders
        addSection('Total Orders', totalOrdersResults[0], 'FFF0F0F0');

        // Adjust column widths after all data is added
        worksheet.columns.forEach(column => {
            let maxColumnLength = 0;
            column.eachCell({ includeEmpty: true }, cell => {
                maxColumnLength = Math.max(maxColumnLength, cell.value ? cell.value.toString().length : 0);
            });
            column.width = maxColumnLength < 12 ? 12 : maxColumnLength + 2; // minimum width or dynamic width + 2 for padding
        });

        // Write to buffer
        const buffer = await workbook.xlsx.writeBuffer();

        // Set response headers
        res.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.header('Content-Disposition', 'attachment; filename="report.xlsx"');

        // Send the buffer
        res.send(buffer);
    } catch (error) {
        console.error("Detailed Error:", error);
        res.status(500).json({ message: "Error generating Excel file", error: error.message });
    }
});

module.exports = router;