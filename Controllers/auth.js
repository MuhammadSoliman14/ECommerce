const User = require('../models/User.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const postRegister = async (req, res) => {
    try {
        const { name, password } = req.body; 
        
        const findUser = await User.findOne({ name: name }); 
        if (findUser) { 
            return res.status(400).json({ msg: "The username is taken" }); 
        }
        const hashedPassword = await bcrypt.hash(password, 10); 
        const savedUser = await User.create({ name: name, password: hashedPassword });

        const { password: savedPassword, ...others } = savedUser._doc;
        res.status(200).json({...others});
    } catch (error) {
        res.status(500).json({ msg: error.message }); 
    }
};

const postLogin = async (req, res) => {
    try {
        const { name, password } = req.body;
        const user = await User.findOne({ name });

        if (!user) { 
            return res.status(400).json({ msg: "Wrong username or password" }); 
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
            const accessToken = jwt.sign(
                {   
                    id: user._id,
                    isAdmin: user.isAdmin,
                },
                process.env.JWT_ACCESS_TOKEN,
                { expiresIn: '3d' }
            );

            const { password, ...others } = user._doc;
            res.status(200).json({...others, accessToken});
        } else {
            res.status(400).json({ msg: 'Wrong username or password' });
        }
    } catch (error) {
        res.status(500).json({ msg: 'Internal server error' });
    }
};

module.exports = {
    postRegister,
    postLogin,
};
