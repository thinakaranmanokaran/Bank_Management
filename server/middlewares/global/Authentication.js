exports.registerRequest = (req, res, next) => {
    const { name, email, phone, password, gender, dob } = req.body;

    if (!name || !email || !phone || !password || !gender || !dob) {
        return res.status(400).json({ message: 'All required fields must be filled' });
    }

    next();
};

exports.signinRequest = (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'All required fields must be filled' });
    }

    next();
};   