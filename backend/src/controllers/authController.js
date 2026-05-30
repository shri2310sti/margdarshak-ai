const jwt = require("jsonwebtoken");
const User = require("../models/User");

const JWT_SECRET = process.env.JWT_SECRET || "margdarshak_jwt_secret_change_in_production";
const JWT_EXPIRES = "7d";

function signToken(userId) {
    return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES });
}

// POST /auth/register
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password)
            return res.status(400).json({ success: false, message: "Name, email and password are required." });
        if (password.length < 6)
            return res.status(400).json({ success: false, message: "Password must be at least 6 characters." });

        const existing = await User.findOne({ email: email.toLowerCase() });
        if (existing)
            return res.status(409).json({ success: false, message: "An account with this email already exists." });

        const user = await User.create({ name, email, password });
        const token = signToken(user._id);

        return res.status(201).json({
            success: true,
            message: "Account created successfully!",
            data: { name: user.name, email: user.email, token },
        });
    } catch (err) {
        console.error("Register error:", err.message);
        return res.status(500).json({ success: false, message: "Registration failed." });
    }
};

// POST /auth/login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res.status(400).json({ success: false, message: "Email and password are required." });

        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user)
            return res.status(401).json({ success: false, message: "Invalid email or password." });

        const isMatch = await user.comparePassword(password);
        if (!isMatch)
            return res.status(401).json({ success: false, message: "Invalid email or password." });

        const token = signToken(user._id);
        return res.status(200).json({
            success: true,
            message: "Login successful!",
            data: { name: user.name, email: user.email, token },
        });
    } catch (err) {
        console.error("Login error:", err.message);
        return res.status(500).json({ success: false, message: "Login failed." });
    }
};

module.exports = { register, login };