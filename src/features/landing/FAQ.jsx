import React from 'react'
import { useState } from "react";

const faqs = [
  {
    question: "Why do I need a UI Kit / design system?",
    answer: "Bizvance is built for freelancers, small businesses, agencies, and growing startups who want to manage their entire business from one simple dashboard.",
  },
  {
    question: "How quickly can I get up and running?",
    answer: "You can get started in minutes. Just sign up, add your business details, and you're ready to go—no technical setup required.",
  },
  {
    question: "Does it include dark mode?",
    answer: "Yes, Bizvance supports both light and dark mode. You can switch between them from your account settings at any time.",
  },
  {
    question: "Is the UI Kit regularly updated and supported?",
    answer: "Absolutely. We release regular updates with new features, improvements, and bug fixes. All updates are free for existing users.",
  },
  {
    question: "Do you have an affiliate program?",
    answer: "Yes! We have an affiliate program that lets you earn commission for every customer you refer. Reach out to our team to get started.",
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer: "Yes, you can cancel at any time from your account settings. No long-term contracts or cancellation fees.",
  },
];

function FaqItem({ faq, isOpen, onToggle }) {
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-5 py-4 text-left bg-white hover:bg-gray-50 transition-colors"
      >
        <span className="text-sm font-medium text-gray-800 pr-4">{faq.question}</span>
        <span className="text-gray-400 text-xl leading-none flex-shrink-0">
          {isOpen ? "−" : "+"}
        </span>
      </button>
      {isOpen && (
        <div className="px-5 pb-4 bg-white">
          <p className="text-sm text-gray-400 leading-relaxed">{faq.answer}</p>
        </div>
      )}
    </div>
  );
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="bg-[#f4f5fb] py-16 px-4">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-10 md:gap-16 items-start">

        {/* Left heading */}
        <div className="w-full md:w-56 md:flex-shrink-0">
          <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-3 py-1.5 text-xs font-semibold text-gray-500 mb-5 shadow-sm">
            Answers at a Glance
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900 leading-tight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-gray-400 leading-relaxed">
            Everything you need to know before getting started—clear answers, no confusion.
          </p>
        </div>

        {/* Right accordion */}
        <div className="flex-1 flex flex-col gap-3 w-full">
          {faqs.map((faq, index) => (
            <FaqItem
              key={index}
              faq={faq}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

export default FAQ;
