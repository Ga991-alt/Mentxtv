

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface Mentor {
  id: string;
  name: string;
  specialty: string;
  avatarUrl?: string;
}

const mentors: Mentor[] = [
  {
    id: "1",
    name: "Dr. Aditi Sharma",
    specialty: "Mathematics",
    avatarUrl: "https://i.pravatar.cc/300?img=47",
  },
  {
    id: "2",
    name: "Mr. Rohan Mehta",
    specialty: "Physics",
    avatarUrl: "https://i.pravatar.cc/300?img=32",
  },
  {
    id: "3",
    name: "Ms. Kavya Iyer",
    specialty: "Chemistry",
    avatarUrl: "https://i.pravatar.cc/300?img=12",
  },
];

export default function StudentMentors() {
    const navigate = useNavigate();
  return (
    <Card className="w-full mx-auto rounded-2xl shadow-md mb-8">
      <CardHeader>
        <h2 className="text-xl font-semibold text-gray-800">
          Subscribed Teachers
        </h2>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {mentors.map((mentor) => (
            <div
              key={mentor.id}
              className="rounded-xl border shadow-sm overflow-hidden transform transition-transform duration-200 hover:scale-105"
            >
              {/* Top: Full photo */}
              <div className="w-full h-48 bg-gray-100">
                {mentor.avatarUrl ? (
                  <img
                    src={mentor.avatarUrl}
                    alt={mentor.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-lg">
                    {mentor.name.charAt(0)}
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-4 text-center">
                <p className="font-semibold text-gray-800  text-sm">
                  {mentor.name}
                </p>
                <p className="text-xs text-gray-500">{mentor.specialty}</p>

                {/* Button */}
                <Button
  className="mt-4 w-full rounded-lg text-xs"
  onClick={() => navigate(`/appointments/${mentor.id}`)}
>
  Book Now
</Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
