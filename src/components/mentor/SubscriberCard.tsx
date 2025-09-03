import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Phone, Mail, User, Clock } from "lucide-react";

interface SubscriberCardProps {
  subscriber: {
    id: string;
    name: string;
    email: string;
    phone: string;
    plan: string;
    status: string;
    subscribed: string;
    expires: string;
    totalSessions: number;
    lastSession: string;
    image: string;
  };
}

const getStatusVariant = (status: string) => {
  switch (status.toLowerCase()) {
    case 'ongoing':
      return 'secondary'; // or 'default'
    case 'expiring soon':
      return 'outline';
    case 'expired':
      return 'destructive';
    default:
      return 'secondary';
  }
};

const SubscriberCard = ({ subscriber }: SubscriberCardProps) => {
  return (
    <Card className="group shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 bg-card border border-border">
      <CardContent className="p-6">
        {/* Header Section with Name and Badges */}
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold text-card-foreground mb-3">
            {subscriber.name}
          </h3>
          <div className="flex flex-wrap justify-center gap-2">
            <Badge variant="secondary" className="font-medium">
              {subscriber.plan}
            </Badge>
            <Badge 
              variant={getStatusVariant(subscriber.status)}
              className="font-medium"
            >
              {subscriber.status}
            </Badge>
          </div>
        </div>

        {/* Centered Profile Image */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <img
              src={subscriber.image}
              alt={subscriber.name}
              className="w-24 h-24 rounded-full object-cover border-4 border-border shadow-lg ring-2 ring-primary/10 transition-transform group-hover:scale-105"
            />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full border-2 border-card flex items-center justify-center">
              <User className="w-3 h-3 text-success-foreground" />
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <Mail className="w-4 h-4 text-info" />
            <span className="truncate">{subscriber.email}</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <Phone className="w-4 h-4 text-info" />
            <span>{subscriber.phone}</span>
          </div>
        </div>

        {/* Subscription Details */}
        <div className="bg-secondary/30 rounded-lg p-4 mb-6 flex justify-between">
          <div className="flex items-center flex-col justify-between text-sm gap-y-2">
            <div className="flex items-center gap-2">
              <Calendar className="w-3 h-3 text-primary" />
              <span className="text-muted-foreground text-sm">Subscribed</span>
            </div>
            <span className="font-medium text-card-foreground">{subscriber.subscribed}</span>
          </div>
          <div className="flex items-center flex-col justify-between text-sm gap-y-2">
            <div className="flex items-center gap-2">
              <Calendar className="w-3 h-3 text-warning" />
              <span className="text-muted-foreground text-sm">Expires</span>
            </div>
            <span className="font-medium text-card-foreground">{subscriber.expires}</span>
          </div>
        </div>

        {/* Session Statistics */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-1">
              {subscriber.totalSessions}
            </div>
            <div className="text-xs text-muted-foreground">Total Sessions</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Clock className="w-4 h-4 text-success" />
              <span className="text-sm font-medium text-card-foreground">Last Session</span>
            </div>
            <div className="text-xs text-muted-foreground">{subscriber.lastSession}</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full transition-all hover:bg-primary hover:text-primary-foreground"
          >
            View Profile
          </Button>
          <Button 
  size="sm" 
  className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:opacity-90"
>
  Contact
</Button>


        </div>
      </CardContent>
    </Card>
  );
};

export default SubscriberCard;