const { Account } = require('./../../models/user/Account')

exports.AccountUser = async (req, res) => {
    try {
        const { email, accountno, balance } = req.body;

        const account = await Account.create({ email, accountno, balance });
        return res.status(200).json({ message: "Balance Added Successfully", account });
    } catch (error) {
        console.error('Error in addUser:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}