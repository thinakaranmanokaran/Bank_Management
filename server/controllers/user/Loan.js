const LoanApplication = require('../../models/user/Loan'); // Adjust the path if necessary

const createLoanApplication = async (req, res) => {
    try {
        const newApplication = new LoanApplication(req.body);
        await newApplication.save();
        res.status(201).json({ message: 'Loan application submitted successfully!', application: newApplication });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllLoanApplications = async (req, res) => {
    try {
        const applications = await LoanApplication.find();
        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getLoanApplicationByAccountNo = async (req, res) => {
    const { accountno } = req.params;

    try {
        const application = await LoanApplication.findOne({ accountno });

        if (!application) {
            return res.status(404).json({ message: 'Loan application not found!' });
        }

        res.status(200).json(application);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteLoanApplication = async (req, res) => {
    const { accountno } = req.params;

    try {
        const deletedApplication = await LoanApplication.findOneAndDelete({ accountno });

        if (!deletedApplication) {
            return res.status(404).json({ message: 'Loan application not found!' });
        }

        res.status(200).json({ message: 'Loan application deleted successfully!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createLoanApplication, getAllLoanApplications, getLoanApplicationByAccountNo, deleteLoanApplication };