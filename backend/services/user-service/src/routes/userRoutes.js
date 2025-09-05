const express  =require("express");
const router = express.Router();



// Import controller functions
const {
    getAdmins,
    getAdminById,
    createAdmin,
    updateAdmin,
    deleteAdmin
} = require('../controllers/userController');



//  Routs    //

//Get all users
router.get('/',getAdmins);

//Get a single user by Id
router.get('/:id',getAdminById);


/*
//POST create a new user
router.post('/',createAdmin);
*/


// pUT update user
router.put('/:id',updateAdmin);

//Delete a user
router.delete('/:id',deleteAdmin);



module.exports = router;