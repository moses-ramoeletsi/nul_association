import React, {useState, useEffect} from 'react'
import {  Plus,X } from "lucide-react";
import MeetingCard from '../components/MeetingCard';
import { meetingStore } from '../store/meeting.store';

const Meetings = () => {
    
  const [isAddMeetingModalOpen, setIsAddMeetingModalOpen] = useState(false);
  const { fetchMeeting, meeting } = meetingStore();
  const { createNewMeeting } = meetingStore();

 
  const [newMeeting, setMeeting] = useState({
    frequency: "",
    day: "",
    location: "",
    description: "",
  });

  useEffect(() => {
    fetchMeeting();
  }, []);
 


  const handleAddMeeting = () => {
    setIsAddMeetingModalOpen(true);
  };

  const handleSaveNewMeeting = async () => {
    try {
      if (
        !newMeeting.frequency ||
        !newMeeting.day ||
        !newMeeting.location ||
        !newMeeting.description
      ) {
        console.log("Please fill in all fields");
        return;
      }
      const { success, message } = await createNewMeeting(newMeeting);

      if (success) {
        console.log(message || "New meeting added");
        setMeeting({
          frequency: "",
          day: "",
          location: "",
          description: "",
        });
        setIsAddMeetingModalOpen(false);
      } else {
        console.log(message || "Failed to add new meeting");
      }
    } catch (error) {
      console.log("An unexpected error");
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold text-green-900">
        Manage Meetings
      </h2>
      <button
        onClick={handleAddMeeting}
        className="flex items-center px-4 py-2 bg-green-900 text-white rounded-md hover:bg-green-800"
      >
        <Plus className="mr-2" size={20} />
        Add Meeting
      </button>
    </div>
    <div>
      {meeting.map((meeting) => (
        <MeetingCard key={meeting._id} meeting={meeting} />
      ))}
    </div>
    {isAddMeetingModalOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl shadow-lg p-8 w-96 relative">
          <button
            onClick={() => {
              setIsAddMeetingModalOpen(false);
              setEditingMember(null);
              setMeeting({
                frequency: "",
                day: "",
                location: "",
                description: "",
              });
            }}
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
          >
            <X size={24} />
          </button>
          <h2 className="text-2xl font-bold text-green-900 mb-6">
            {editingMember ? "Edit Meeting" : "Add New Meeting"}
          </h2>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Meeting Schedule"
              className="w-full px-3 py-2 border rounded-md"
              value={newMeeting.frequency}
              onChange={(e) =>
                setMeeting({ ...newMeeting, frequency: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Meeting Day"
              className="w-full px-3 py-2 border rounded-md"
              value={newMeeting.day}
              onChange={(e) =>
                setMeeting({ ...newMeeting, day: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Location"
              className="w-full px-3 py-2 border rounded-md"
              value={newMeeting.location}
              onChange={(e) =>
                setMeeting({ ...newMeeting, location: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Description"
              className="w-full px-3 py-2 border rounded-md"
              value={newMeeting.description}
              onChange={(e) =>
                setMeeting({
                  ...newMeeting,
                  description: e.target.value,
                })
              }
            />

            <button
              onClick={
                editingMember
                  ? handleUpdateMember
                  : handleSaveNewMeeting
              }
              className="w-full bg-green-900 text-white py-2 rounded-md hover:bg-green-800"
            >
              {editingMember ? "Update Meeting" : "Save Meeting"}
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
  )
}

export default Meetings