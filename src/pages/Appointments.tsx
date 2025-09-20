import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { CheckCircle } from "lucide-react";
import Calendar from "@/components/Calender"; // custom calendar
import { useUser } from "@/contexts/UserContext";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

// Generate slots 9 AM → 10 PM
const generateTimeSlots = () => {
  const slots: string[] = [];
  for (let hour = 9; hour <= 22; hour++) {
    const displayHour = hour > 12 ? hour - 12 : hour;
    const ampm = hour >= 12 ? "PM" : "AM";
    slots.push(`${displayHour}:00 ${ampm}`);
  }
  return slots;
};
const timeSlots = generateTimeSlots();

export default function Appointments() {
  const { mentorId } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();

  const [mentor, setMentor] = useState<any | null>(null);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split("T")[0] // default to today
  );
  const [selectedSlot, setSelectedSlot] = useState<string>("");

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  // Fetch mentor details
  useEffect(() => {
    if (!mentorId) return;

    const fetchMentor = async () => {
      try {
        const { data } = await axios.get(`${API_BASE}/api/mentors/${mentorId}`);
        console.log("fetched data is :", data)
        setMentor(data);
      } catch (err: any) {
        console.error(err);
      }
    };

    fetchMentor();
  }, [mentorId]);

  // Fetch mentor appointments
  useEffect(() => {
  if (!mentorId) return;

  const fetchAppointments = async () => {
    try {
      const { data } = await axios.get(`${API_BASE}/api/appointments/mentors/${mentor._id}`);
      setAppointments(data);
    } catch (err: any) {
      console.error(err);
    }
  };

  fetchAppointments();
  console.log(appointments)
}, [mentorId, selectedDate]);


  // Book appointment
  const handleBook = async () => {
    if (!selectedDate || !selectedSlot || !mentorId) return;

    setIsDialogOpen(true);
    setIsLoading(true);

    try {
      const studentId = user.id;

      const { data } = await axios.post(
        `${API_BASE}/api/appointments`,
        { mentorId: mentor._id, studentId, date: selectedDate, timeSlot: selectedSlot },
        { headers: { "Content-Type": "application/json" } }
      );

      setIsConfirmed(true);
      // Refresh appointments after booking
      const { data: updated } = await axios.get(`${API_BASE}/api/appointments/${mentorId}`);
      setAppointments(updated);
    } catch (err: any) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Determine slot status
  const getSlotStatus = (slot: string) => {
  const app = appointments.find(
    (a) => a.date === selectedDate && a.timeSlot === slot
  );
  if (app?.status === "pending") return "pending"; // orange
  if (app?.status === "accepted") return "booked"; // gray

  // Disable past slots if selected date is today
  const now = new Date();
  const todayStr = now.toISOString().split("T")[0];
  if (selectedDate === todayStr) {
    const slotHour = parseInt(slot.split(":")[0], 10);
    const slotAMPM = slot.split(" ")[1];
    const slot24 =
      slotAMPM === "PM" && slotHour !== 12
        ? slotHour + 12
        : slotAMPM === "AM" && slotHour === 12
        ? 0
        : slotHour;
    if (slot24 <= now.getHours()) return "past"; // mark as past
  }

  return "available"; // green
};


  return (
    <>
      <Card className="max-w-6xl mx-auto mt-8 p-8 rounded-2xl shadow-lg">
        <div className="flex justify-between mb-6 flex-wrap">
          <CardHeader className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              {mentor ? `Book Appointment with ${mentor.userId?.name}` : "Loading..."}
            </h2>
            <p className="text-sm text-gray-500">{mentor?.specialty || "Specialty"}</p>
          </CardHeader>
          <CardHeader className="w-fit">
            <Button onClick={() => navigate("/student-dashboard")}>Go back</Button>
          </CardHeader>
        </div>

        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Calendar */}
            <div>
              <h3 className="font-medium mb-3 text-gray-700">Select Date:</h3>
              <Calendar selectedDate={selectedDate} onSelect={setSelectedDate} />
            </div>

            {/* Slots */}
            <div>
              <h3 className="font-medium mb-3 text-gray-700">
                {selectedDate
                  ? `Available Slots on ${new Date(selectedDate).toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "short",
                      day: "numeric",
                    })}`
                  : "Select a date to view available slots"}
              </h3>

              {selectedDate ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {timeSlots.map((slot) => {
  const status = getSlotStatus(slot);
  const isSelected = selectedSlot === slot;
  let bg = "", text = "", cursor = "cursor-pointer";

  switch (status) {
    case "available":
      bg = isSelected ? "bg-green-50" : "bg-white";
      text = isSelected ? "text-green-700 font-semibold" : "text-green-600";
      break;
    case "pending":
      bg = isSelected ? "bg-orange-100" : "bg-white";
      text = isSelected ? "text-orange-700 font-semibold" : "text-orange-600";
      break;
    case "booked":
    case "past":
      bg = "bg-gray-200";
      text = "text-gray-400 cursor-not-allowed";
      cursor = "cursor-not-allowed";
      break;
  }

  return (
    <div
      key={slot}
      onClick={() => status === "available" && setSelectedSlot(slot)}
      className={`rounded-lg px-4 py-2 text-center border transition ${bg} ${text} ${cursor}`}
    >
      {slot}
    </div>
  );
})}

                </div>
              ) : (
                <p className="text-gray-500 text-sm">Please select a date from the calendar.</p>
              )}

              {/* Confirm button */}
              <Button
                className="mt-6 w-full rounded-lg py-3 text-lg"
                onClick={handleBook}
                disabled={!selectedDate || !selectedSlot || getSlotStatus(selectedSlot) === "booked"}
              >
                Confirm Booking
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Confirmation Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="flex flex-col items-center justify-center p-8 rounded-2xl">
          <DialogTitle className="sr-only">Booking Confirmation</DialogTitle>
          <DialogDescription className="sr-only">Shows the confirmation status of your appointment</DialogDescription>

          {isLoading ? (
            <>
              <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-gray-700 font-medium">Booking your appointment...</p>
            </>
          ) : isConfirmed ? (
            <>
              <CheckCircle className="w-16 h-16 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Appointment Confirmed!</h3>
              <p className="text-gray-600 mb-6 text-center">
                Your session with {mentor?.userId?.name} on{" "}
                {new Date(selectedDate).toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "short",
                  day: "numeric",
                })}{" "}
                at {selectedSlot} is confirmed.
              </p>
              <Button className="px-6 py-2 rounded-lg" onClick={() => setIsDialogOpen(false)}>
                Done
              </Button>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
}
