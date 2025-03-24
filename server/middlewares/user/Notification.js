exports.NotificationRequest = (req, res, next) => {
    const { accountno, message } = req.body

    if (!accountno || !message) {
        return res.status(400).json({ message: "All Fielsds are Required !" });
    }

    next();
}