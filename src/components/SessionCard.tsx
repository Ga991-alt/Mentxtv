
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Users, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";

interface SessionCardProps {
  id: string;
  title: string;
  mentor: string;
  date: string;
  time: string;
  duration: string;
  availableSlots: number;
  totalSlots: number;
  rating: number;
  subjects: string[];
  price: number;
  isBooked?: boolean;
  students?:string[]
}

const SessionCard = ({
  id,
  title,
  mentor,
  date,
  time,
  duration,
  availableSlots,
  totalSlots,
  rating,
  subjects,
  price,
  students
  // isBooked = false
}: SessionCardProps) => {
  const {user} = useUser();
  const slotsText = `${availableSlots}/${totalSlots}`;
  let isBooked = false;
  students.map((student)=>{
    if(student===user.id) isBooked=true
  })

  return (
    <Card className="w-full max-w-sm h-full flex flex-col">
      <CardContent className="p-6 space-y-4 flex-1 flex flex-col">
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-lg leading-tight flex-1">{title}</h3>
            <Badge 
              variant="outline" 
              className="text-green-600 border-green-600 text-xs px-3 py-1 font-medium whitespace-nowrap"
            >
              {slotsText} slots
            </Badge>
          </div>
          
          <p className="text-gray-600 text-sm">by {mentor}</p>
          
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium">{rating}</span>
          </div>
        </div>

        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 flex-shrink-0" />
            <span>{date}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 flex-shrink-0" />
            <span>{time} • {duration}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 flex-shrink-0" />
            <span>{availableSlots} available</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1">
          {subjects.map((subject, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {subject}
            </Badge>
          ))}
        </div>

        <div className="mt-auto space-y-3 pt-4">
          <div className="text-2xl font-bold">₹{price}</div>
          
          {(availableSlots>0 )? (isBooked ? (
            <Button disabled className="w-full">
              Booked
            </Button>
          ) : (
            <Link to={`/payment/${id}`} className="block">
              <Button className="w-full">
                Book Now
              </Button>
            </Link>
          )):(<Button className="w-full bg-red-700">
                Booking Closed
              </Button>)}
        </div>
      </CardContent>
    </Card>
  );
};

export default SessionCard;
