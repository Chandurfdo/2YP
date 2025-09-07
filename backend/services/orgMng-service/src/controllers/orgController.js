// controllers/orgController.js

const pool = require('../../../../db/db.js');
// Get all organizers
const getOrganizers = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Organizer ORDER BY organizer_ID');
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching Organizers:', err.message);
        res.status(500).json({ message: 'Database error', error: err.message });
    }
};

// Get a single organizer by ID
const getOrganizerById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM Organizer WHERE organizer_ID = $1', [id]);
        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).json({ message: 'Organizer not found' });
        }
    } catch (err) {
        console.error('Error fetching Organizer by ID:', err.message);
        res.status(500).json({ message: 'Database error', error: err.message });
    }
};

/*

// Create a new Organizer
const createOrganizer = async (req, res) => {
    const { organizer_ID, organizer_name, Fname, Lname, email, contact_no, password_hash} = req.body;

    try {
        const result = await pool.query(
            `INSERT INTO Organizer (organizer_ID, organizer_name, Fname, Lname, email, contact_no, password_hash)
             VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
            [organizer_ID, organizer_name, Fname, Lname, email, contact_no, password_hash]
        );

        res.status(201).json({ message: 'Organizer created', organizer: result.rows[0] });
    } catch (err) {
        console.error('Error creating organizer:', err.message);
        res.status(500).json({ message: 'Database error', error: err.message });
    }
};

*/



// Update an organizer
const updateOrganizer = async (req, res) => {
    const { id } = req.params;
    const { organizer_name, Fname, Lname, email, contact_no, password_hash } = req.body;

    try {
        const result = await pool.query(
        `UPDATE Organizer
            SET organizer_name = COALESCE($1, organizer_name),
            Fname          = COALESCE($2, Fname),
            Lname          = COALESCE($3, Lname),
            email          = COALESCE($4, email),
            contact_no     = COALESCE($5, contact_no),
            password_hash  = COALESCE($6, password_hash)
            WHERE organizer_ID = $7
            RETURNING *`,
        [organizer_name, Fname, Lname, email, contact_no, password_hash, id]
    );
        if (result.rows.length > 0) {
            res.json({ message: 'Organizer updated', organizer: result.rows[0] });
        } else {
            res.status(404).json({ message: 'Organizer not found' });
        }
    } catch (err) {
        console.error('Error updating Organizer:', err.message);
        res.status(500).json({ message: 'Database error', error: err.message });
    }
};

// Delete an organizer
const deleteOrganizer = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM Organizer WHERE organizer_ID = $1 RETURNING *', [id]);
        if (result.rows.length > 0) {
            res.json({ message: 'Organizer deleted', organizer: result.rows[0] });
        } else {
            res.status(404).json({ message: 'Organizer not found' });
        }
    } catch (err) {
        console.error('Error deleting Organizer:', err.message);
        res.status(500).json({ message: 'Database error', error: err.message });
    }
};

module.exports = {
    getOrganizers,
    getOrganizerById,
    updateOrganizer,
    deleteOrganizer
};