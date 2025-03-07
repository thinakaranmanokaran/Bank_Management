const { Account } = require('./../../models/user/Account')

const generateUniqueAccountNo = async () => {
    let isUnique = false;
    let accountNo;

    while (!isUnique) {
        accountNo = Math.floor(100000000000 + Math.random() * 900000000000).toString();
        const existingAccount = await Account.findOne({ accountno: accountNo });

        if (!existingAccount) {
            isUnique = true;
        }
    }
    return accountNo;
};

exports.AccountUser = async (req, res) => {
    try {
        const { email } = req.body;

        // Check if the user already has an account
        const existingAccount = await Account.findOne({ email });
        if (existingAccount) {
            return res.status(400).json({ success: false, message: 'Account already exists!' });
        }

        // Generate a unique account number
        const accountno = await generateUniqueAccountNo();

        const newAccount = new Account({
            email,
            accountno,
            balance: 0, // Default balance
        });

        await newAccount.save();
        res.status(201).json({ success: true, message: 'Account created successfully!', accountno });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
