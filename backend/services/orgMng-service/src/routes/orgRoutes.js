const express  =require("express");
const router = express.Router();



// Import controller functions


const {
    getOrganizers,
    getOrganizerById,
    createOrganizer,
    updateOrganizer,
    deleteOrganizer
} = require('../controllers/orgController');


//  Routs    //

//Get all organizers
router.get('/',getOrganizers);

//Get a single organizer by Id
router.get('/:id',getOrganizerById);



//POST create a new organizer
router.post('/',createOrganizer);



// pUT update organizer
router.put('/:id',updateOrganizer);

//Delete a organizer
router.delete('/:id',deleteOrganizer);


module.exports = router;