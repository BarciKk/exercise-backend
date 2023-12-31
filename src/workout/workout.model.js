import mongoose, { Schema } from "mongoose";

const workoutSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    exercise: [
      {
        title: {
          type: String,
          required: true,
        },
        reps: {
          type: Number,
          required: true,
        },
        sets: {
          type: Number,
          required: true,
        },
        load: {
          type: Number,
          required: false,
        },
      },
    ],
  },
  { timestamps: true }
);
const Workout = mongoose.model("Workout", workoutSchema);

export { Workout };
