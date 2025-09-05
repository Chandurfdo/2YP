// controllers/authController.js

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../../../../db/db'); // PostgreSQL connection pool

// ======================
// REGISTER (Admin)
// ======================
const register = async (req, res) => {
    try {
        const { username, password, fname, lname, contact_number, email } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "Username and Password are required" });
        }

        // Check if username exists
        const userCheck = await pool.query('SELECT * FROM admin WHERE username = $1', [username]);
        if (userCheck.rows.length > 0) {
            return res.status(400).json({ message: "Username already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Generate a random ID or use uuid in DB
        const adminId = `admin_${Date.now()}`;

        // Insert into DB
        const newAdmin = await pool.query(
            `INSERT INTO admin (admin_id, username, password, fname, lname, contact_number, email)
             VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING admin_id, username, fname, lname, email`,
            [adminId, username, hashedPassword, fname || null, lname || null, contact_number || null, email || null]
        );

        res.status(201).json({
            message: "Admin registered successfully",
            admin: newAdmin.rows[0]
        });

    } catch (error) {
        console.error("Register Error:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

// ======================
// LOGIN (Admin)
// ======================
const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "Username and Password are required" });
        }

        // Find user in DB
        const userResult = await pool.query('SELECT * FROM admin WHERE username = $1', [username]);
        if (userResult.rows.length === 0) {
            return res.status(401).json({ message: "Invalid username" });
        }

        const user = userResult.rows[0];

        // Compare password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }

        // Generate JWT
        const token = jwt.sign(
            { id: user.admin_id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ message: "Login successful", token });

    } catch (error) {
        console.error("Login Error:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

// ======================
// GET ALL ADMINS (for testing)
// ======================
const getAllAdmins = async (req, res) => {
    try {
        const result = await pool.query('SELECT admin_id, username, fname, lname, email FROM admin');
        res.json(result.rows);
    } catch (error) {
        console.error("Get Admins Error:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { register, login, getAllAdmins };


/*
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Dummy user store (replace with DB later)
const users = [];


const register = async (req,res) =>{

    const {username,password} = req.body;

    if(!username || !password){
        return res.status(400).json({message:"Username and Password are required"});
    }

    //Check is a user exists
    const existinguser = users.find(user => user.username === username);
    if(existinguser){
        return res.status(400).json({message:"The Username exists"});
    }

    //Hash pasword
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
        id:users.length+1,
        username,
        password:hashedPassword
    };

    users.push(newUser);

    res.status(201).json({ message: 'User registered successfully', user: { username } });
};

const login = async (req, res) => {
    const { username, password } = req.body;

    const user = users.find(user => user.username === username);
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials ( invalid username )' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials ( invalid password )' });
    }

    // Generate JWT
    const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
    res.json({ message: 'Login successful', token });
};

// GET ALL REGISTERED USERS (with hashed passwords)
const getAllRegisteredUsers = (req, res) => {
    res.json(users);
};

module.exports = { register, login,getAllRegisteredUsers };

*/

