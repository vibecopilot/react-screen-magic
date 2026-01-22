import { useState, useEffect, useRef } from "react";
import { ChevronUp } from "lucide-react";
const faqs = [{
  question: "WHAT IS THIS PLATFORM USED FOR?",
  answer: "This platform is an end-to-end real estate management solution that covers the entire lifecycle of a project — from pre-sales and booking to possession and post-handover resident services, all through a single dashboard."
}, {
  question: "WHO IS THIS PLATFORM DESIGNED FOR?",
  answer: "The platform is designed for: Real Estate Developers & Promoters, Sales & Pre-Sales Teams, Finance & Accounts Teams, Facility & Operations Teams, and Property & Community Managers."
}, {
  question: "WHICH STAGES OF A REAL ESTATE PROJECT DOES IT COVER?",
  answer: "It covers: Pre-sales & lead management, Inventory & pricing control, Booking, agreements & payment tracking, Construction & handover workflows, and Post-possession resident engagement & services."
}, {
  question: "CAN WE MANAGE SALES AND CRM ON THE SAME PLATFORM?",
  answer: "Yes. The platform includes a built-in sales CRM to manage leads, site visits, bookings, brokers, conversion tracking, and sales performance — all integrated with inventory and finance."
}, {
  question: "HOW DOES THE PLATFORM HELP WITH FINANCIAL MANAGEMENT?",
  answer: "It helps you: Track customer payments & outstanding dues, Manage demand letters & receipts, Monitor project-level cash flow, Integrate with accounting systems, and Reduce revenue leakage through automation."
}, {
  question: "DOES IT SUPPORT AUTOMATED HANDOVER AND POSSESSION?",
  answer: "Yes. The platform automates: Handover checklists, Documentation tracking, Snag list & defect management, Possession approvals, and Resident onboarding."
}, {
  question: "WHAT RESIDENT SERVICES ARE AVAILABLE AFTER POSSESSION?",
  answer: "Residents can access: Maintenance & service requests, Amenities booking, Visitor & staff management, Notices, announcements & community updates, and Digital documents & payment history."
}, {
  question: "IS THE PLATFORM CUSTOMIZABLE AS PER OUR PROJECT NEEDS?",
  answer: "Yes. The platform is highly configurable based on: Project type (Residential / Commercial / Mixed-use), Organization structure, Approval workflows, and Feature enablement per project."
}, {
  question: "CAN THIS PLATFORM HANDLE MULTIPLE PROJECTS?",
  answer: "Absolutely. You can manage multiple projects, towers, units, and locations from a single login with role-based access."
}, {
  question: "IS DATA SECURE AND COMPLIANT?",
  answer: "Yes. The platform follows enterprise-grade security practices, including: Role-based access control, Data encryption, Audit logs, and Compliance-ready architecture (ISO, SOC2, GDPR-aligned)."
}, {
  question: "CAN IT INTEGRATE WITH EXISTING TOOLS OR SOFTWARE?",
  answer: "Yes. The platform supports integrations with: Accounting & ERP systems, Payment gateways, Access control & IoT devices, and WhatsApp, SMS, email & notification systems."
}, {
  question: "HOW LONG DOES IMPLEMENTATION TAKE?",
  answer: "Typical implementation takes 4–8 weeks, depending on: Number of projects, Modules selected, Data migration requirements, and Custom workflows."
}, {
  question: "WILL TRAINING AND SUPPORT BE PROVIDED?",
  answer: "Yes. We provide: Admin & team training sessions, User manuals & SOPs, Dedicated onboarding support, and Ongoing technical assistance."
}, {
  question: "IS THIS PLATFORM SCALABLE FOR FUTURE EXPANSION?",
  answer: "Yes. The platform is built to scale with: New projects, Growing unit counts, Additional modules, and Increased user load."
}, {
  question: "HOW IS PRICING STRUCTURED?",
  answer: "Pricing is typically based on: Number of units / projects, Modules selected, and Deployment model. A customized proposal is shared after understanding your requirements."
}];
const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [visibleItems, setVisibleItems] = useState<boolean[]>(new Array(faqs.length).fill(false));
  const [headerVisible, setHeaderVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
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
    }, {
      threshold: 0.1
    });
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    itemRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });
    return () => observer.disconnect();
  }, []);
  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return <section id="faq" className="py-12 md:py-20 px-3 sm:px-4 scroll-mt-24" ref={sectionRef}>
      <div className="max-w-3xl mx-auto">
        <p className={`text-gray-500 text-xs sm:text-sm uppercase tracking-widest text-center mb-2 sm:mb-3 transition-all duration-700 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      </p>
        <h2 className="text-4xl font-serif text-center font-medium">
          Frequently Asked Questions
        </h2>
        {faqs.map((faq, index) => <div key={index} ref={el => itemRefs.current[index] = el} className={`border-b border-gray-300 hover:bg-gray-50 transition-all duration-500 ${visibleItems[index] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <button onClick={() => toggleFAQ(index)} className="w-full py-4 sm:py-6 px-3 sm:px-4 flex items-start justify-between text-left group">
              <span className="text-gray-900 font-medium text-sm sm:text-base md:text-lg tracking-wide pr-3 sm:pr-4 group-hover:text-primary transition-colors duration-200">
                {index + 1}. {faq.question}
              </span>
              <ChevronUp className={`w-5 h-5 text-gray-900 flex-shrink-0 mt-1 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96 pb-4 sm:pb-6' : 'max-h-0'}`}>
              <p className="text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed pr-8 sm:pr-10 px-3 sm:px-4">
                {faq.answer}
              </p>
            </div>
          </div>)}
      </div>
    </section>;
};
export default FAQSection;