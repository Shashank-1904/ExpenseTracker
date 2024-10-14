const UserModel = require("../Models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
    try {
        const {ufname, ulname, uemail, uphone, upass} = req.body;
        const user = await UserModel.findOne({uemail}); 
        if (user) {
            return res.status(409).json( { message : "User already Exist", success : false });
        }

        const userModel = new UserModel({ufname, ulname, uemail, uphone, upass});
        userModel.upass = await bcrypt.hash(upass, 10);

        await userModel.save();

        res.status(201).json({message : "Signup Successfully..!", success: true})
    }
    catch(err)
    {
        res.status(500).json({message : "Internal Server Error..!", success: false})
    }
}


const login = async (req, res) => {
    try {
        const { uemail, upass } = req.body;

        // Basic validation to ensure both email and password are provided
        if (!uemail || !upass) {
            return res.status(400).json({ message: "Email and Password are required", success: false });
        }

        // Check if user with the given email exists
        const user = await UserModel.findOne({ uemail }); 
        if (!user) {
            return res.status(403).json({ message: "Email or Password is incorrect", success: false });
        }

        // Compare the given password with the stored hashed password
        const isPassEqual = await bcrypt.compare(upass, user.upass);
        if (!isPassEqual) {
            return res.status(403).json({ message: "Email or Password is incorrect", success: false });
        }

        // Generate JWT token
        const jwtToken = jwt.sign(
            { ext_email: user.uemail, ext_id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        // Send success response with JWT and user details
        res.status(200).json({
            message: "Login Successfully..!",
            success: true,
            jwtToken,
            uemail: user.uemail,  // Using user.uemail directly
            uname: `${user.ufname} ${user.ulname}`  // Concatenating ufname and ulname
        });
    } catch (err) {
        console.error('Error during login:', err);  // More descriptive logging
        res.status(500).json({ message: "Internal Server Error..!", success: false });
    }
};


module.exports = {
    signup,
    login
}
