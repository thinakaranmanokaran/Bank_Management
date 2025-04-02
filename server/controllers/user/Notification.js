const Notification = require("../../models/user/Notification");

const createNotification = async (req, res) => {
    try {
        const newNotification = new Notification(req.body);
        await newNotification.save();
        res.status(201).json({ message: 'Notification sent successfully!', notifiaction: newNotification });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getAllNotifications = async (req, res) => {
    try {
        const Notifications = await Notification.find();

        if (!Notifications || Notifications.length === 0) {
            return res.status(404).json({ message: 'Notifications not found!' });
        }

        res.status(200).json(Notifications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getNotificationByAccountNo = async (req, res) => {
    const { accountno } = req.params;

    try {
        // Use a different variable name for the result to avoid conflicts
        const notifications = await Notification.find({ accountno });

        if (!notifications || notifications.length === 0) {
            return res.status(404).json({ message: 'Notifications not found!' });
        }

        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const deleteAllNotifications = async (req, res) => {
    const { accountno } = req.params;

    try {
        const deletedNotifications = await Notification.deleteMany({ accountno });

        if (deletedNotifications.deletedCount === 0) {
            return res.status(404).json({ message: 'No notifications found for this account!' });
        }

        res.status(200).json({ message: 'All notifications deleted successfully!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteNotificationByID = async (req, res) => {
    const { _id } = req.params;

    try {
        const deletedNotification = await Notification.findOneAndDelete({ _id });

        if (!deletedNotification) {
            return res.status(404).json({ message: '  Notification not found!' });
        }

        res.status(200).json({ message: '  Notification deleted successfully!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createNotification, deleteAllNotifications, deleteNotificationByID, getAllNotifications, getNotificationByAccountNo };