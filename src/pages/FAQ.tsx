
import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface FAQ {
  question: string;
  answer: string;
}

const FAQ = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);

  useEffect(() => {
    // Load FAQs from localStorage (in a real app, this would come from an API)
    const savedFaqs = localStorage.getItem('faqs');
    if (savedFaqs) {
      setFaqs(JSON.parse(savedFaqs));
    } else {
      setFaqs([{ question: "No FAQs available", answer: "FAQs have not been set by the administrator yet." }]);
    }
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <div className="pt-20 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-600">
              Find answers to common questions about our platform
            </p>
          </div>
          
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 whitespace-pre-wrap">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default FAQ;
