import { Workout } from "./workout.model.js";
import mongoose from "mongoose";
import { workoutValidation } from "./workout.validation.js";
const getAllWorkouts = async (req, res) => {
  try {
    const workout = await Workout.find({}).sort({ createdAt: -1 });
    res.status(200).json(workout);
  } catch (err) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching workouts" });
  }
};

const getSingleWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ err: "Your id is not valid!" });
  }
  try {
    const workout = await Workout.findById(id);
    if (!workout) {
      return res.status(404).json({ err: "workout not found!" });
    }
    res.status(200).json(workout);
  } catch (err) {
    res.status(500).json({ error: "Error while fetching workout" });
  }
};

const createWorkout = async (req, res) => {
  const { error } = workoutValidation(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { name, date, exercise } = req.body;
  try {
    const workout = await Workout.create({ name, date, exercise });
    res.status(201).json(workout);
  } catch (err) {
    res.status(400).json({ err: "Cannot create workout!" });
  }
};
const deleteWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ err: "Id is not valid " });
  }
  try {
    const workout = await Workout.findOneAndDelete({ _id: id });
    if (!workout) {
      return res.status(404).json({ err: "Workout not found!" });
    }
    res.status(204).json(workout);
  } catch (err) {
    res
      .status(500)
      .json({ err: "An error occurred while deleting the workout" });
  }
};

const updateWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ err: "Id is not valid " });
  }
  try {
    const workout = await Workout.findOneAndUpdate(
      { _id: id },
      {
        ...req.body,
      }
    );
    if (!workout) {
      return res.status(404).json({ err: "Cannot update workout" });
    }
    res.status(200).json(workout);
  } catch (err) {
    res
      .status(500)
      .json({ err: "An error occurred while updating the workout" });
  }
};

export {
  createWorkout,
  getAllWorkouts,
  getSingleWorkout,
  deleteWorkout,
  updateWorkout,
};
