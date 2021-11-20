const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    day:{
        type:Date,
        default:()=> new Date()
        //so the default is new

    },

    // based on criteria established in the exercise.js of the starter code
    exercises: [
        {
            type: {
                type: String,
                trim: true,
                required: "Insert a type of exercise",
            },
            name: {
                type: String,
                trim: true,
                required: "What is the exercise called",
            },
            duration: {
                type: Number,
                required: "How long (minutes)",
            },
            distance: {
                type: Number,
            },
            //then for non-cardio
            weight: {
                type: Number,
            },
            reps: {
                type: Number,
            },
            sets: {
                type: Number,
            },
            
        }
]
});

const Workout= mongoose.model ('workout', workoutSchema);

module.exports= Workout;









// ==========================================mp18
// const mongoose = require("mongoose");

// const Schema = mongoose.Schema;

// const transactionSchema = new Schema({
//     name: {
//         type: String,
//         trim: true,
//         required: "Enter a name for transaction"
//     },
//     value: {
//         type: Number,
//         required: "Enter an amount"
//     },
//     date: {
//         type: Date,
//         default: Date.now
//     }
// });

// const Transaction = mongoose.model("Transaction", transactionSchema);

// module.exports = Transaction;
// ================================================================