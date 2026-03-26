"use server";

const express = require("express");
const OpenAI = require("openai");

// ✅ Models
const Transaction = require("../models/user/Transactions");
const Loan = require("../models/user/Loan");
const { Authentication } = require("../models/global/Authentication");
const { Account } = require("../models/user/Account");

const cibilrouter = express.Router();

// ✅ GROQ CONFIG (OpenAI compatible)
const openai = new OpenAI({
    apiKey: "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",
    baseURL: "https://api.groq.com/openai/v1",
});

// ✅ Fallback logic
const calculateFallbackScore = (transactions, accountAge, activeDays) => {
    let score = transactions * accountAge * activeDays;

    if (score <= 400) score = 500 + transactions;

    const normalized = 400 + (score / 100000) * 500;

    return Math.max(400, Math.min(900, Math.round(normalized)));
};

cibilrouter.get("/analyze-cibil/:accountno", async (req, res) => {
    try {
        const { accountno } = req.params;

        if (!accountno) {
            return res.status(400).json({ message: "Account number required" });
        }

        // =========================
        // ✅ 1. Fetch Data
        // =========================

        const transactionsData = await Transaction.find({ accountno });
        const loanData = await Loan.findOne({ accountno });
        const account = await Account.findOne({ accountno });

        if (!account) {
            return res.status(404).json({ message: "Account not found" });
        }

        const authData = await Authentication.findOne({ email: account.email });

        if (!authData) {
            return res.status(404).json({ message: "User not found" });
        }

        // =========================
        // ✅ 2. Process Data
        // =========================

        const transactions = transactionsData.length;

        const accountAge = Math.ceil(
            (new Date() - new Date(authData.createdAt)) /
            (1000 * 60 * 60 * 24)
        );

        const uniqueDates = [
            ...new Set(
                transactionsData.map((t) =>
                    new Date(t.createdAt).toISOString().split("T")[0]
                )
            ),
        ];

        const activeDays = uniqueDates.length;

        const loanHistory = loanData || {};

        console.log("📊 DATA:", {
            transactions,
            accountAge,
            activeDays,
        });

        // =========================
        // ✅ 3. AI CALL (GROQ)
        // =========================

        let aiResponse;

        try {
            const completion = await openai.chat.completions.create({
                model: "llama-3.3-70b-versatile", // 🔥 best free model
                messages: [
                    {
                        role: "system",
                        content: "You are a banking credit scoring AI like CIBIL."
                    },
                    {
                        role: "user",
                        content: `
Analyze this user:

Transactions: ${transactions}
Account age: ${accountAge}
Active days: ${activeDays}
Loan history: ${JSON.stringify(loanHistory)}

Rules:
- Score between 300 and 900
- Low activity = risky
- New account = risky
- Existing loan = risky

Return ONLY JSON:
{
  "score": number,
  "risk": "Low|Medium|High",
  "recommendation": "Approve|Reject|Review",
  "reason": "short explanation"
}
                        `
                    }
                ],
                temperature: 0.3,
            });

            let text = completion.choices[0].message.content;

            // Clean markdown if present
            text = text.replace(/```json/g, "").replace(/```/g, "").trim();

            aiResponse = JSON.parse(text);

        } catch (err) {
            console.log("❌ GROQ ERROR:", err.message);

            // fallback
            aiResponse = {
                score: calculateFallbackScore(transactions, accountAge, activeDays),
                risk: transactions < 5 ? "High" : "Medium",
                recommendation: transactions < 5 ? "Reject" : "Review",
                reason: "AI failed, fallback used",
            };
        }

        // =========================
        // ✅ FINAL RESPONSE
        // =========================

        return res.json({
            success: true,
            data: {
                accountno,
                transactions,
                accountAge,
                activeDays,
                ai: aiResponse,
            },
        });

    } catch (error) {
        console.error("❌ FINAL ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "AI CIBIL analysis failed",
        });
    }
});

module.exports = cibilrouter;