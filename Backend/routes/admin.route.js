import express, { Router } from "express";
import {
  createCollaboration,
  createDebate,
  createHealthCare,
  createMeeting,
  createSeminar,
  createTrip,
  createUser,
  deleteCollaboration,
  deleteDebate,
  deleteHealthCare,
  deleteMeeting,
  deleteSeminar,
  deleteTrip,
  deleteUser,
  getCollaboration,
  getDebate,
  getHealthCare,
  getMeetings,
  getSeminars,
  getTrips,
  getUsers,
  updateCollaboration,
  updateDebate,
  updateHealthCare,
  updateMeeting,
  updateSeminar,
  updateTrip,
  updateUser,
} from "../controllers/admin.controller.js";

const router = express.Router();

//user route
router.post("/user", createUser);
router.get("/user", getUsers);
router.put("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);

//meeting routes
router.post("/meeting", createMeeting);
router.get("/meeting", getMeetings);
router.put("/meeting/:id", updateMeeting);
router.delete("/meeting/:id", deleteMeeting);

//trip routes
router.post("/educationalTrip", createTrip);
router.get("/educationalTrip", getTrips);
router.put("/educationalTrip/:id", updateTrip);
router.delete("/educationalTrip/:id", deleteTrip);

//seminars routes
router.post("/seminars", createSeminar);
router.get("/seminars", getSeminars);
router.put("/seminars/:id", updateSeminar);
router.delete("/seminars/:id", deleteSeminar);

//health care routes
router.post("/health-care", createHealthCare);
router.get("/health-care", getHealthCare);
router.put("/health-care/:id", updateHealthCare);
router.delete("/health-care/:id", deleteHealthCare);

//debate routes
router.post("/debates", createDebate);
router.get("/debates", getDebate);
router.put("/debates/:id", updateDebate);
router.delete("/debates/:id", deleteDebate);

//debate routes
router.post("/collaboration", createCollaboration);
router.get("/collaboration", getCollaboration);
router.put("/collaboration/:id", updateCollaboration);
router.delete("/collaboration/:id", deleteCollaboration);

export default router;
