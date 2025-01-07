import { create } from "zustand";

export const meetingStore = create((set) => ({
  meeting: [],
  setMeeting: (meeting) => set({ meeting }),

  createNewMeeting: async (newMeeting) => {
    if (
      !newMeeting.frequency ||
      !newMeeting.day ||
      !newMeeting.location ||
      !newMeeting.description
    ) {
      return {
        success: false,
        message: "All field are required",
      };
    }

    const res = await fetch("/api/meeting", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMeeting),
    });
    const data = await res.json();
    set((state) => ({ meeting: [...state.meeting, data.data] }));
    return { success: true, message: "Meeting added successfully" };
  },

  fetchMeeting: async () => {
    const res = await fetch("/api/meeting");
    const data = await res.json();

    set({ meeting: data.data });
  },
  updateMeeting: async (uid, updatedMeeting) => {
    const res = await fetch(`/api/meeting/${uid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedMeeting),
    });

    const data = await res.json();

    if (!data.success) return { success: false, message: data.message };

    set((state) => ({
      meeting: state.meeting.map((meeting) =>
        meeting._id === uid ? data.data : meeting
      ),
    }));

    return { success: true, message: "Meeting updated successfully" };
  },
  deleteMeeting: async (meetingId) => {
    const res = await fetch(`/api/meeting/${meetingId}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (!data.success) {
      return { success: false, message: data.message };
    }
    set((state) => ({
      meeting: state.meeting.filter((meeting) => meeting._id !== meetingId),
    }));
    return { success: true, message: data.message };
  },
}));
