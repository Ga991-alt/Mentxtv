import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useBlog } from "@/contexts/BlogContext";

const Blogs = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const { getPublishedBlogs } = useBlog();

  const publishedBlogs = getPublishedBlogs();

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      "JEE Analysis": "bg-orange-600",
      "NEET Preparation": "bg-blue-600",
      "Parent Guide": "bg-purple-600",
      "Study Materials": "bg-blue-500",
      "Career Guidance": "bg-teal-600",
      "Study Tips": "bg-indigo-600",
    };
    return colors[category] || "bg-gray-600";
  };

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Featured Articles with Auto-Scroll */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Featured Articles
            </h1>
            <p className="text-xl text-gray-600">
              Stay updated with the latest insights and tips for exam
              preparation
            </p>
          </div>

          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 4000,
              }),
            ]}
            className="w-full max-w-6xl mx-auto"
            setApi={setApi}
          >
            <CarouselContent>
              {publishedBlogs.slice(0, 6).map((blog) => (
                <CarouselItem key={blog.id}>
                  <div className="grid lg:grid-cols-2 gap-12 items-center p-4">
                    <div>
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-80 object-cover rounded-2xl shadow-lg"
                      />
                    </div>
                    <div className="space-y-6">
                      <h2 className="text-3xl font-bold text-gray-900 leading-tight">
                        {blog.title}
                      </h2>
                      <p className="text-gray-600 leading-relaxed">
                        {blog.content.substring(0, 200)}...
                      </p>
                      <div className="flex items-center space-x-6 text-sm text-gray-500">
                        <div className="flex items-center space-x-2">
                          <Calendar size={16} />
                          <span>
                            {new Date(blog.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <User size={16} />
                          <span>{blog.author}</span>
                        </div>
                      </div>
                      <Link to={`/blog/${blog.id}`}>
                        <Button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full font-medium inline-flex items-center space-x-2">
                          <span>Read More</span>
                          <ArrowRight size={16} />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>

          {/* Pagination dots */}
          <div className="flex justify-center space-x-2 mt-12">
            {Array.from({ length: count }).map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === current - 1 ? "bg-blue-500" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Explore Articles */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Explore Articles
            </h2>
            <p className="text-xl text-gray-600">
              Discover more insights and guidance for your exam preparation
              journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {publishedBlogs.map((blog) => (
              <div
                key={blog.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100"
              >
                <div className="relative">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div
                    className={`absolute top-4 left-4 ${getCategoryColor(
                      blog.category
                    )} text-white px-3 py-1 rounded-full text-xs font-medium`}
                  >
                    {blog.category}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-bold text-lg text-gray-900 mb-3 leading-tight group-hover:text-blue-600 transition-colors">
                    {blog.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {blog.content.substring(0, 120)}...
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">
                      {new Date(blog.date).toLocaleDateString("en-US", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                    <Link to={`/blog/${blog.id}`}>
                      <Button
                        size="sm"
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full text-xs font-medium"
                      >
                        Read More
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blogs;
