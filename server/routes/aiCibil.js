const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");

// ✅ Import your models
const Transaction = require("../models/user/Transactions");
const Loan = require("../models/user/Loan");
const { Authentication } = require("../models/global/Authentication");
const { Account } = require("../models/user/Account");

const router = express.Router();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ✅ Helper: fallback score (your logic simplified)
const calculateFallbackScore = (transactions, accountAge, activeDays) => {
    let score = transactions * accountAge * activeDays;

    if (score <= 400) score = 500 + transactions;

    const normalized = 400 + (score / 100000) * 500;

    return Math.max(400, Math.min(900, Math.round(normalized)));
};

router.get("/analyze-cibil/:accountno", async (req, res) => {
    try {
        const { accountno } = req.params;

        // =========================
        // ✅ 1. Fetch Data from DB
        // =========================

        const transactionsData = await Transaction.find({ accountno });
        const loanData = await Loan.findOne({ accountno });
        const account = await Account.findOne({ accountno });

        if (!account) {
            return res.status(404).json({ message: "Account not found" });
        }

        // get user via account → email → auth
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

        console.log({
            transactions,
            accountAge,
            activeDays,
            loanHistory
        });

        // =========================
        // ✅ 3. Gemini Prompt
        // =========================

        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
        });

        const prompt = `
You are an Indian banking credit risk AI similar to CIBIL.

Strictly analyze the following user:

Transactions count: ${transactions}
Account age (days): ${accountAge}
Active days: ${activeDays}
Loan history: ${JSON.stringify(loanHistory)}

Rules:
- Score must be between 300 and 900
- Less transactions = risky
- Low active days = risky
- New account = risky
- Existing loan = risky
- Good activity = high score

Return ONLY valid JSON:

{
  "score": number,
  "risk": "Low" | "Medium" | "High",
  "recommendation": "Approve" | "Reject" | "Review",
  "reason": "short explanation"
}
`;

        // =========================
        // ✅ 4. Call Gemini
        // =========================

        let text;

        try {
            const result = await model.generateContent(prompt);
            text = await result.response.text();
        } catch (err) {
            console.log("❌ Gemini Error:", err);

            return res.json({
                success: true,
                data: {
                    accountno,
                    transactions,
                    accountAge,
                    activeDays,
                    ai: {
                        score: calculateFallbackScore(transactions, accountAge, activeDays),
                        risk: "Medium",
                        recommendation: "Review",
                        reason: "Gemini API failed",
                    }
                }
            });
        }

        let aiResponse;

        let cleanedText = text
            .replace(/```json/g, '')
            .replace(/```/g, '')
            .trim();

        try {
            aiResponse = JSON.parse(cleanedText);
        } catch (err) {
            console.log("⚠️ RAW AI:", text);

            aiResponse = {
                score: calculateFallbackScore(transactions, accountAge, activeDays),
                risk: "Medium",
                recommendation: "Review",
                reason: "AI parsing failed",
            };
        }

        // =========================
        // ✅ 5. Final Response
        // =========================

        res.json({
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
        console.error("❌ AI CIBIL ERROR:", error);

        res.status(500).json({
            success: false,
            message: "AI CIBIL analysis failed",
        });
    }
});

module.exports = router;