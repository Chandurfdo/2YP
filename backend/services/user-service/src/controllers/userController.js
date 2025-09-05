// controllers/userController.js

// controllers/adminController.js
const pool = require('../../../../db/db.js');
// Get all admins
const getAdmins = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM admin ORDER BY admin_id');
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching admins:', err.message);
        res.status(500).json({ message: 'Database error', error: err.message });
    }
};

// Get a single admin by ID
const getAdminById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM admin WHERE admin_id = $1', [id]);
        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).json({ message: 'Admin not found' });
        }
    } catch (err) {
        console.error('Error fetching admin by ID:', err.message);
        res.status(500).json({ message: 'Database error', error: err.message });
    }
};

// Create a new admin
const createAdmin = async (req, res) => {
    const { admin_id, username, password, fname, lname, contact_number, email } = req.body;
    try {
        const result = await pool.query(
            `INSERT INTO admin (admin_id, username, password, fname, lname, contact_number, email)
             VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
            [admin_id, username, password, fname, lname, contact_number, email]
        );
        res.status(201).json({ message: 'Admin created', admin: result.rows[0] });
    } catch (err) {
        console.error('Error creating admin:', err.message);
        res.status(500).json({ message: 'Database error', error: err.message });
    }
};

// Update an admin
const updateAdmin = async (req, res) => {
    const { id } = req.params;
    const { username, password, fname, lname, contact_number, email } = req.body;

    try {
        const result = await pool.query(
            `UPDATE admin
             SET username = COALESCE($1, username),
                 password = COALESCE($2, password),
                 fname = COALESCE($3, fname),
                 lname = COALESCE($4, lname),
                 contact_number = COALESCE($5, contact_number),
                 email = COALESCE($6, email)
             WHERE admin_id = $7
             RETURNING *`,
            [username, password, fname, lname, contact_number, email, id]
        );

        if (result.rows.length > 0) {
            res.json({ message: 'Admin updated', admin: result.rows[0] });
        } else {
            res.status(404).json({ message: 'Admin not found' });
        }
    } catch (err) {
        console.error('Error updating admin:', err.message);
        res.status(500).json({ message: 'Database error', error: err.message });
    }
};

// Delete an admin
const deleteAdmin = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM admin WHERE admin_id = $1 RETURNING *', [id]);
        if (result.rows.length > 0) {
            res.json({ message: 'Admin deleted', admin: result.rows[0] });
        } else {
            res.status(404).json({ message: 'Admin not found' });
        }
    } catch (err) {
        console.error('Error deleting admin:', err.message);
        res.status(500).json({ message: 'Database error', error: err.message });
    }
};

module.exports = {
    getAdmins,
    getAdminById,
    createAdmin,
    updateAdmin,
    deleteAdmin
};




/*

// Dummy data to simulate users
let users = [
    { id: 1, name: "Alice", email: "alice@example.com" },
    { id: 2, name: "Bob", email: "bob@example.com" }
];

//Get all users
const getUsers = (req,res) =>{
    res.json(users); 
};


//Get a single user by ID
const getUserById = (req,res) => {
    console.log('GET /users/:id hit');
    const id  = parseInt(req.params.id);
    const user = users.find(u => u.id===id);
    if(user){
        res.json(user);
    }else{
        res.status(404).json({ message: "User not found" });
    }
};


//create a new user
const createUser = (req,res) =>{
    console.log("accees to the function create user");
    const {name,email} = req.body;
    // Extracts 'name' and 'email' from the request body sent by the client
    // Example request body: { "name": "Charlie", "email": "charlie@example.com" }


    //creating a new user onject using teh detaild of the request
    const newUser = {
        id: users.length + 1,  // Assigns a new ID (current array length + 1)
        name,                  // User's name from request
        email                  // User's email from request
    };

    users.push(newUser); 
    //update the array with the newly added user detailsS
    // This updates the in-memory array with the new user

    res.status(201).json({ message: "User created", user: newUser });  
    // Sends a JSON response to the client
    // Status 201 indicates that a resource has been successfully created
    // Response includes a confirmation message and the newly created user
};



//Update a user
const updateUser = (req,res) =>{
    const id = parseInt(req.params.id);

    const user = users.find(u => u.id === id);
  

    if(user){
        const {name,email} = req.body; //Destructures name and email from req.body (data sent by the client).

        user.name = name || user.name; //updates the name only if name is provided
                                       //in the request. Otherwise, keeps the existing name.
        user.email = email || user.email;


        res.json({message : "User Updated",user});
    }
    else{
        res.status(404).json({message : "User not found"})
    }
};


//Delete a user

const deleteUser = (req,res) => {

    const id = parseInt(req.params.id);

    const index = users.findIndex(u => u.id===id);

    if(index !==-1){
        const deleted  = users.splice(index,1);
        res.json({message : "User Deleted",user : deleted[0]});
    }else{
        res.status(404).json({message : "User not found"});
    }

};


module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};


*/



