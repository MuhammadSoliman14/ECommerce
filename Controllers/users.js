const User = require('../models/User');

const updateUser = async (req, res, next) => {
    try {
        const updatedUser = await User.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { new: true } // Return updated user
        );
        const { password, ...others } = updatedUser._doc;
        res.status(200).json({ ...others });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json('User has been deleted');
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, ...others } = user._doc;
        res.status(200).json(others);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

module.exports = {
    updateUser,
    deleteUser,
    getUser,
    getAllUsers,
};
