
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const NewsSection = () => {
  const newsItems = [
    {
      title: "MentxTv raises Rs 5 Cr in seed round",
      source: "ENTRACKR",
      color: "bg-blue-500"
    },
    {
      title: "HostBooks, MentxTv, and EduGorilla raise early-stage capital",
      source: "YOURSTORY",
      color: "bg-indigo-600"
    },
    {
      title: "MentxTv raises Rs 5 crore in funding from GSF, Angel List US",
      source: "THE ECONOMIC TIMES",
      color: "bg-teal-600"
    },
    {
      title: "MentxTv raises Rs 5 crore in seed funding from GSF, Angel List US, others",
      source: "BUSINESS STANDARD",
      color: "bg-gray-700"
    }
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            MentxTv in News
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            We have a long way to go and these mentions are a validation that we are being loved. Check below to stay 
            updated with all our insights!
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {newsItems.map((item, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100"
            >
              <div className={`${item.color} h-48 flex items-center justify-center relative overflow-hidden`}>
                <div className="absolute top-4 right-4 bg-black/20 text-white px-3 py-1 rounded-full text-xs font-medium">
                  {item.source}
                </div>
                <h3 className="text-white font-bold text-xl px-6 text-center leading-tight">
                  MentxTv
                </h3>
              </div>
              <div className="p-6">
                <h4 className="font-semibold text-gray-900 mb-4 leading-snug group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h4>
                <ExternalLink size={20} className="text-gray-400 group-hover:text-blue-600 transition-colors" />
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center space-x-2 mb-8">
          <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
        </div>

        <div className="text-center">
          <Button 
            size="lg"
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Click for Updates
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
