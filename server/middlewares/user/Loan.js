exports.ValidateLoanApplication = (req, res, next) => {
    const { fullname, dob, gender, contact, email, employmenttype, loanamount, loanpurpose, accountno } = req.body;

    // Check for required fields
    if (!fullname || !dob || !gender || !contact || !email || !employmenttype || !loanamount || !loanpurpose || !accountno) {
        return res.status(400).json({ message: "All Fields are Required!" });
    }

    // Ensure all values are strings
    const allFields = [fullname, dob, gender, contact, email, employmenttype, loanamount, loanpurpose, accountno];
    if (allFields.some(field => typeof field !== 'string')) { 
        return res.status(400).json({ message: "All fields should be strings." });
    }

    // Simple email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid Email Address." });
    }

    next();
};
