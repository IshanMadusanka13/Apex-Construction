
import mongoose from "mongoose";
import monthlyReportSchema from "../models/MonthlyReport.js";


const monthlyReportModel = mongoose.model("MonthlyReport", monthlyReportSchema);


export function createMonthlyReport(req, res) {
    const { desc, qty, unit } = req.body;
    const total = qty * unit;

    const newMonthlyReport = new monthlyReportModel({
        desc: desc,
        qty: qty,
        unit: unit,
        total: total
    });

    newMonthlyReport.save()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            res.status(500).json({ message: "Error creating monthly report" });
        });
}
