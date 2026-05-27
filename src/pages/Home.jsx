import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Import all card images directly
import examinationRegImg from '../assets/home_cards_imgs/examination-registrations.jpg';
import jambRunsImg from '../assets/home_cards_imgs/jamb-runs.jpg';
import admissionProcessingImg from '../assets/home_cards_imgs/admission-processing.jpg';
import computerTrainingImg from '../assets/home_cards_imgs/computer-training.jpg';
import generalComputerImg from '../assets/home_cards_imgs/general-computer-services.jpg';
import lessonCoachingImg from '../assets/home_cards_imgs/lesson-coaching.jpg';
import webDevelopmentImg from '../assets/home_cards_imgs/web-development.jpg';
import cloudSolutionsImg from '../assets/home_cards_imgs/cloud-solutions.jpg';
import mobileDevelopmentImg from '../assets/home_cards_imgs/mobile-development.jpg';
import aiMlImg from '../assets/home_cards_imgs/ai-ml.jpg';
import cybersecurityImg from '../assets/home_cards_imgs/cybersecurity.jpg';
import digitalAnalyticsImg from '../assets/home_cards_imgs/digital-analytics.jpg';

// Import testimonial images
import testimonialImg1 from '../assets/testimony_imgs/testimonyImg1.jpg';
import testimonialImg2 from '../assets/testimony_imgs/testimonyImg2.jpg';
import testimonialImg3 from '../assets/testimony_imgs/testimonyImg3.jpg';
import testimonialImg4 from '../assets/testimony_imgs/testimonyImg4.jpg';
import testimonialImg5 from '../assets/testimony_imgs/testimonyImg5.jpg';
import testimonialImg6 from '../assets/testimony_imgs/testimonyImg6.jpg';
import testimonialImg7 from '../assets/testimony_imgs/testimonyImg7.jpg';
import testimonialImg8 from '../assets/testimony_imgs/testimonyImg8.jpg';
import testimonialImg9 from '../assets/testimony_imgs/testimonyImg9.jpg';
import testimonialImg10 from '../assets/testimony_imgs/testimonyImg10.jpg';
import testimonialImg11 from '../assets/testimony_imgs/testimonyImg11.jpg';
import testimonialImg12 from '../assets/testimony_imgs/testimonyImg12.jpg';

// Import Team members images
import teamImg1 from '../assets/team_members_imgs/teamImg1.jpg';
import teamImg2 from '../assets/team_members_imgs/teamImg2.jpg';
import teamImg3 from '../assets/team_members_imgs/teamImg3.jpg';
import teamImg4 from '../assets/team_members_imgs/teamImg4.jpg';
import teamImg5 from '../assets/team_members_imgs/teamImg5.jpg';
import teamImg6 from '../assets/team_members_imgs/teamImg6.jpg';
import teamImg7 from '../assets/team_members_imgs/teamImg7.jpg';
import teamImg8 from '../assets/team_members_imgs/teamImg8.jpg';
import teamImg9 from '../assets/team_members_imgs/teamImg9.jpg';
import teamImg10 from '../assets/team_members_imgs/teamImg10.jpg';
import teamImg11 from '../assets/team_members_imgs/teamImg11.jpg';
import teamImg12 from '../assets/team_members_imgs/teamImg12.jpg';
import teamImg13 from '../assets/team_members_imgs/teamImg13.jpg';
import teamImg14 from '../assets/team_members_imgs/teamImg14.jpg';
import teamImg15 from '../assets/team_members_imgs/teamImg15.jpg';
import teamImg16 from '../assets/team_members_imgs/teamImg16.jpg';
import teamImg17 from '../assets/team_members_imgs/teamImg17.jpg';
import teamImg18 from '../assets/team_members_imgs/teamImg18.jpg';
import teamImg19 from '../assets/team_members_imgs/teamImg19.jpg';
import teamImg20 from '../assets/team_members_imgs/teamImg20.jpg';

// Chatbot Component (keep as is - too long to repeat)
const Chatbot = () => {
  // ... (keep your existing Chatbot code - no images in this component)
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! 👋 Welcome to JEO Digital Solutions. How can I help you today?", sender: "bot", timestamp: new Date() }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const commonQuestions = [
    { question: "How do I register for WAEC?", answer: "To register for WAEC, simply click on 'Register Now' button on our homepage or contact us via WhatsApp. We'll guide you through the registration process. The cost depends on the examination period." },
    { question: "How much is JAMB registration?", answer: "JAMB registration fee is ₦4,700 for the form plus our service charge of ₦5,000. Total ₦9,700. This includes biometric capturing and all necessary support." },
    { question: "Do you offer Post UTME help?", answer: "Yes! We provide comprehensive Post UTME assistance including past questions, study materials, and registration support for various universities and polytechnics." },
    { question: "What computer courses do you offer?", answer: "We offer Basic Computing, Microsoft Office (Word, Excel, PowerPoint), Internet Skills, Web Design, Graphic Design, and Programming courses. All come with certificates." },
    { question: "How can I secure admission?", answer: "We help with admission processing including JAMB change of course/institution, Direct Entry registration, and following up with schools for admission status. Contact us for personalized assistance." },
    { question: "Do you offer home tutoring?", answer: "Yes, we provide both home tutoring and group coaching for primary, secondary, and university students in all subjects." },
    { question: "What printing services do you offer?", answer: "We offer document printing, photocopying, scanning, laminating, binding, passport photography, and other general computer services at affordable rates." },
    { question: "How do I get JAMB runs?", answer: "We provide accurate JAMB processing and CBT training. Our services are 100% reliable and confidential. Contact us via WhatsApp for more details." },
    { question: "What is the cost of computer training?", answer: "Basic Computer course is ₦15,000 for 1 month. Advanced courses range from ₦25,000 - ₦50,000 depending on the program duration." },
    { question: "Do you do direct admission?", answer: "Yes, we process Direct Entry applications for candidates with ND, NCE, or A-level results. We guide you through the entire process." }
  ];

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: "user",
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = generateResponse(inputMessage);
      const botMessage = {
        id: messages.length + 2,
        text: botResponse,
        sender: "bot",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const generateResponse = (userInput) => {
    const input = userInput.toLowerCase();
    
    if (input.includes("waec") || input.includes("waec registration")) {
      return "📝 To register for WAEC, please contact us via WhatsApp or click 'Register Now'. We'll help you complete your registration within 24 hours. The total cost is ₦15,000 including our service fee.";
    }
    else if (input.includes("jamb") && (input.includes("cost") || input.includes("price") || input.includes("fee"))) {
      return "💰 JAMB registration costs ₦4,700 for the form + ₦5,000 service fee = ₦9,700 total. This includes biometric capturing, profile creation, and support throughout the process.";
    }
    else if (input.includes("jamb runs") || (input.includes("jamb") && input.includes("accurate"))) {
      return "⚡ We provide accurate JAMB processing with guaranteed results. Our service includes CBT training, past questions, and real-time support. Contact our WhatsApp for more details and pricing.";
    }
    else if (input.includes("admission") || input.includes("post utme")) {
      return "🎓 We offer complete admission processing including Post UTME registration, past questions, supplementary forms, and direct admission. Our success rate is over 95%. Contact us to get started!";
    }
    else if (input.includes("computer training") || input.includes("computer course")) {
      return "💻 We offer: Basic Computing (₦15,000) - 1 month, Microsoft Office (₦25,000) - 2 months, Web Design (₦40,000) - 2 months, Programming (₦50,000) - 3 months. All come with certificates!";
    }
    else if (input.includes("printing") || input.includes("typing") || input.includes("scanning")) {
      return "🖨️ Our general computer services: Printing (₦50/page B&W, ₦200/page color), Typing (₦500/page), Scanning (₦200/page), Binding (₦500), Laminating (₦300). Same-day delivery available!";
    }
    else if (input.includes("lesson") || input.includes("tutoring") || input.includes("coaching")) {
      return "📚 We offer private lessons at ₦5,000/hour and group coaching at ₦15,000/month. Subjects include Mathematics, English, Sciences, and exam preparation for WAEC, NECO, and JAMB.";
    }
    else if (input.includes("price") || input.includes("cost") || input.includes("how much")) {
      return "💰 Our services are affordably priced! For specific pricing, please ask about the particular service you're interested in, or contact us via WhatsApp for a detailed quote.";
    }
    else if (input.includes("contact") || input.includes("phone") || input.includes("whatsapp")) {
      return "📞 You can reach us via: WhatsApp/Call: +2347061066372, Email: info@jeodigital.com, or visit our office. We're available 24/7 to assist you!";
    }
    else if (input.includes("location") || input.includes("address") || input.includes("office")) {
      return "📍 We're located at [Your Office Address]. You can also reach us online via WhatsApp or phone call. We offer both physical and virtual services!";
    }
    else {
      return "Thank you for your question! 👋 For detailed information, please contact us on WhatsApp at +2347061066372 or call us directly. We're here to help you with all your educational and digital needs!";
    }
  };

  const handleQuickQuestion = (question, answer) => {
    const userMessage = {
      id: messages.length + 1,
      text: question,
      sender: "user",
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    setTimeout(() => {
      const botMessage = {
        id: messages.length + 2,
        text: answer,
        sender: "bot",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-primary-500 to-secondary-500 text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 group"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-6 z-50 w-[90vw] sm:w-96 h-[500px] bg-dark-100/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 flex flex-col overflow-hidden"
          >
            <div className="bg-gradient-to-r from-primary-600 to-secondary-600 p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-white">JEO Digital Assistant</h3>
                  <p className="text-xs text-white/80">Online • Always ready to help</p>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      message.sender === 'user'
                        ? 'bg-primary-500 text-white rounded-br-none'
                        : 'bg-white/10 text-gray-200 rounded-bl-none'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <span className="text-xs opacity-70 mt-1 block">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/10 p-3 rounded-2xl rounded-bl-none">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></span>
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="border-t border-white/10 p-3 bg-dark-100/50">
              <p className="text-xs text-gray-400 mb-2">Quick Questions:</p>
              <div className="flex flex-wrap gap-2">
                {commonQuestions.slice(0, 4).map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleQuickQuestion(q.question, q.answer)}
                    className="text-xs bg-white/10 hover:bg-primary-500/30 text-gray-300 px-3 py-1 rounded-full transition-colors"
                  >
                    {q.question.length > 30 ? q.question.substring(0, 27) + '...' : q.question}
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t border-white/10 p-3 flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your question here..."
                className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 text-sm"
              />
              <button
                onClick={handleSendMessage}
                className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Service Card Component - WITH ALT TEXT
const ServiceCard = ({ service, onWhatsApp, onPhoneCall, onRegister }) => {
  // Generate descriptive alt text based on service title
  const getAltText = (title) => {
    const altMap = {
      'WAEC | NECO | JAMB  | GCE': 'WAEC, NECO, JAMB and GCE examination registration service icon',
      'JAMB "RUNS" | PROCESSING': 'JAMB accurate processing and CBT training service icon',
      'WAEC | NECO | JAMB INTENSIVE LESSONS & COACHING': 'Intensive coaching and private lessons for WAEC, NECO, and JAMB',
      'UNIPORT | AFE BABALOLA | ABSU | UNICAL ADMISSION PROCESSING': 'University admission processing for UNIPORT, Afe Babalola, ABSU, and UNICAL',
      'GENERAL COMPUTER SERVICES': 'General computer services including printing, typing, and scanning',
      'COMPUTER TRAINING | PROGRAMMING': 'Computer training and programming courses',
      'Web Development': 'Web development services using React, Next.js, Vue, and Node.js',
      'Cloud Solutions': 'Cloud solutions and DevOps services on AWS, Azure, and GCP',
      'Mobile Development': 'Mobile app development for iOS and Android using React Native and Flutter',
      'AI & Machine Learning': 'Artificial Intelligence and Machine Learning solutions',
      'Cybersecurity': 'Cybersecurity services including security audits and penetration testing',
      'Digital Analytics': 'Digital analytics and business intelligence services'
    };
    return altMap[title] || `${title} service offered by JEO Digital Solutions`;
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
      className={`card group cursor-pointer flex flex-col h-full items-center text-center ${service.highlight ? 'border-primary-500/30 bg-gradient-to-br from-primary-500/5 to-transparent' : ''}`}
    >
      <div className="flex-grow w-full">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-gradient-to-br from-primary-500/20 to-secondary-500/20 p-3 shadow-lg">
            <div className="rounded-full bg-white p-2">
              <img 
                src={service.image} 
                alt={getAltText(service.title)}
                className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 object-cover rounded-full group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>
          </div>
        </div>
        
        <h3 className="text-xl sm:text-2xl font-semibold mb-4 group-hover:text-primary-500 transition-colors text-center px-2">
          {service.title}
        </h3>
        
        <div className="flex flex-wrap gap-2 justify-center mb-6 px-2">
          {service.features.map((feature, idx) => (
            <span 
              key={idx} 
              className="text-xs sm:text-sm bg-primary-500/20 text-primary-300 px-3 py-1.5 rounded-full border border-primary-500/30"
            >
              {feature}
            </span>
          ))}
        </div>
      </div>
      
      <div className="flex gap-3 mt-4 pt-4 border-t border-white/10 w-full px-2">
        <button
          onClick={() => onWhatsApp(service.title)}
          className="flex-1 bg-green-600 hover:bg-green-700 text-white px-2 sm:px-3 py-2 rounded-lg transition-all duration-200 text-xs sm:text-sm font-semibold flex items-center justify-center gap-1 sm:gap-2"
          aria-label={`Contact via WhatsApp about ${service.title}`}
        >
          <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.555 4.125 1.523 5.865L0 24l6.352-1.648C8.13 23.48 10.05 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.842 0-3.586-.497-5.077-1.364l-.364-.207-3.77.977.977-3.674-.21-.365C4.422 15.63 3.929 13.89 3.929 12c0-4.456 3.615-8.071 8.071-8.071s8.071 3.615 8.071 8.071-3.615 8.071-8.071 8.071z"/>
          </svg>
          <span className="hidden xs:inline">WhatsApp</span>
          <span className="xs:hidden">WA</span>
        </button>
        
        <button
          onClick={onPhoneCall}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-2 sm:px-3 py-2 rounded-lg transition-all duration-200 text-xs sm:text-sm font-semibold flex items-center justify-center gap-1 sm:gap-2"
          aria-label="Call JEO Digital Solutions"
        >
          <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
          </svg>
          <span className="hidden xs:inline">Call Now</span>
          <span className="xs:hidden">Call</span>
        </button>
        
        {service.showRegister && (
          <button
            onClick={() => onRegister(service.title)}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-2 sm:px-3 py-2 rounded-lg transition-all duration-200 text-xs sm:text-sm font-semibold flex items-center justify-center gap-1 sm:gap-2"
            aria-label={`Register for ${service.title}`}
          >
            <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
            Register
          </button>
        )}
      </div>
    </motion.div>
  );
};

// Testimonial Carousel Component - WITH ALT TEXT
const TestimonialCarousel = () => {
  // ... (keep your existing TestimonialCarousel code)
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);

  const testimonials = [
    { id: 1, name: "Oluwaseun Adebayo", course: "JAMB Preparation", testimony: "JEO Digital Solutions helped me score 287 in JAMB! Their CBT training was exceptional. I'm now studying Medicine at UNILAG.", image: testimonialImg1, rating: 5 },
    { id: 2, name: "Chiamaka Nwosu", course: "WAEC Registration", testimony: "I passed all my WAEC subjects with flying colors thanks to their intensive coaching. The study materials were very helpful.", image: testimonialImg2, rating: 5 },
    { id: 3, name: "Emmanuel Okafor", course: "Admission Processing", testimony: "They secured my admission into UNIPORT within weeks. The process was smooth and stress-free. Highly recommended!", image: testimonialImg3, rating: 5 },
    { id: 4, name: "Fatima Bello", course: "Computer Training", testimony: "I learned web development in just 3 months. Now I'm working as a freelance developer. Thank you JEO Digital!", image: testimonialImg4, rating: 5 },
    { id: 5, name: "David Akpan", course: "GCE Registration", testimony: "Their GCE registration service was fast and reliable. I got my results on time and passed excellently.", image: testimonialImg5, rating: 4 },
    { id: 6, name: "Okonkwo Chukwu", course: "Post UTME", testimony: "The Post UTME past questions and coaching gave me an edge. I scored above the cut-off mark for my dream course.", image: testimonialImg6, rating: 5 },
    { id: 7, name: "Bashir Ayman", course: "NECO Registration", testimony: "I registered for NECO through them and the process was seamless. Their support team was always available.", image: testimonialImg7, rating: 4 },
    { id: 8, name: "Precious Eze", course: "Direct Entry", testimony: "They processed my Direct Entry application perfectly. I'm now in 200 level at UNN. God bless JEO Digital!", image: testimonialImg8, rating: 5 },
    { id: 9, name: "Mariam Abiola", course: "Programming Course", testimony: "The Python programming course was top-notch. The instructor was patient and knowledgeable.", image: testimonialImg9, rating: 5 },
    { id: 10, name: "Esther Ugochukwu", course: "Lesson/Coaching", testimony: "My daughter's grades improved significantly after their home tutoring. The teachers are excellent!", image: testimonialImg10, rating: 5 },
    { id: 11, name: "Joshua Nwachukwu", course: "JAMB RUNS", testimony: "Their JAMB processing is 100% accurate. I scored above 300. I'm forever grateful!", image: testimonialImg11, rating: 5 },
    { id: 12, name: "Rebecca Idowu", course: "Computer Training", testimony: "The graphic design course changed my life. I now run my own design business.", image: testimonialImg12, rating: 5 },
    { id: 13, name: "Anabel Adeleke", course: "WAEC Coaching", testimony: "The WAEC coaching classes were intensive and effective. I made 8As!", image: testimonialImg1, rating: 5 },
    { id: 14, name: "Blessing James", course: "Admission Processing", testimony: "They helped me change my course and institution successfully. I'm now studying what I love.", image: testimonialImg2, rating: 4 },
    { id: 15, name: "Henry Nnamdi", course: "Computer Training", testimony: "The Microsoft Office training was practical and job-ready. I got certified and employed.", image: testimonialImg3, rating: 5 },
    { id: 16, name: "Amina Kabiru", course: "Post UTME", testimony: "Their Post UTME past questions were accurate. I passed with a high score.", image: testimonialImg4, rating: 5 },
    { id: 17, name: "Patrick Obi", course: "JAMB Preparation", testimony: "The CBT mock exams prepared me well for the real exam. Best decision ever.", image: testimonialImg5, rating: 5 },
    { id: 18, name: "Sarah Okafor", course: "Lesson/Coaching", testimony: "The home tutoring service was flexible and effective. My grades improved greatly.", image: testimonialImg6, rating: 5 },
    { id: 19, name: "Dantata Yusuf", course: "Computer Training", testimony: "The web development course was comprehensive. I built my portfolio and got hired.", image: testimonialImg7, rating: 5 },
    { id: 20, name: "Mike Johnson", course: "Admission Processing", testimony: "They secured my admission into ABSU stress-free. Thank you JEO Digital Solutions!", image: testimonialImg8, rating: 5 }
  ];

  const cardsToShow = 2;
  const maxIndex = Math.max(0, testimonials.length - cardsToShow);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
    if (carouselRef.current) {
      const cardWidth = 540;
      carouselRef.current.scrollTo({
        left: (currentIndex - 1) * cardWidth,
        behavior: 'smooth'
      });
    }
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
    if (carouselRef.current) {
      const cardWidth = 540;
      carouselRef.current.scrollTo({
        left: (currentIndex + 1) * cardWidth,
        behavior: 'smooth'
      });
    }
  };

  const renderStars = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  return (
    <section id="testimonials-section" className="py-20 px-4 bg-gradient-to-b from-transparent to-white/5">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: { opacity: 0, y: 60 },
            visible: { opacity: 1, y: 0 }
          }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="section-title text-4xl sm:text-5xl">What Our Students Say</h2>
          <p className="section-subtitle text-base sm:text-lg">
            Real stories from real students who achieved their dreams with us
          </p>
        </motion.div>

        <div className="relative">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full transition-all duration-300 ${
              currentIndex === 0
                ? 'bg-white/10 text-gray-500 cursor-not-allowed opacity-50'
                : 'bg-primary-500 text-white hover:bg-primary-600 hover:scale-110 shadow-lg'
            }`}
            aria-label="Previous testimonials"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div 
            ref={carouselRef}
            className="overflow-x-auto scrollbar-hide py-6 px-12"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', overflowX: 'auto' }}
          >
            <div className="flex gap-10" style={{ width: 'max-content' }}>
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="bg-gradient-to-br from-dark-100/80 to-dark-200/50 rounded-3xl p-10 border border-white/10 backdrop-blur-sm transition-all duration-300 hover:scale-105"
                  style={{ width: '500px', minWidth: '500px' }}
                >
                  <div className="flex justify-center mb-8">
                    <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-primary-500/50 shadow-2xl">
                      <img 
                        src={testimonial.image} 
                        alt={`${testimonial.name} - ${testimonial.course} student testimonial for JEO Digital Solutions`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white text-center mb-3">{testimonial.name}</h3>
                  <p className="text-primary-500 text-lg text-center mb-4">{testimonial.course}</p>
                  
                  <div className="flex justify-center gap-1 mb-6">
                    <span className="text-yellow-500 text-xl">{renderStars(testimonial.rating)}</span>
                  </div>
                  
                  <p className="text-gray-300 text-base text-center italic leading-relaxed px-2">
                    "{testimonial.testimony}"
                  </p>
                  
                  <div className="flex justify-center mt-6">
                    <svg className="w-10 h-10 text-primary-500/50" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleNext}
            disabled={currentIndex >= maxIndex}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full transition-all duration-300 ${
              currentIndex >= maxIndex
                ? 'bg-white/10 text-gray-500 cursor-not-allowed opacity-50'
                : 'bg-primary-500 text-white hover:bg-primary-600 hover:scale-110 shadow-lg'
            }`}
            aria-label="Next testimonials"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: Math.ceil(testimonials.length / cardsToShow) }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCurrentIndex(idx * cardsToShow);
                if (carouselRef.current) {
                  const cardWidth = 540;
                  carouselRef.current.scrollTo({
                    left: idx * cardsToShow * cardWidth,
                    behavior: 'smooth'
                  });
                }
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                Math.floor(currentIndex / cardsToShow) === idx
                  ? 'w-8 bg-primary-500'
                  : 'bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Go to testimonial set ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// Team Member Carousel Component - WITH ALT TEXT
const TeamCarousel = () => {
  // ... (keep your existing TeamCarousel code)
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);

  const teamMembers = [
    { id: 1, name: "Chief Justice Ekwueme O.", position: "CEO/Director", location: "Aba Branch", phone: "+234 7061066372", whatsapp: "2347061066372", email: "ceo@jeodigital.com", linkedin: "https://linkedin.com/in/chief-johnson-eze", image: teamImg1 },
    { id: 2, name: "Effiong, Hoska", position: "Full Stack Software Engineer", location: "Abuja - FCT", phone: "+234 80064633233", whatsapp: "2348123645507", email: "hoskadavid@gmail.com", linkedin: "https://linkedin.com/in/hoska-effiong", image: teamImg2 },
    { id: 3, name: "Clement Abigail", position: "Secretary/Analyst", location: "Aba Branch", phone: "+234 8167660539", whatsapp: "2348167660539", email: "abigail.clement@jeodigital.com", linkedin: "https://linkedin.com/in/michael-adeleke", image: teamImg3 },
    { id: 4, name: "Mr Obasi Ukaegbu", position: "Mathematics/Physics Teacher", location: "Aba Branch", phone: "+234 8033890857", whatsapp: "2348033890857", email: "ukaegbu.obasi@jeodigital.com", linkedin: "https://linkedin.com/in/grace-okonkwo", image: teamImg4 },
    { id: 5, name: "Mr. David Nwachukwu", position: "Data Analyst", location: "Abuja - Head Quarter", phone: "+234 806 567 8901", whatsapp: "2348065678901", email: "david.nwachukwu@jeodigital.com", linkedin: "https://linkedin.com/in/david-nwachukwu", image: teamImg5 },
    { id: 6, name: "Dr. Mrs. Ifeoma Eze", position: "Chemistry Teacher", location: "Aba Branch", phone: "+234 807 678 9012", whatsapp: "2348076789012", email: "ifeoma.eze@jeodigital.com", linkedin: "https://linkedin.com/in/ifeoma-eze", image: teamImg6 },
    { id: 7, name: "Mr. Sunday Ogunleye", position: "Maths Teacher", location: "Uyo Branch", phone: "+234 808 789 0123", whatsapp: "2348087890123", email: "sunday.ogunleye@jeodigital.com", linkedin: "https://linkedin.com/in/sunday-ogunleye", image: teamImg7 },
    { id: 8, name: "Mrs. Ngozi Obi", position: "English/Literature Teacher", location: "Port Harcourt Branch", phone: "+234 809 890 1234", whatsapp: "2348098901234", email: "ngozi.obi@jeodigital.com", linkedin: "https://linkedin.com/in/ngozi-obi", image: teamImg8 },
    { id: 9, name: "Mr. Chuka Nwosu", position: "Cyber Security Analyst", location: "Abuja - Head Quarter", phone: "+234 810 901 2345", whatsapp: "2348109012345", email: "chuka.nwosu@jeodigital.com", linkedin: "https://linkedin.com/in/chuka-nwosu", image: teamImg9 },
    { id: 10, name: "Mrs. Adaobi Okeke", position: "Accountant", location: "Aba Branch", phone: "+234 811 012 3456", whatsapp: "2348110123456", email: "adaobi.okeke@jeodigital.com", linkedin: "https://linkedin.com/in/adaobi-okeke", image: teamImg10 },
    { id: 11, name: "Barr. Emeka Anya", position: "Legal Adviser", location: "Uyo Branch", phone: "+234 812 123 4567", whatsapp: "2348121234567", email: "emeka.anya@jeodigital.com", linkedin: "https://linkedin.com/in/emeka-anya", image: teamImg11 },
    { id: 12, name: "Mr. Peter Eze", position: "IT Support Specialist", location: "Port Harcourt Branch", phone: "+234 813 234 5678", whatsapp: "2348132345678", email: "peter.eze@jeodigital.com", linkedin: "https://linkedin.com/in/peter-eze", image: teamImg12 },
    { id: 13, name: "Mrs. Joy Akpan", position: "Physics Teacher", location: "Abuja - Head Quarter", phone: "+234 814 345 6789", whatsapp: "2348143456789", email: "joy.akpan@jeodigital.com", linkedin: "https://linkedin.com/in/joy-akpan", image: teamImg13 },
    { id: 14, name: "Mr. Samuel Johnson", position: "Biology Teacher", location: "Aba Branch", phone: "+234 815 456 7890", whatsapp: "2348154567890", email: "samuel.johnson@jeodigital.com", linkedin: "https://linkedin.com/in/samuel-johnson", image: teamImg14 },
    { id: 15, name: "Ms. Esther James", position: "Economics Teacher", location: "Uyo Branch", phone: "+234 816 567 8901", whatsapp: "2348165678901", email: "esther.james@jeodigital.com", linkedin: "https://linkedin.com/in/esther-james", image: teamImg15 },
    { id: 16, name: "Mr. Victor Udo", position: "Commerce Teacher", location: "Port Harcourt Branch", phone: "+234 817 678 9012", whatsapp: "2348176789012", email: "victor.udo@jeodigital.com", linkedin: "https://linkedin.com/in/victor-udo", image: teamImg16 },
    { id: 17, name: "Mrs. Faith Eze", position: "Government Teacher", location: "Abuja - Head Quarter", phone: "+234 818 789 0123", whatsapp: "2348187890123", email: "faith.eze@jeodigital.com", linkedin: "https://linkedin.com/in/faith-eze", image: teamImg17 },
    { id: 18, name: "Mr. Patrick Obi", position: "CRS Teacher", location: "Aba Branch", phone: "+234 819 890 1234", whatsapp: "2348198901234", email: "patrick.obi@jeodigital.com", linkedin: "https://linkedin.com/in/patrick-obi", image: teamImg18 },
    { id: 19, name: "Ms. Rebecca Nnamdi", position: "Marketing Manager", location: "Uyo Branch", phone: "+234 820 901 2345", whatsapp: "2348209012345", email: "rebecca.nnamdi@jeodigital.com", linkedin: "https://linkedin.com/in/rebecca-nnamdi", image: teamImg19 },
    { id: 20, name: "Mr. John Okoro", position: "Customer Support Lead", location: "Port Harcourt Branch", phone: "+234 821 012 3456", whatsapp: "2348210123456", email: "john.okoro@jeodigital.com", linkedin: "https://linkedin.com/in/john-okoro", image: teamImg20 }
  ];

  const cardsToShow = 2;
  const maxIndex = Math.max(0, teamMembers.length - cardsToShow);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
    if (carouselRef.current) {
      const cardWidth = 540;
      carouselRef.current.scrollTo({
        left: (currentIndex - 1) * cardWidth,
        behavior: 'smooth'
      });
    }
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
    if (carouselRef.current) {
      const cardWidth = 540;
      carouselRef.current.scrollTo({
        left: (currentIndex + 1) * cardWidth,
        behavior: 'smooth'
      });
    }
  };

  const handleContactClick = (type, value, name) => {
    if (type === 'whatsapp') {
      const message = encodeURIComponent(`Hello! I'm interested in your services. I was referred by ${name}`);
      window.open(`https://wa.me/${value}?text=${message}`, '_blank');
    } else if (type === 'email') {
      window.location.href = `mailto:${value}`;
    } else if (type === 'linkedin') {
      window.open(value, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section id="team-section" className="py-20 px-4 bg-gradient-to-b from-white/5 to-transparent">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: { opacity: 0, y: 60 },
            visible: { opacity: 1, y: 0 }
          }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="section-title text-4xl sm:text-5xl">Meet Our Expert Team</h2>
          <p className="section-subtitle text-base sm:text-lg">
            Dedicated professionals committed to your success
          </p>
        </motion.div>

        <div className="relative">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full transition-all duration-300 ${
              currentIndex === 0
                ? 'bg-white/10 text-gray-500 cursor-not-allowed opacity-50'
                : 'bg-primary-500 text-white hover:bg-primary-600 hover:scale-110 shadow-lg'
            }`}
            aria-label="Previous team members"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div 
            ref={carouselRef}
            className="overflow-x-auto scrollbar-hide py-6 px-12"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', overflowX: 'auto' }}
          >
            <div className="flex gap-10" style={{ width: 'max-content' }}>
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="bg-gradient-to-br from-dark-100/80 to-dark-200/50 rounded-3xl p-10 border border-white/10 backdrop-blur-sm transition-all duration-300 hover:scale-105"
                  style={{ width: '500px', minWidth: '500px' }}
                >
                  <div className="flex justify-center mb-8">
                    <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-primary-500/50 shadow-2xl">
                      <img 
                        src={member.image} 
                        alt={`${member.name} - ${member.position} at JEO Digital Solutions, ${member.location}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white text-center mb-3">{member.name}</h3>
                  <p className="text-primary-500 text-lg text-center mb-4">{member.position}</p>
                  
                  <div className="flex items-center justify-center gap-2 mb-6 text-gray-400 text-base">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <span>{member.location}</span>
                  </div>
                  
                  <div className="flex justify-center gap-6 mt-6">
                    <button
                      onClick={() => handleContactClick('whatsapp', member.whatsapp, member.name)}
                      className="p-4 bg-green-600/20 rounded-full hover:bg-green-600 transition-colors group"
                      title={`Chat with ${member.name} on WhatsApp`}
                      aria-label={`Chat with ${member.name} on WhatsApp`}
                    >
                      <svg className="w-8 h-8 text-green-500 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.555 4.125 1.523 5.865L0 24l6.352-1.648C8.13 23.48 10.05 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.842 0-3.586-.497-5.077-1.364l-.364-.207-3.77.977.977-3.674-.21-.365C4.422 15.63 3.929 13.89 3.929 12c0-4.456 3.615-8.071 8.071-8.071s8.071 3.615 8.071 8.071-3.615 8.071-8.071 8.071z"/>
                      </svg>
                    </button>
                    
                    <button
                      onClick={() => handleContactClick('email', member.email)}
                      className="p-4 bg-blue-600/20 rounded-full hover:bg-blue-600 transition-colors group"
                      title={`Email ${member.name}`}
                      aria-label={`Email ${member.name}`}
                    >
                      <svg className="w-8 h-8 text-blue-500 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </button>
                    
                    <button
                      onClick={() => handleContactClick('linkedin', member.linkedin)}
                      className="p-4 bg-blue-800/20 rounded-full hover:bg-blue-800 transition-colors group"
                      title={`Connect with ${member.name} on LinkedIn`}
                      aria-label={`Connect with ${member.name} on LinkedIn`}
                    >
                      <svg className="w-8 h-8 text-blue-400 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleNext}
            disabled={currentIndex >= maxIndex}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full transition-all duration-300 ${
              currentIndex >= maxIndex
                ? 'bg-white/10 text-gray-500 cursor-not-allowed opacity-50'
                : 'bg-primary-500 text-white hover:bg-primary-600 hover:scale-110 shadow-lg'
            }`}
            aria-label="Next team members"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: Math.ceil(teamMembers.length / cardsToShow) }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCurrentIndex(idx * cardsToShow);
                if (carouselRef.current) {
                  const cardWidth = 540;
                  carouselRef.current.scrollTo({
                    left: idx * cardsToShow * cardWidth,
                    behavior: 'smooth'
                  });
                }
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                Math.floor(currentIndex / cardsToShow) === idx
                  ? 'w-8 bg-primary-500'
                  : 'bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Go to team set ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// Newsletter Component
const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setEmail('');
    }
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-r from-primary-900/30 to-secondary-900/30">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-gray-300 mb-8">
            Get the latest updates on JAMB, WAEC, NECO, and admission news directly in your inbox
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 px-6 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-500"
              required
              aria-label="Email address for newsletter subscription"
            />
            <button type="submit" className="btn-primary whitespace-nowrap" aria-label="Subscribe to newsletter">
              Subscribe
            </button>
          </form>
          {subscribed && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-green-500 mt-4"
              role="status"
            >
              ✓ Successfully subscribed!
            </motion.p>
          )}
        </motion.div>
      </div>
    </section>
  );
};

// Trust Badges Component
const TrustBadges = () => (
  <div className="py-8 bg-white/5">
    <div className="max-w-7xl mx-auto px-4">
      <p className="text-center text-gray-400 text-sm mb-6">Trusted by students from</p>
      <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
        <span className="text-white font-bold text-lg">UNIPORT</span>
        <span className="text-white font-bold text-lg">UNICAL</span>
        <span className="text-white font-bold text-lg">ABSU</span>
        <span className="text-white font-bold text-lg">RSUT</span>
        <span className="text-white font-bold text-lg">AFE BABALOLA</span>
        <span className="text-white font-bold text-lg">UNIZIK</span>
        <span className="text-white font-bold text-lg">UNIBEN</span>
        <span className="text-white font-bold text-lg">UNIABJ</span>
      </div>
    </div>
  </div>
);

const Home = () => {
  const navigate = useNavigate();
  const [featuredBlogs, setFeaturedBlogs] = useState([]);
  
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const servicesData = {
    newServices: [
      { id: 1, title: 'WAEC | NECO | JAMB  | GCE', image: examinationRegImg, highlight: true, features: ['Fast Processing', 'Accurate', 'Timely', 'Affordable Rates'], showRegister: true },
      { id: 2, title: 'JAMB "RUNS" | PROCESSING', image: jambRunsImg, highlight: true, features: ['SCORE 300+ in one sitting', 'Reliable Results', 'Expert Guidance', '24/7 Support'], showRegister: true },
      { id: 3, title: 'JAMB | WAEC INTENSIVE LESSONS & COACHING', image: lessonCoachingImg, highlight: true, features: ['Private Lessons', 'JAMB CBT Prep', 'Exam Prep', 'Project/Thesis Coaching'], showRegister: true },
      { id: 4, title: 'UNIPORT | AFE BABALOLA | ABSU | UNICAL ADMISSION PROCESSING', image: admissionProcessingImg, highlight: true, features: ['Post UTME', 'Supplementary', 'Direct Admission', 'Other Services'], showRegister: false },
      { id: 5, title: 'GENERAL COMPUTER SERVICES', image: generalComputerImg, highlight: true, features: ['Printing', 'Typing', 'Scanning', 'Online Services'], showRegister: true },
      { id: 6, title: 'COMPUTER TRAINING | PROGRAMMING', image: computerTrainingImg, highlight: true, features: ['Basic Computing', 'Intermediate', 'Advanced', 'Certificate Issuance'], showRegister: true }
    ],
    existingServices: [
      { id: 7, title: 'Web Development', image: webDevelopmentImg, features: ['React/Next.js', 'Vue/Nuxt', 'Node.js', 'Responsive Design'], showRegister: true },
      { id: 8, title: 'Cloud Solutions', image: cloudSolutionsImg, features: ['AWS/Azure/GCP', 'Docker/K8s', 'CI/CD', 'Scalable'], showRegister: true },
      { id: 9, title: 'Mobile Development', image: mobileDevelopmentImg, features: ['React Native', 'Flutter', 'iOS/Android', 'Cross-platform'], showRegister: true },
      { id: 10, title: 'AI & Machine Learning', image: aiMlImg, features: ['Computer Vision', 'NLP', 'Predictive Analytics', 'Automation'], showRegister: true },
      { id: 11, title: 'Cybersecurity', image: cybersecurityImg, features: ['Security Audits', 'Penetration Testing', 'Compliance', 'Data Protection'], showRegister: true },
      { id: 12, title: 'Digital Analytics', image: digitalAnalyticsImg, features: ['Business Intelligence', 'Data Visualization', 'Analytics', 'Reporting'], showRegister: true }
    ]
  };
  
  const handleWhatsApp = (serviceName) => {
    const phoneNumber = '2347061066372';
    const message = encodeURIComponent(`Hello Chief. Justice! I'm interested in ${serviceName}`);
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };
  
  const handlePhoneCall = () => {
    window.location.href = 'tel:+2347061066372';
  };

  const handleRegister = (serviceName) => {
    sessionStorage.setItem('interestedService', serviceName);
    navigate('/register');
  };
  
  useEffect(() => {
    const fetchFeaturedBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/Blogs/featured', { timeout: 5000 });
        if (response.data && (response.data.success || Array.isArray(response.data))) {
          const blogs = response.data.data || response.data;
          setFeaturedBlogs(blogs.slice(0, 3));
        }
      } catch (error) {
        console.log('Blogs feature disabled - backend not available');
        setFeaturedBlogs([]);
      }
    };
    fetchFeaturedBlogs();
  }, []);
  
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 }
  };
  
  const allServices = [...servicesData.newServices, ...servicesData.existingServices];
  
  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-primary-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-secondary-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-primary-600 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float animation-delay-4000"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-7xl mx-auto">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
              <span className="w-2 h-2 sm:w-4 sm:h-4 bg-green-500 rounded-full animate-pulse mr-2"></span>
              <span className="text-xs sm:text-sm text-gray-300 font-bold">Trusted by 100+ schools and institutions in Nigeria and beyond</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">JEO Digital</span><br />
              <span className="text-white">Solutions</span>
            </h1>
            
            <p className="text-base sm:text-xl md:text-2xl text-white-500 mb-8 max-w-3xl mx-auto font-bold px-4">
              From WAEC, NECO, GCE, and JAMB registration to admission processing, computer training, and everyday digital services – we make your journey seamless.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
              <Link to="/register" className="btn-primary inline-block text-center" aria-label="Register for services">Register Now</Link>
              <Link to="/blog" className="btn-secondary inline-block text-center" aria-label="View our blog">View Blog</Link>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 mt-20 pt-10 border-t border-white/10">
              {[
                { value: '1000+', label: 'Students Enrolled' },
                { value: '500+', label: 'Admissions Secured' },
                { value: '24/7', label: 'Support Available' },
                { value: '100%', label: 'Customer Satisfaction' },
              ].map((stat, idx) => (
                <motion.div key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1, duration: 0.3 }}>
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-500">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-gray-400 mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
      
      <TrustBadges />
      
      <section id="services-section" className="py-12 sm:py-20 px-4 max-w-7xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={fadeInUp} transition={{ duration: 0.4 }}>
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="section-title text-3xl sm:text-4xl">Our Services</h2>
            <p className="section-subtitle text-sm sm:text-base px-4">Comprehensive educational and technology solutions tailored to your needs</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {allServices.map((service, index) => (
              <motion.div key={service.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: index * 0.05 }} viewport={{ once: true, amount: 0.1 }}>
                <ServiceCard service={service} onWhatsApp={handleWhatsApp} onPhoneCall={handlePhoneCall} onRegister={handleRegister} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
      
      <TestimonialCarousel />
      
      <TeamCarousel />
      
      <Newsletter />
      
      {featuredBlogs.length > 0 && (
        <section className="py-12 sm:py-20 px-4 bg-gradient-to-b from-transparent to-white/5">
          <div className="max-w-7xl mx-auto">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center mb-8 sm:mb-12">
              <h2 className="section-title text-3xl sm:text-4xl">Latest News & Updates</h2>
              <p className="section-subtitle text-sm sm:text-base">Stay informed with the latest educational news and updates around you</p>
            </motion.div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {featuredBlogs.map((blog, idx) => (
                <motion.div key={blog.id || idx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: idx * 0.05 }} viewport={{ once: true }} whileHover={{ scale: 1.05 }} className="card cursor-pointer">
                  <div className="mb-4">
                    <div className="w-full h-40 sm:h-48 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-4xl sm:text-6xl" role="img" aria-label="News">📰</span>
                    </div>
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2">{blog.title}</h3>
                  <p className="text-gray-300 mb-4 text-xs sm:text-sm">{blog.description?.substring(0, 100)}</p>
                  <div className="flex flex-wrap gap-2">
                    {blog.tags?.slice(0, 3).map((tag, i) => (
                      <span key={i} className="text-xs bg-primary-500/20 text-primary-300 px-2 py-1 rounded-full">{tag}</span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
      
      <section className="py-12 sm:py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="bg-gradient-to-r from-primary-600/20 to-secondary-600/20 rounded-2xl p-6 sm:p-12 backdrop-blur-sm border border-white/10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Ready to Secure Your Future?</h2>
            <p className="text-gray-300 mb-8 text-sm sm:text-lg px-4">Join thousands of successful students who trust <span className="text-primary-500">JEO Digital Solutions</span> for their examination, admission, and training needs.</p>
            <Link to="/register" className="btn-primary inline-block" aria-label="Contact us to register">Register Now</Link>
          </motion.div>
        </div>
      </section>

      <Chatbot />

      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={scrollToTop}
            className="fixed bottom-24 right-6 z-40 p-3 bg-primary-500 text-white rounded-full shadow-lg hover:bg-primary-600 transition-all duration-300 hover:scale-110"
            aria-label="Scroll back to top"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;