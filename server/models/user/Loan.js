const mongoose = require('mongoose');

const loanApplicationSchema = new mongoose.Schema({
    // Personal Information
    fullname: { type: String, required: true },
    dob: { type: String, required: true }, // Date stored as String
    gender: { type: String, required: true },
    contact: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    accountno: { type: String, required: true, },

    // Employment Information
    employmenttype: { type: String, required: true },
    companyname: { type: String },
    jobtitle: { type: String },
    income: { type: String },

    // Loan Details
    loanamount: { type: String, required: true },
    loanpurpose: { type: String, required: true },

    // Submission Date (optional, if needed)
    submittedat: { type: String, default: new Date().toISOString() }
});

const LoanApplication = mongoose.model('LoanApplication', loanApplicationSchema);

module.exports = LoanApplication; 
