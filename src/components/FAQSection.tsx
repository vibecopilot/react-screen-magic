import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const faqs = [
  {
    question: "What is MyCiti?",
    answer: "MyCiti is an all-in-one SaaS platform for commercial real estate enterprises, integrating pre-sales CRM, post-sales support, construction management (Konstruct), AI copilot (VibeCopilot), HRMS, and property possession workflows into a unified dashboard."
  },
  {
    question: "Which industries can benefit from MyCiti?",
    answer: "Commercial real estate developers, construction firms, property management companies, sales teams, and HR departments handling leasing, project tracking, employee management, and property handovers."
  },
  {
    question: "How does MyCiti enhance team collaboration?",
    answer: "Real-time shared dashboards across all 6 modules enable sales teams to sync with construction PMs, HR to track employee assignments, and post-sales support to access live possession updates - all with @mentions and activity feeds."
  },
  {
    question: "Does MyCiti integrate with other software?",
    answer: "Yes, central MyCiti hub connects seamlessly to your existing CRM, accounting, HR tools, and construction software via API, Zapier, and native connectors - hover reveals sub-features per module."
  },
  {
    question: "Is MyCiti customizable?",
    answer: "Fully customizable dashboards, role-based permissions, white-label options, custom workflows, and module-specific templates - configure via no-code builder or VibeCopilot AI assistant."
  }
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: faqsRef, isVisible: faqsVisible } = useScrollAnimation();

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div
          ref={headerRef}
          className={cn(
            "text-center mb-12 transition-all duration-700",
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#1E293B] mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-[#64748B] max-w-2xl mx-auto">
            Everything you need to know about MyCiti and how it can transform your real estate operations.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div
          ref={faqsRef}
          className={cn(
            "space-y-6 transition-all duration-700 delay-200",
            faqsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={cn(
                "rounded-2xl overflow-hidden transition-all duration-300",
                "backdrop-blur-[20px] bg-[rgba(248,250,252,0.85)]",
                "border border-white/30 shadow-lg",
                "hover:shadow-xl hover:shadow-[#3B82F6]/10 hover:-translate-y-0.5",
                openIndex === index && "shadow-xl shadow-[#3B82F6]/15"
              )}
              style={{
                maxWidth: "100%",
                minWidth: "380px"
              }}
            >
              {/* Question Button */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left"
              >
                <span className="text-lg font-semibold text-[#3B82F6]">
                  {faq.question}
                </span>
                <ChevronDown
                  className={cn(
                    "w-5 h-5 text-[#3B82F6] flex-shrink-0 transition-transform duration-300 ease-out",
                    openIndex === index && "rotate-180"
                  )}
                />
              </button>

              {/* Answer Panel */}
              <div
                className={cn(
                  "overflow-hidden transition-all duration-300 ease-out",
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                )}
              >
                <div className="px-6 pb-6 pt-0">
                  <div className="h-px bg-gradient-to-r from-transparent via-[#3B82F6]/20 to-transparent mb-4" />
                  <p className="text-[#1E293B] leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
