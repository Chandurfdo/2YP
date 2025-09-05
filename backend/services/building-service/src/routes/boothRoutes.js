const express  =require("express");
const router = express.Router();



// Import controller functions
const {
    getDepartmentSubzones,
    getDepartmentSubzoneById,
    createDepartmentSubzone,
    updateDepartmentSubzone,
    deleteDepartmentSubzone
} = require('../controllers/boothController');



//  Routs    //

//Get all users
router.get('/',getDepartmentSubzones);

//Get a single user by Id
router.get('/:id',getDepartmentSubzoneById);

//POST create a new user
router.post('/',createDepartmentSubzone);


// pUT update user
router.put('/:id',updateDepartmentSubzone);

//Delete a user
router.delete('/:id',deleteDepartmentSubzone);


module.exports = router;