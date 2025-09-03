import { useEffect, useMemo, useState } from "react";
import { useMentors } from "@/contexts/MentorContext";


import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Star, Users } from "lucide-react";

const renderStars = (rating: number) =>
  Array.from({ length: 5 }, (_, i) => (
    <Star key={i} size={16} className={i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"} />
  ));

const Mentors = () => {
  const { mentors, domains } = useMentors();
  
  
  const navigate = useNavigate();
  const [category, setCategory] = useState<string>("all");

  useEffect(() => {
    document.title = "Mentors | MentxTv";
  }, []);

  const filtered = useMemo(() => {
    if (category === "all") return mentors;
    return mentors.filter((m) => m.domain === category);
  }, [mentors, category]);

  const handleSubscribe = (mentorId: string) => {
    navigate(`/mentors/${mentorId}/subscribe`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900">Find Your Mentor</h1>
          <p className="text-gray-600">Browse mentors by category and subscribe to their plans.</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <section className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Category</label>
          <Select defaultValue="all" onValueChange={setCategory}>
            <SelectTrigger className="w-56">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {domains.map((d) => (
                <SelectItem key={d} value={d}>{d}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </section>

        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((m) => (
              <Card key={m.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="p-4">
                    <div className="mb-4">
                      <AspectRatio ratio={1}>
                        {m.image ? (
                          <img src={m.image} alt={`${m.name} mentor portrait`} className="w-full h-full object-cover rounded-lg" />
                        ) : (
                          <div className="w-full h-full rounded-lg bg-gray-100 flex items-center justify-center text-gray-500">No Image</div>
                        )}
                      </AspectRatio>
                    </div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">{m.name}</h3>
                      <Badge variant="outline" className="text-xs">{m.domain}</Badge>
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <div className="flex">{renderStars(m.rating)}</div>
                      <span className="text-sm text-gray-600">({m.rating.toFixed(1)})</span>
                      <div className="ml-auto flex items-center gap-1 text-sm text-gray-700">
                        <Users size={14} /> {m.sessions} sessions
                      </div>
                    </div>

                    {(m.goodFeedback?.length || m.badFeedback?.length) && (
                      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-green-700">Top Good Feedback</p>
                          <ul className="mt-1 list-disc pl-5 text-sm text-gray-700 space-y-1">
                            {(m.goodFeedback || []).slice(0, 10).map((f, i) => (
                              <li key={i}>{f}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-red-700">Top Bad Feedback</p>
                          <ul className="mt-1 list-disc pl-5 text-sm text-gray-700 space-y-1">
                            {(m.badFeedback || []).slice(0, 10).map((f, i) => (
                              <li key={i}>{f}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}

                    <div className="mt-6">
                      <Button className="w-full" onClick={() => handleSubscribe(m.id)}>Subscribe</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Mentors;