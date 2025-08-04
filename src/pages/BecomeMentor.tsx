import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { FileText, Shield, Users, Video, CheckCircle, Users2, Award, TrendingUp, X } from "lucide-react";

const BecomeMentor = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    education: "",
    experience: "",
    resume: null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      resume: e.target.files[0]
    }));
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Here you would typically send the form data to your backend
  //   console.log("Form submitted:", formData);
  //   // Reset form and close
  //   setFormData({
  //     name: "",
  //     email: "",
  //     phone: "",
  //     dob: "",
  //     education: "",
  //     experience: "",
  //     resume: null
  //   });
  //   setShowForm(false);
  //   alert("Thank you for your application! We'll review your information and get back to you soon.");
  // };


  const [result, setResult] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "973cfd86-9817-4086-ad3c-7d4ef14c2dca");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };
  const steps = [
    {
      icon: FileText,
      title: "Register & Submit Documents",
      description: "Fill the registration form to become a IIT-JEE | NEET mentor with all the correct information and submit the related documents with the registration form.",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=300&h=200&fit=crop",
      step: "1"
    },
    {
      icon: Shield,
      title: "Background Verification",
      description: "Our qualified team at MentxTv will then conduct your background check and verification of documents shared by you.",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=200&fit=crop",
      step: "2"
    },
    {
      icon: Users,
      title: "Personal Interview",
      description: "On confirming that all information and documents shared by you complies with our rules and regulations you will go through an interview process followed by hiring.",
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=300&h=200&fit=crop",
      step: "3"
    },
    {
      icon: Video,
      title: "Training & Demo Session",
      description: "For the first few days you will be trained by our expert team and after training sessions you will be ready to conduct your first demo session.",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300&h=200&fit=crop",
      step: "4"
    }
  ];

  const benefits = [
    {
      icon: CheckCircle,
      title: "Create an impact in the lives of IIT-JEE | NEET aspirants"
    },
    {
      icon: TrendingUp,
      title: "Start earning along with your regular studies"
    },
    {
      icon: Award,
      title: "Learn professional skills in a fast-growing startup"
    },
    {
      icon: Users2,
      title: "Connect with a Community of IIT- JEE | NEET Mentors"
    },
    {
      icon: FileText,
      title: "Letter of recommendation to best mentors"
    },
    {
      icon: Award,
      title: "Become a Brand Ambassador of a growth- oriented company"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-400 to-blue-600 py-20 px-4 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold mb-6">
                Become a Mentor
              </h1>
              <p className="text-xl mb-8 opacity-90">
                Be a light house for the IIT-JEE | NEET aspirants.
              </p>
              <Button 
                size="lg"
                onClick={() => setShowForm(true)}
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Register as a Mentor
              </Button>
            </div>
            <div className="flex justify-center">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=400&fit=crop" 
                alt="Mentor teaching students"
                className="w-96 h-80 rounded-3xl object-cover shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="bg-gray-800 rounded-2xl aspect-video flex items-center justify-center">
              <div className="text-center text-white">
                <Video size={64} className="mx-auto mb-4 opacity-50" />
                <p className="text-lg">How to become a MENTOR? | MentxTv</p>
                <p className="text-sm opacity-75 mt-2">Watch Later | Share</p>
              </div>
            </div>
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Become a Mentor
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Mentoring is an act that brings change in the lives of many and you can drive this change by becoming a IIT-JEE | NEET mentor at MentxTv. Young enthusiasts who have cleared their IIT-JEE | NEET exam recently with good scores are eligible to become a mentor at MentxTv and reap the many benefits that MentxTv's Mentorship Program offers.
              </p>
              <Button 
                size="lg"
                onClick={() => setShowForm(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 mt-8"
              >
                Register as a Mentor
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* How to Become a Mentor */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              How to Become a <span className="text-blue-600">Mentor?</span>
            </h2>
            <p className="text-xl text-gray-600">
              In just 4 simple steps you can register and join the esteemed community of IIT-JEE | NEET mentors at MentxTv!!
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-6">
                  <img 
                    src={step.image} 
                    alt={step.title}
                    className="w-full h-48 object-cover rounded-2xl group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute -top-4 -right-4 w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Benefits of Becoming a <span className="text-blue-600">Mentor at MentxTv</span>
            </h2>
            <p className="text-xl text-gray-600">
              Grow your network, learn life skills and find your passion with mentoring!
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <benefit.icon size={32} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {benefit.title}
                </h3>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button 
              size="lg"
              onClick={() => setShowForm(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Register as a Mentor
            </Button>
          </div>
        </div>
      </section>

      {/* Registration Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Mentor Registration</h2>
                <button 
                  onClick={() => setShowForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name*
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address*
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number*
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-1">
                      Date of Birth*
                    </label>
                    <input
                      type="date"
                      id="dob"
                      name="dob"
                      value={formData.dob}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="education" className="block text-sm font-medium text-gray-700 mb-1">
                    Educational Qualification*
                  </label>
                  <textarea
                    id="education"
                    name="education"
                    value={formData.education}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Include your degrees, institutions, and years of study"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
                    Teaching/Mentoring Experience*
                  </label>
                  <textarea
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Describe your relevant experience"
                  />
                </div>
                
                {/* <div className="mb-6">
                  <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-1">
                    Upload Resume/CV*
                  </label>
                  <input
                    type="file"
                    id="resume"
                    name="resume"
                    onChange={handleFileChange}
                    required
                    accept=".pdf,.doc,.docx"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                  <p className="mt-1 text-sm text-gray-500">PDF, DOC, or DOCX (Max. 5MB)</p>
                </div> */}
                
                <div className="flex justify-end">
                  <Button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="mr-4 bg-gray-200 text-gray-800 hover:bg-gray-300"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600"
                    disabled={!formData.name || !formData.email || !formData.phone || !formData.dob || !formData.education || !formData.experience || result !== "" /*|| !formData.resume*/}
                  >
                    Submit Application
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default BecomeMentor;