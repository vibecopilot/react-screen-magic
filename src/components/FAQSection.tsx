import { useState, useEffect, useRef } from "react";
import { ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "WHAT IS MYCITI?",
    answer: "MyCiti is an all-in-one SaaS platform for commercial real estate enterprises, integrating pre-sales CRM, post-sales support, construction management (Konstruct), AI copilot (VibeCopilot), HRMS, and property possession workflows into a unified dashboard."
  },
  {
    question: "WHICH INDUSTRIES CAN BENEFIT FROM MYCITI?",
    answer: "Commercial real estate developers, construction firms, property management companies, sales teams, and HR departments handling leasing, project tracking, employee management, and property handovers."
  },
  {
    question: "HOW DOES MYCITI ENHANCE TEAM COLLABORATION?",
    answer: "Real-time shared dashboards across all 6 modules enable sales teams to sync with construction PMs, HR to track employee assignments, and post-sales support to access live possession updates - all with @mentions and activity feeds."
  },
  {
    question: "DOES MYCITI INTEGRATE WITH OTHER SOFTWARE?",
    answer: "Yes, central MyCiti hub connects seamlessly to your existing CRM, accounting, HR tools, and construction software via API, Zapier, and native connectors - hover reveals sub-features per module."
  },
  {
    question: "IS MYCITI CUSTOMIZABLE?",
    answer: "Fully customizable dashboards, role-based permissions, white-label options, custom workflows, and module-specific templates - configure via no-code builder or VibeCopilot AI assistant."
  }
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [visibleItems, setVisibleItems] = useState<boolean[]>(new Array(faqs.length).fill(false));
  const [headerVisible, setHeaderVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === sectionRef.current && entry.isIntersecting) {
            setHeaderVisible(true);
          }
          itemRefs.current.forEach((ref, index) => {
            if (entry.target === ref && entry.isIntersecting) {
              setTimeout(() => {
                setVisibleItems(prev => {
                  const newState = [...prev];
                  newState[index] = true;
                  return newState;
                });
              }, index * 100);
            }
          });
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 px-4 scroll-mt-24" ref={sectionRef}>
      <div className="max-w-3xl mx-auto">
        <p 
          className={`text-gray-500 text-sm uppercase tracking-widest text-center mb-3 transition-all duration-700 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          FAQ
        </p>
        <h2 
          className={`text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12 transition-all duration-700 delay-100 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          Frequently Asked Questions
        </h2>
        {faqs.map((faq, index) => (
          <div 
            key={index} 
            ref={(el) => itemRefs.current[index] = el}
            className={`border-b border-gray-300 hover:bg-gray-50 transition-all duration-500 ${
              visibleItems[index] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full py-6 px-4 flex items-start justify-between text-left group"
            >
              <span className="text-gray-900 font-medium text-base md:text-lg tracking-wide pr-4 group-hover:text-primary transition-colors duration-200">
                {index + 1}. {faq.question}
              </span>
              <ChevronUp 
                className={`w-5 h-5 text-gray-900 flex-shrink-0 mt-1 transition-transform duration-300 ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                openIndex === index ? 'max-h-96 pb-6' : 'max-h-0'
              }`}
            >
              <p className="text-gray-600 text-sm md:text-base leading-relaxed pr-10 px-4">
                {faq.answer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
