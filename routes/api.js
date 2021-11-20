const router = require("express").Router();
const Workout = require("../models/workout.js");
const path = require ("path");


router.get('/api/workouts', (req, res) =>{
    Workout.aggregate([
        {
            $addFields:{
            totalDuration:{
            $sum: '$exercises.duration',
            },
        },
    },
    ])
    .then((dbWorkout) => {
        res.json(dbWorkout);

    })
    .catch((err)=>{
        res.json(err)
    });
})



router.post('/api/workouts', (req, res) => {
    Workout.create({})
    .then((dbWorkout) => {
        res.json(dbWorkout);

    })
    .catch((err)=>{
        res.json(err)
    });
});

router.put('/api/workouts/:id',  ({body, params }, res) => {
    Workout.findByIdAndUpdate(  //<-- cool, but took some looking up
        params.id,
        {$push: {exercises: body}},
        {new:true},
    )
    .then((dbWorkout) => {
        res.json(dbWorkout);

    })
    .catch((err)=>{
        res.json(err)
    });
});

router.delete('/api/workouts', ({body}, res)=> {
    Workout.findByIdAndUpdate(body.id)
    .then(() => {
        res.json(true);

    })
    .catch((err)=>{
        res.json(err)
    });
});

//Route for the dashboard, according to api.js
// worked with will on this part
router.get('/api/workouts/range', (req, res)=> {
    Workout.aggregate([
        {
            $addFields: {
                totalDuration:{
                    $sum: '$exercises.duration',
                },
            },
        },
    ])
        .sort({ _id: -1 })
        .then((dbWorkouts) => {
            console.log(dbWorkouts);
            res.json(dbWorkouts);
        })
        .catch((err) => {
            res.json(err);
        });
})

// ====== Non API routes =================================================

//need a path for exercise.html
router.get("/exercise", (req,res)=>{
    res.sendFile(path.join(__dirname, "../public/exercise.html"))
})

//need a path for stats.html
router.get("/stats", (req,res)=>{
    res.sendFile(path.join(__dirname, "../public/stats.html"))
})

module.exports= router;




// ===========================================================mp18
// const router = require("express").Router();
// const Transaction = require("../models/transaction.js");

// router.post("/api/transaction", ({ body }, res) => {
//     Transaction.create(body)
//         .then(dbTransaction => {
//             res.json(dbTransaction);
//         })
//         .catch(err => {
//             res.status(400).json(err);
//         });
// });

// router.post("/api/transaction/bulk", ({ body }, res) => {
//     Transaction.insertMany(body)
//         .then(dbTransaction => {
//             res.json(dbTransaction);
//         })
//         .catch(err => {
//             res.status(400).json(err);
//         });
// });

// router.get("/api/transaction", (req, res) => {
//     Transaction.find({})
//         .sort({ date: -1 })
//         .then(dbTransaction => {
//             res.json(dbTransaction);
//         })
//         .catch(err => {
//             res.status(400).json(err);
//         });
// });

// module.exports = router;
// ==========================================================