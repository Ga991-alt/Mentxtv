import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { CheckCircle } from "lucide-react";
import Calendar from "@/components/Calender"; // custom calendar
import { Navigator } from "react-router-dom";


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
  const mentor = {
    id: "1",
    name: "Dr. Aditi Sharma",
    specialty: "Mathematics",
    avatarUrl: "https://i.pravatar.cc/300?img=47",
  };

  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedSlot, setSelectedSlot] = useState<string>("");

  // Modal states
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleBook = () => {
    if (!selectedDate || !selectedSlot) return;

    setIsDialogOpen(true);
    setIsLoading(true);

    // simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsConfirmed(true);
    }, 1500);
  };

  return (
    <>
      <Card className="max-w-6xl mx-auto mt-8 p-8 rounded-2xl shadow-lg">
<div className="flex justify-between  mb-6">
        <CardHeader className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Book Appointment with {mentor.name}
          </h2>
          <p className="text-sm text-gray-500">{mentor.specialty}</p>
        </CardHeader>
        <CardHeader className="w-fit"><Button className="" onClick={()=>{navigate('/student-dashboard')}}>Go back</Button></CardHeader></div>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: Calendar */}
            <div>
              <h3 className="font-medium mb-3 text-gray-700">Select Date:</h3>
              <Calendar selectedDate={selectedDate} onSelect={setSelectedDate} />
            </div>

            {/* Right: Slots */}
            <div>
              <h3 className="font-medium mb-3 text-gray-700">
                {selectedDate
                  ? `Available Slots on ${new Date(selectedDate).toLocaleDateString(
                      "en-US",
                      { weekday: "long", month: "short", day: "numeric" }
                    )}`
                  : "Select a date to view available slots"}
              </h3>

              {selectedDate ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {timeSlots.map((slot) => {
                    const isAvailable = true;
                    const isSelected = selectedSlot === slot;

                    return (
                      <div
                        key={slot}
                        onClick={() => isAvailable && setSelectedSlot(slot)}
                        className={`cursor-pointer rounded-lg px-4 py-2 text-center border transition 
                          ${
                            isAvailable
                              ? isSelected
                                ? "border-green-600 bg-green-50 text-green-700 font-semibold"
                                : "border-green-500 text-green-600 hover:bg-green-50"
                              : "border-gray-300 text-gray-400 cursor-not-allowed"
                          }
                        `}
                      >
                        {slot}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">
                  Please select a date from the calendar.
                </p>
              )}

              {/* Book Button */}
              <Button
                className="mt-6 w-full rounded-lg py-3 text-lg"
                onClick={handleBook}
                disabled={!selectedDate || !selectedSlot}
              >
                Confirm Booking
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Modal */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="flex flex-col items-center justify-center p-8 rounded-2xl">
          {isLoading ? (
            <>
              <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-gray-700 font-medium">Booking your appointment...</p>
            </>
          ) : isConfirmed ? (
            <>
              <CheckCircle className="w-16 h-16 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Appointment Confirmed!
              </h3>
              <p className="text-gray-600 mb-6 text-center">
                Your session with {mentor.name} on{" "}
                {new Date(selectedDate).toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "short",
                  day: "numeric",
                })}{" "}
                at {selectedSlot} is confirmed.
              </p>
              <Button
                className="px-6 py-2 rounded-lg"
                onClick={() => setIsDialogOpen(false)}
              >
                Done
              </Button>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
}
