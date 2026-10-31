import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQSection() {
  const faqs = [
    {
      question: "What courses do you offer in Astrology & Vaastu?",
      answer: "We offer structured courses ranging from foundational to advanced levels in Vedic Astrology, Medical Astrology, Vaastu Shastra, and Karmic Astrology. All courses are curated and taught with deep practical case studies."
    },
    {
      question: "Are these courses suitable for beginners?",
      answer: "Yes, our curriculum starts from the fundamental concepts of Vedic astrology and energy architecture, making them accessible to beginners while progressing into sophisticated predictive techniques for advanced practitioners."
    },
    {
      question: "Will I receive a certificate after completing a course?",
      answer: "Yes, upon completing the course modules and practical assignments, students receive an official certificate of completion from Vedic Intuition."
    },
    {
      question: "How do I enroll in a course or book a consultation?",
      answer: "You can explore available courses under the Courses tab and submit an enrollment enquiry, or click 'Book Consultation' to schedule a personalized one-on-one session with Aacharya Om Shah."
    },
    {
      question: "Do you offer astrology consultations?",
      answer: "Yes, we offer comprehensive astrology consultations with experienced astrologers. Sessions can be booked online and conducted via video call or phone at your convenience."
    },
    {
      question: "Do you offer vaastu consultation?",
      answer: "Yes, we need a soft copy of your house/office map to prepare an energy grid. Based on it, we analyze directional energies and suggest practical, non-destructive Vaastu remedies."
    }
  ];

  return (
    <Accordion type="single" collapsible className="w-full">
      {faqs.map((faq, index) => (
        <AccordionItem key={index} value={`item-${index}`} data-testid={`faq-item-${index}`}>
          <AccordionTrigger className="text-left text-base font-semibold" data-testid={`faq-question-${index}`}>
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground leading-relaxed" data-testid={`faq-answer-${index}`}>
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
