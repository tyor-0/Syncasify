import React from 'react'
import { useState } from "react";

const faqs = [
  {
    question: "Why do i need a ui Kit / design system?",
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
    question: "Is the Ui Kit regularly updated and supported?",
    answer: "Absolutely. We release regular updates with new features, improvements, and bug fixes. All updates are free for existing users.",
  },
  {
    question: "Do you have an affiliate program?",
    answer: "Yes! We have an affiliate program that lets you earn commission for every customer you refer. Reach out to our team to get started.",
  },
  {
    question: "Do you have an affiliate program?",
    answer: "Yes! We have an affiliate program that lets you earn commission for every customer you refer. Reach out to our team to get started.",
  },
];

function FaqItem({ faq, isOpen, onToggle }) {
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-5 py-4 text-left bg-white hover:bg-gray-50 transition-colors"
      >
        <span className="text-sm font-medium text-gray-800">{faq.question}</span>
        <span className="text-gray-400 text-xl leading-none ml-4 flex-shrink-0">
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

  function handleToggle(index) {
    setOpenIndex(openIndex === index ? null : index);
  }

  return (
    <section className="bg-[#f4f5fb] py-20 px-4">
      <div className="max-w-5xl mx-auto flex flex-row gap-16 items-start">

        {/* Left — heading (fixed narrow width) */}
        <div className="w-56 flex-shrink-0">
          <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-3 py-1.5 text-xs font-semibold text-gray-500 mb-5 shadow-sm">
            Answers at a Bizvance
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900 leading-tight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-gray-400 leading-relaxed">
            Everything you need to know before getting started—clear answers, no confusion.
          </p>
        </div>

        {/* Right — accordion (takes all remaining space) */}
        <div className="flex-1 flex flex-col gap-3">
          {faqs.map((faq, index) => (
            <FaqItem
              key={index}
              faq={faq}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

export default FAQ;