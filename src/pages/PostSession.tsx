import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Users, IndianRupee, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useUser } from "@/contexts/UserContext";
import axios from "axios";

const PostSession = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const { user } = useUser();

  const [sessionData, setSessionData] = useState({
    title: "",
    description: "",
    mentorName: user?.name || "",
    subject: "",
    date: "",
    time: "",
    duration: "",
    totalSlots: "",
    price: "",
    type: "group" as "group" | "onetoone"
  });

  const handleInputChange = (field: string, value: string) => {
    setSessionData(prev => ({
      ...prev,
      [field]: value,
      // Automatically set slots to 1 when switching to one-to-one
      ...(field === 'type' && value === 'onetoone' ? { totalSlots: "1" } : {})
    }));
  };

  const handleSubmit = async () => {
    const requiredFields = ["title", "subject", "date", "time", "price"];
    // Only require totalSlots for group sessions
    if (sessionData.type === "group") {
      requiredFields.push("totalSlots");
    }

    const missingFields = requiredFields.filter((field) => !sessionData[field]);

    if (missingFields.length > 0 || !user?.id) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    try {
      const payload = {
        mentorId: user.id,
        mentorName: user.name,
        title: sessionData.title,
        subject: sessionData.subject,
        date: sessionData.date,
        time: sessionData.time,
        seats: parseInt(sessionData.totalSlots),
        description: sessionData.description,
        duration: sessionData.duration,
        price: parseInt(sessionData.price),
        type: sessionData.type,
      };

      const sessionRes = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/sessions`,
        payload
      );

      const newSessionId = sessionRes.data._id;

      const mentorRes = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/mentors/${user.email}`
      );
      const mentorId = mentorRes.data._id;
      
      await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/mentors/${mentorId}`, {
        $push: { sessions: newSessionId },
        updatedAt: new Date(),
      });

      toast({
        title: "Session Posted Successfully!",
        description: "Your session has been posted and mentor profile updated.",
      });

      navigate("/mentor-dashboard");
    } catch (error) {
      console.error("Failed to post session or update mentor:", error);
      toast({
        title: "Submission Failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  const subjects = [
    "Physics", "Chemistry", "Mathematics", "Biology", 
    "English", "History", "Geography", "Computer Science", 
    "Economics", "NEET Preparation", "JEE Preparation", "UPSC Preparation"
  ];

  const timeSlots = [
    "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", 
    "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", 
    "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM","9:00 PM","10:00 PM"
  ];

  const durations = ["30 minutes", "1 hour", "1.5 hours", "2 hours", "2.5 hours", "3 hours"];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Button 
            variant="outline" 
            onClick={() => navigate('/mentor-dashboard')}
            className="mb-4"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Post New Session</h1>
          <p className="text-gray-600">Create a new mentorship session for students to book.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form */}
          <Card>
            <CardHeader>
              <CardTitle>Session Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="title">Session Title *</Label>
                <Input
                  id="title"
                  value={sessionData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="e.g., NEET Biology Mastery"
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={sessionData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Brief description of the session..."
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="subject">Subject *</Label>
                <Select 
                  value={sessionData.subject} 
                  onValueChange={(value) => handleInputChange('subject', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((subject) => (
                      <SelectItem key={subject} value={subject}>
                        {subject}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">Date *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={sessionData.date}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="time">Time *</Label>
                  <Select 
                    value={sessionData.time} 
                    onValueChange={(value) => handleInputChange('time', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="duration">Duration *</Label>
                <Select 
                  value={sessionData.duration} 
                  onValueChange={(value) => handleInputChange('duration', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    {durations.map((duration) => (
                      <SelectItem key={duration} value={duration}>
                        {duration}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="type">Session Type</Label>
                <div className="flex gap-4 mt-2">
                  <div 
                    className={`flex-1 border rounded-md p-4 cursor-pointer ${sessionData.type === "group" ? "border-blue-500 bg-blue-50" : "border-gray-200"}`}
                    onClick={() => handleInputChange('type', 'group')}
                  >
                    <div className="flex items-center gap-2">
                      {sessionData.type === "group" && (
                        <span className="h-4 w-4 rounded-full bg-blue-500 flex items-center justify-center">
                          <span className="h-2 w-2 rounded-full bg-white"></span>
                        </span>
                      )}
                      {sessionData.type !== "group" && (
                        <span className="h-4 w-4 rounded-full border border-gray-300"></span>
                      )}
                      <span>Group Session</span>
                    </div>
                  </div>
                  <div 
                    className={`flex-1 border rounded-md p-4 cursor-pointer ${sessionData.type === "onetoone" ? "border-blue-500 bg-blue-50" : "border-gray-200"}`}
                    onClick={() => handleInputChange('type', 'onetoone')}
                  >
                    <div className="flex items-center gap-2">
                      {sessionData.type === "onetoone" && (
                        <span className="h-4 w-4 rounded-full bg-blue-500 flex items-center justify-center">
                          <span className="h-2 w-2 rounded-full bg-white"></span>
                        </span>
                      )}
                      {sessionData.type !== "onetoone" && (
                        <span className="h-4 w-4 rounded-full border border-gray-300"></span>
                      )}
                      <span>One-to-One</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {sessionData.type === "group" ? (
                  <div>
                    <Label htmlFor="totalSlots">Total Slots *</Label>
                    <Input
                      id="totalSlots"
                      type="number"
                      value={sessionData.totalSlots}
                      onChange={(e) => handleInputChange('totalSlots', e.target.value)}
                      placeholder="e.g., 15"
                      min="1"
                      max="50"
                    />
                  </div>
                ) : (
                  <div className="hidden">
                    <Input
                      id="totalSlots"
                      type="hidden"
                      value="1"
                    />
                  </div>
                )}
                <div className={sessionData.type === "onetoone" ? "col-span-2" : ""}>
                  <Label htmlFor="price">Price (₹) *</Label>
                  <Input
                    id="price"
                    type="number"
                    value={sessionData.price}
                    onChange={(e) => handleInputChange('price', e.target.value)}
                    placeholder="e.g., 750"
                    min="0"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <Button 
                  onClick={handleSubmit}
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                >
                  Post Session
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Preview */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent>
              {sessionData.title ? (
                <div className="border rounded-lg p-4 bg-white shadow-sm">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-lg">{sessionData.title || "Session Title"}</h3>
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      {sessionData.totalSlots}/{sessionData.totalSlots} slots
                    </Badge>
                  </div>
                  
                  <p className="text-gray-600 mb-3">
                    by {sessionData.mentorName || "Mentor Name"}
                  </p>
                  
                  <div className="flex items-center gap-1 mb-2">
                    <span className="text-yellow-400">★</span>
                    <span className="text-sm text-gray-600">New</span>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar size={14} />
                      <span>{sessionData.date || "Date"}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock size={14} />
                      <span>{sessionData.time || "Time"} • {sessionData.duration || "Duration"}</span>
                    </div>
                    {sessionData.type === "group" && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Users size={14} />
                        <span>{sessionData.totalSlots || "0"} available</span>
                      </div>
                    )}
                  </div>
                  
                  {sessionData.subject && (
                    <div className="mb-4">
                      <Badge variant="secondary">{sessionData.subject}</Badge>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <IndianRupee size={18} className="text-gray-900" />
                      <span className="text-xl font-bold">{sessionData.price || "0"}</span>
                    </div>
                    <Button className="bg-gray-900 hover:bg-gray-800">
                      Book Now
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  Fill in the session details to see preview
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PostSession;