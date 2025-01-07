import mongoose from "mongoose";
import User from "../models/admin.model.js";
import Meeting from "../models/meeting.model.js";
import Trip from "../models/trips.model.js";
import Seminar from "../models/seminars.js";
import HealthCare from "../models/mental-health.model.js";
import Debate from "../models/debate.model.js";
import Collaboration from "../models/CollaborationAndPartnership.model.js";

//user controllers
export const createUser = async (req, res) => {
  const user = req.body;
  if (!user.firstName || !user.lastName || !user.personnelType || !user.image) {
    return res.status(400).json({
      success: false,
      message: "All field are required",
    });
  }

  const validPersonnelType = [
    "President",
    "Vice-president",
    "Chief Organizer",
    "Secretary",
    "Vice-secretary",
  ];
  if (!validPersonnelType.includes(user.personnelType)) {
    return res.status(400).json({
      success: false,
      message: "Invalid Personnel  type",
    });
  }

  const newUser = new User({
    firstName: user.firstName,
    lastName: user.lastName,
    personnelType: user.personnelType,
    image: user.image,
  });

  try {
    await newUser.save();
    res.status(201).json({
      success: true,
      message: "User added",
      data: newUser,
    });
  } catch (error) {
    console.error("Error in adding new user", error.message);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.log("Error in getting user", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const user = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid user Id" });
  }

  if (user.personnelType) {
    const validPersonnelType = [
      "President",
      "Vice-president",
      "Chief Organizer",
      "Secretary",
      "Vice-secretary",
    ];
    if (!validPersonnelType.includes(user.personnelType)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user type",
      });
    }
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(id, user, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: "User updated",
      data: updatedUser,
    });
  } catch (error) {
    console.log("Error in updating user", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid user Id" });
  }
  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "User deleted" });
  } catch (error) {
    console.log("Error in deleting user", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

//meeting controllers
export const createMeeting = async (req, res) => {
  const meeting = req.body;
  if (
    !meeting.frequency ||
    !meeting.day ||
    !meeting.location ||
    !meeting.description
  ) {
    return res.status(400).json({
      success: false,
      message: "All field are required",
    });
  }

  const validMeetingSchedule = ["Weekly", "Monthly"];
  if (!validMeetingSchedule.includes(meeting.frequency)) {
    return res.status(400).json({
      success: false,
      message: "Invalid Meeting schedule type",
    });
  }

  const validLocation = [
    "CMP 101",
    "CMP 102",
    "CMP 103",
    "CMP 104",
    "CMP 105",
    "CMP 106",
    "CMP 107",
    "CMP 108",
  ];
  if (!validLocation.includes(meeting.location)) {
    return res.status(400).json({
      success: false,
      message: "Invalid Location  type",
    });
  }

  const newMeeting = new Meeting({
    frequency: meeting.frequency,
    day: meeting.day,
    location: meeting.location,
    description: meeting.description,
  });

  try {
    await newMeeting.save();
    res.status(201).json({
      success: true,
      message: "Meeting added",
      data: newMeeting,
    });
  } catch (error) {
    console.error("Error in adding new meeting", error.message);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
export const getMeetings = async (req, res) => {
  try {
    const meeting = await Meeting.find({});
    res.status(200).json({ success: true, data: meeting });
  } catch (error) {
    console.log("Error in getting meetings", error.message);
    res.status(400).json({ success: false, message: "Server Error" });
  }
};

export const updateMeeting = async (req, res) => {
  const { id } = req.params;
  const meeting = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid Id" });
  }

  if (meeting.frequency) {
    const validMeetingSchedule = ["Weekly", "Monthly"];
    if (!validMeetingSchedule.includes(meeting.frequency)) {
      return res.status(400).json({
        success: false,
        message: "Invalid meeting schedule",
      });
    }
  }

  if (meeting.location) {
    const validLocation = [
      "CMP 101",
      "CMP 102",
      "CMP 103",
      "CMP 104",
      "CMP 105",
      "CMP 106",
      "CMP 107",
      "CMP 108",
    ];
    if (!validLocation.includes(meeting.location)) {
      return res.status(400).json({
        success: false,
        message: "Invalid meeting location",
      });
    }
  }

  try {
    const updatedMeeting = await Meeting.findByIdAndUpdate(id, meeting, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      message: "Meeting Updated",
      data: updatedMeeting,
    });
  } catch (error) {
    console.log("Error in updating meeting", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const deleteMeeting = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid meeting Id" });
  }
  try {
    await Meeting.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Meeting deleted" });
  } catch (error) {
    console.log("Error in deleting meeting", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

//Trips Controllers
export const createTrip = async (req, res) => {
  const trip = req.body;

  const requiredFields = [
    "title",
    "location",
    "date",
    "description",
    "highlights",
    "cost",
    "imageUrl",
  ];
  const missingFields = requiredFields.filter((field) => !trip[field]);

  if (missingFields.length > 0) {
    return res.status(400).json({
      success: false,
      message: `Missing required fields: ${missingFields.join(", ")}`,
    });
  }

  const newTrip = new Trip({
    title: trip.title,
    location: trip.location,
    date: trip.date,
    description: trip.description,
    highlights: trip.highlights,
    cost: trip.cost,
    imageUrl: trip.imageUrl,
    status: trip.status || "Upcoming",
  });

  try {
    await newTrip.save();
    res.status(201).json({
      success: true,
      message: "Trip added successfully",
      data: newTrip,
    });
  } catch (error) {
    console.error("Error in adding new trip", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};
export const getTrips = async (req, res) => {
  try {
    const trip = await Trip.find({});
    res.status(200).json({ success: true, data: trip });
  } catch (error) {
    console.log("Error in getting trip", error.message);
    res.status(400).json({ success: false, message: "Server Error" });
  }
};

export const updateTrip = async (req, res) => {
  const { id } = req.params;
  const trip = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      success: false,
      message: "Invalid Trip ID",
    });
  }

  const validStatus = ["Upcoming", "In Progress", "Completed", "Cancelled"];
  if (trip.status && !validStatus.includes(trip.status)) {
    return res.status(400).json({
      success: false,
      message: "Invalid Trip Status",
    });
  }

  try {
    const existingTrip = await Trip.findById(id);

    if (!existingTrip) {
      return res.status(404).json({
        success: false,
        message: "Trip not found",
      });
    }

    const updatedTrip = await Trip.findByIdAndUpdate(id, trip, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: "Trip Updated Successfully",
      data: updatedTrip,
    });
  } catch (error) {
    console.error("Error in updating trip", error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

export const deleteTrip = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid trip Id" });
  }
  try {
    await Trip.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Trip deleted" });
  } catch (error) {
    console.log("Error in deleting trip", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

//Seminars Controller
export const createSeminar = async (req, res) => {
  const seminar = req.body;

  const requiredFields = [
    "title",
    "description",
    "date",
    "time",
    "location",
    "highlights",
  ];
  const missingFields = requiredFields.filter((field) => !seminar[field]);

  if (missingFields.length > 0) {
    return res.status(400).json({
      success: false,
      message: `Missing required fields: ${missingFields.join(", ")}`,
    });
  }

  const newSeminar = new Seminar({
    title: seminar.title,
    description: seminar.description,
    date: seminar.date,
    time: seminar.time,
    location: seminar.location,
    type: seminar.type,
    highlights: seminar.highlights,
    status: seminar.status || "Upcoming",
  });

  try {
    await newSeminar.save();
    res.status(201).json({
      success: true,
      message: "Seminar added successfully",
      data: newSeminar,
    });
  } catch (error) {
    console.error("Error in adding new seminar", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

export const getSeminars = async (req, res) => {
  try {
    const seminar = await Seminar.find({});
    res.status(200).json({ success: true, data: seminar });
  } catch (error) {
    console.log("Error in getting Seminar", error.message);
    res.status(400).json({ success: false, message: "Server Error" });
  }
};

export const updateSeminar = async (req, res) => {
  const { id } = req.params;
  const seminar = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      success: false,
      message: "Invalid Seminar ID",
    });
  }

  const validStatus = ["Upcoming", "past"];
  if (seminar.type && !validStatus.includes(seminar.type)) {
    return res.status(400).json({
      success: false,
      message: "Invalid Seminar Status",
    });
  }

  try {
    const existingSeminar = await Seminar.findById(id);

    if (!existingSeminar) {
      return res.status(404).json({
        success: false,
        message: "Seminar not found",
      });
    }

    const updatedSeminar = await Seminar.findByIdAndUpdate(id, seminar, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: "Seminar Updated Successfully",
      data: updatedSeminar,
    });
  } catch (error) {
    console.error("Error in updating Seminar", error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
export const deleteSeminar = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid Seminar Id" });
  }
  try {
    await Seminar.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Seminar deleted" });
  } catch (error) {
    console.log("Error in deleting Seminar", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

//HealthCare Controller
export const createHealthCare = async (req, res) => {
  const healthCare = req.body;

  const requiredFields = ["title", "description", "date", "location"];
  const missingFields = requiredFields.filter((field) => !healthCare[field]);

  if (missingFields.length > 0) {
    return res.status(400).json({
      success: false,
      message: `Missing required fields: ${missingFields.join(", ")}`,
    });
  }

  const newHealthCare = new HealthCare({
    title: healthCare.title,
    description: healthCare.description,
    date: healthCare.date,
    location: healthCare.location,
  });

  try {
    await newHealthCare.save();
    res.status(201).json({
      success: true,
      message: "HealthCare added successfully",
      data: newHealthCare,
    });
  } catch (error) {
    console.error("Error in adding new health care", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

export const getHealthCare = async (req, res) => {
  try {
    const healthCare = await HealthCare.find({});
    res.status(200).json({ success: true, data: healthCare });
  } catch (error) {
    console.log("Error in getting HealthCare", error.message);
    res.status(400).json({ success: false, message: "Server Error" });
  }
};

export const updateHealthCare = async (req, res) => {
  const { id } = req.params;
  const healthCare = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      success: false,
      message: "Invalid HealthCare ID",
    });
  }

  try {
    const existingHealthCare = await HealthCare.findById(id);

    if (!existingHealthCare) {
      return res.status(404).json({
        success: false,
        message: "Health Care not found",
      });
    }

    const updatedHealthCare = await HealthCare.findByIdAndUpdate(
      id,
      healthCare,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Health Care Updated Successfully",
      data: updatedHealthCare,
    });
  } catch (error) {
    console.error("Error in updating healthCare", error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
export const deleteHealthCare = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid health Care Id" });
  }
  try {
    await HealthCare.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "health Care deleted" });
  } catch (error) {
    console.log("Error in deleting health Care", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Debates controller

export const createDebate = async (req, res) => {
  const debate = req.body;

  const requiredFields = [
    "title",
    "topic",
    "description",
    "date",
    "location",
    "participants",
  ];
  const missingFields = requiredFields.filter((field) => !debate[field]);

  if (missingFields.length > 0) {
    return res.status(400).json({
      success: false,
      message: `Missing required fields: ${missingFields.join(", ")}`,
    });
  }

  const newDebate = new Debate({
    title: debate.title,
    topic: debate.topic,
    description: debate.description,
    date: debate.date,
    location: debate.location,
    participants: debate.participants,
    status: debate.status || "Upcoming",
    eventType: debate.eventType || "Academic",
  });

  try {
    await newDebate.save();
    res.status(201).json({
      success: true,
      message: "Debate added successfully",
      data: newDebate,
    });
  } catch (error) {
    console.error("Error in adding new health care", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

export const getDebate = async (req, res) => {
  try {
    const debate = await Debate.find({});
    res.status(200).json({ success: true, data: debate });
  } catch (error) {
    console.log("Error in getting Debate", error.message);
    res.status(400).json({ success: false, message: "Server Error" });
  }
};

export const updateDebate = async (req, res) => {
  const { id } = req.params;
  const debate = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      success: false,
      message: "Invalid Debate ID",
    });
  }

  try {
    const existingDebate = await Debate.findById(id);

    if (!existingDebate) {
      return res.status(404).json({
        success: false,
        message: "Debate Care not found",
      });
    }

    const updatedDebate = await Debate.findByIdAndUpdate(id, debate, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: "Debate Updated Successfully",
      data: updatedDebate,
    });
  } catch (error) {
    console.error("Error in updating Debate", error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
export const deleteDebate = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid debate Id" });
  }
  try {
    await Debate.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Debate deleted" });
  } catch (error) {
    console.log("Error in deleting debate", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Collaboration and Partnership controllers
export const createCollaboration = async (req, res) => {
  const collaboration = req.body;

  const requiredFields = ["names", "image"];
  const missingFields = requiredFields.filter((field) => !collaboration[field]);

  if (missingFields.length > 0) {
    return res.status(400).json({
      success: false,
      message: `Missing required fields: ${missingFields.join(", ")}`,
    });
  }

  const newCollaboration = new Collaboration({
    names: collaboration.names,
    image: collaboration.image,
  });

  try {
    await newCollaboration.save();
    res.status(201).json({
      success: true,
      message: "Collaborator added successfully",
      data: newCollaboration,
    });
  } catch (error) {
    console.error("Error in adding new health care", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

export const getCollaboration = async (req, res) => {
  try {
    const collaboration = await Collaboration.find({});
    res.status(200).json({ success: true, data: collaboration });
  } catch (error) {
    console.log("Error in getting collaborator", error.message);
    res.status(400).json({ success: false, message: "Server Error" });
  }
};

export const updateCollaboration = async (req, res) => {
  const { id } = req.params;
  const collaboration = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      success: false,
      message: "Invalid collaboration ID",
    });
  }

  try {
    const existingCollaboration = await Collaboration.findById(id);

    if (!existingCollaboration) {
      return res.status(404).json({
        success: false,
        message: "Collaboration Care not found",
      });
    }

    const updatedCollaboration = await Collaboration.findByIdAndUpdate(
      id,
      collaboration,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Collaboration Updated Successfully",
      data: updatedCollaboration,
    });
  } catch (error) {
    console.error("Error in updating Collaboration", error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
export const deleteCollaboration = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid Collaboration Id" });
  }
  try {
    await Collaboration.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Collaboration deleted" });
  } catch (error) {
    console.log("Error in deleting Collaboration", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
