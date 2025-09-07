// controllers/orgController.js

const pool = require('../../../../db/db.js');
// Get all organizers
const getOrganizers = async (req, res) => {
    try {
        const result = await pool.query('SELECT organizer_ID, organizer_name, fname, lname, email, contact_no FROM Organizer ORDER BY organizer_ID');
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
        const result = await pool.query('SELECT organizer_ID, organizer_name, fname, lname, email, contact_no FROM Organizer WHERE organizer_ID = $1', [id]);
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
    const { organizer_ID, organizer_name, fname, lname, email, contact_no, password_hash} = req.body;

    try {
        const result = await pool.query(
            `INSERT INTO Organizer (organizer_ID, organizer_name, fname, lname, email, contact_no, password_hash)
             VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
            [organizer_ID, organizer_name, fname, lname, email, contact_no, password_hash]
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
    const { organizer_name, fname, lname, email, contact_no, password_hash } = req.body;

    try {
        // First get the current organizer data to handle partial name updates
        const currentOrganizer = await pool.query('SELECT fname, lname, organizer_name FROM Organizer WHERE organizer_id = $1', [id]);
        
        let newOrganizerName;
        if (currentOrganizer.rows.length > 0) {
            const currentName = currentOrganizer.rows[0].organizer_name || '';
            const [currentFirstName, currentLastName] = currentName.split(' ');

            if (fname && lname) {
                // Both provided - update full name
                newOrganizerName = `${fname} ${lname}`;
            } else if (fname) {
                // Only fname provided - update first part
                newOrganizerName = `${fname} ${currentLastName || ''}`.trim();
            } else if (lname) {
                // Only lname provided - update last part
                newOrganizerName = `${currentFirstName || ''} ${lname}`.trim();
            } else {
                // Neither provided - keep current name
                newOrganizerName = organizer_name;
            }
        } else {
            newOrganizerName = organizer_name;
        }

        const result = await pool.query(
        `UPDATE Organizer
            SET organizer_name = COALESCE($1, organizer_name),
            fname          = COALESCE($2, fname),
            lname          = COALESCE($3, lname),
            email          = COALESCE($4, email),
            contact_no     = COALESCE($5, contact_no),
            password_hash  = COALESCE($6, password_hash)
            WHERE organizer_ID = $7
            RETURNING *`,
        [newOrganizerName, fname, lname, email, contact_no, password_hash, id]
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