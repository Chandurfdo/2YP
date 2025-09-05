// controllers/boothController.js

const pool = require('../../../../db/db');

// ====================/
// Get all department subzones
// ====================
const getDepartmentSubzones = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT ds.department_subzone_id, ds.department_subzone_name, ds.description, ds.category,
                   d.department_name, s.subzone_name, z.zone_name,
                   org.fname AS organizer_fname, org.lname AS organizer_lname
            FROM department_subzone ds
            JOIN department d ON ds.department_id = d.department_id
            JOIN subzone s ON d.subzone_id = s.subzone_id
            JOIN zone z ON s.zone_id = z.zone_id
            LEFT JOIN department_subzone_organizer org ON ds.department_subzone_organizer_id = org.department_subzone_organizer_id
            ORDER BY ds.department_subzone_name;
        `);
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching department subzones:', err.message);
        res.status(500).json({ message: 'Database error' });
    }
};

// ====================
// Get single department subzone by ID
// ====================
const getDepartmentSubzoneById = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await pool.query(`
            SELECT ds.*, d.department_name, s.subzone_name, z.zone_name
            FROM department_subzone ds
            JOIN department d ON ds.department_id = d.department_id
            JOIN subzone s ON d.subzone_id = s.subzone_id
            JOIN zone z ON s.zone_id = z.zone_id
            WHERE ds.department_subzone_id = $1;
        `, [id]);

        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).json({ message: 'Department subzone not found' });
        }
    } catch (err) {
        console.error('Error fetching department subzone:', err.message);
        res.status(500).json({ message: 'Database error' });
    }
};

// ====================
// Create new department subzone
// ====================
const createDepartmentSubzone = async (req, res) => {
    const { department_id, department_subzone_name, department_subzone_organizer_id, admin_id, description, category } = req.body;

    if (!department_id || !department_subzone_name) {
        return res.status(400).json({ message: 'department_id and department_subzone_name are required' });
    }

    try {
        const result = await pool.query(`
            INSERT INTO department_subzone (department_subzone_id, department_id, department_subzone_name, department_subzone_organizer_id, admin_id, description, category)
            VALUES (uuid_generate_v4()::varchar, $1, $2, $3, $4, $5, $6)
            RETURNING *;
        `, [department_id, department_subzone_name, department_subzone_organizer_id, admin_id, description, category]);

        res.status(201).json({ message: 'Department subzone created', department_subzone: result.rows[0] });
    } catch (err) {
        console.error('Error creating department subzone:', err.message);
        res.status(500).json({ message: 'Database error' });
    }
};

// ====================
// Update department subzone
// ====================
const updateDepartmentSubzone = async (req, res) => {
    const id = req.params.id;
    const { department_subzone_name, department_subzone_organizer_id, description, category } = req.body;

    try {
        const result = await pool.query(`
            UPDATE department_subzone
            SET department_subzone_name = COALESCE($1, department_subzone_name),
                department_subzone_organizer_id = COALESCE($2, department_subzone_organizer_id),
                description = COALESCE($3, description),
                category = COALESCE($4, category)
            WHERE department_subzone_id = $5
            RETURNING *;
        `, [department_subzone_name, department_subzone_organizer_id, description, category, id]);

        if (result.rows.length > 0) {
            res.json({ message: 'Department subzone updated', department_subzone: result.rows[0] });
        } else {
            res.status(404).json({ message: 'Department subzone not found' });
        }
    } catch (err) {
        console.error('Error updating department subzone:', err.message);
        res.status(500).json({ message: 'Database error' });
    }
};

// ====================
// Delete department subzone
// ====================
const deleteDepartmentSubzone = async (req, res) => {
    const id = req.params.id;

    try {
        const result = await pool.query(`
            DELETE FROM department_subzone WHERE department_subzone_id = $1 RETURNING *;
        `, [id]);

        if (result.rows.length > 0) {
            res.json({ message: 'Department subzone deleted', department_subzone: result.rows[0] });
        } else {
            res.status(404).json({ message: 'Department subzone not found' });
        }
    } catch (err) {
        console.error('Error deleting department subzone:', err.message);
        res.status(500).json({ message: 'Database error' });
    }
};

module.exports = {
    getDepartmentSubzones,
    getDepartmentSubzoneById,
    createDepartmentSubzone,
    updateDepartmentSubzone,
    deleteDepartmentSubzone
};



/*
// Dummy data to simulate booths
let booths = [
    { id: 1, name: "AI Innovations", location: "Hall A", organizer: "Tech Club" },
    { id: 2, name: "Robotics Expo", location: "Hall B", organizer: "Robotics Society" }
];

// Get all booths
const getBooths = (req, res) => {
    res.json(booths);
};

// Get a single booth by ID
const getBoothById = (req, res) => {
    console.log('GET /booths/:id hit');
    const id = parseInt(req.params.id);
    const booth = booths.find(b => b.id === id);
    if (booth) {
        res.json(booth);
    } else {
        res.status(404).json({ message: "Booth not found" });
    }
};

// Create a new booth
const createBooth = (req, res) => {
    console.log("Access to the function createBooth");
    const { name, location, organizer } = req.body;

    if (!name || !location || !organizer) {
        return res.status(400).json({ message: "Name, location, and organizer are required" });
    }

    const newBooth = {
        id: booths.length + 1,
        name,
        location,
        organizer
    };

    booths.push(newBooth);

    res.status(201).json({ message: "Booth created", New_Booth: newBooth });
};

// Update a booth
const updateBooth = (req, res) => {
    const id = parseInt(req.params.id);
    const booth = booths.find(b => b.id === id);

    if (booth) {
        const { name, location, organizer } = req.body;
        booth.name = name || booth.name;
        booth.location = location || booth.location;
        booth.organizer = organizer || booth.organizer;

        res.json({ message: "Booth updated", Updated_Booth: booth });
    } else {
        res.status(404).json({ message: "Booth not found" });
    }
};

// Delete a booth
const deleteBooth = (req, res) => {
    const id = parseInt(req.params.id);
    const index = booths.findIndex(b => b.id === id);

    if (index !== -1) {
        const deleted = booths.splice(index, 1);
        res.json({ message: "Booth deleted", Deleted_Booth: deleted[0] });
    } else {
        res.status(404).json({ message: "Booth not found" });
    }
};

module.exports = {
    getBooths,
    getBoothById,
    createBooth,
    updateBooth,
    deleteBooth
};


*/