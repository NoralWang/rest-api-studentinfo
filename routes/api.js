const express = require ('express');
const router = express.Router();
const STU = require('../models/student');

// get a list of student from the db
router.get('/students', function(req, res, next){
    STU.find({}).then(function(student){
        res.send(student);
    });
    // STU.gerNear(
    //     {type:"Point",coordinates:[parseFloat(req.query.lng),parseFloat(req.query.lat)]},
    //     {maxDistance:10000,spherical:ture}
        
    // ).then(function(student){
    //     res.send(student);
    // });
});


// add a new student to the db
router.post('/students/new', function(req, res, next){
    STU.create(req.body).then(function(student){
        res.send(student);
    }).catch(next);
});

// router.post('/students', function(req, res, next){
//     res.send({
//         type:'POST',
//         name:req.body.name
//     }); 
// });

// update a student in the db
router.put('/students/:id', function(req, res, next){
    STU.findByIdAndUpdate({_id:req.params.id},req.body).then(function(student){
        STU.findOne({_id:req.params.id}).then(function(student){
            res.send(student);
        })
    })
});


// delete by id from the db
router.delete('/students/:id', function(req, res, next){
    STU.findByIdAndRemove({_id:req.params.id}).then(function(student){
    res.send(student);
    })
});
module.exports = router;
