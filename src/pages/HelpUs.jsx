import React from "react";
import { AlertCircle, Clock, ShieldCheck, UserCheck, MessageSquare, ChevronDown } from "lucide-react";
import { Card, CardContent } from '../components/ui/Card';

const HelpUs = () => {
  const guidelines = [
    {
      icon: UserCheck,
      title: "Professional Communication",
      description: "Always respond politely and professionally. Avoid informal language when communicating with guests."
    },
    {
      icon: Clock,
      title: "Response Time",
      description: "All user inquiries should be reviewed within 24 hours. Urgent matters must be prioritized."
    },
    {
      icon: AlertCircle,
      title: "Provide Accurate Information",
      description: "Verify booking details, dates, and user information before providing responses. Never assume missing information."
    },
    {
      icon: ShieldCheck,
      title: "Data Confidentiality",
      description: "User personal data must remain confidential. Do not share booking or contact information with unauthorized parties."
    },
    {
      icon: MessageSquare,
      title: "Clear & Helpful Replies",
      description: "Responses should be clear, concise, and solution-focused. Always guide the user on the next steps."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div className="text-center md:text-left">
        <h1 className="text-3xl font-bold text-surface-900 font-serif">Help & Support</h1>
        <p className="text-surface-500 mt-2">Guidelines and resources for staff members.</p>
      </div>

      <div className="grid gap-6">
        {guidelines.map((item, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6 flex gap-6 items-start">
              <div className="p-3 bg-primary-50 text-primary-600 rounded-xl shrink-0">
                <item.icon size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-surface-900 mb-1">{item.title}</h3>
                <p className="text-surface-600 leading-relaxed text-sm">
                  {item.description}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Contact Support Card */}
      <Card className="bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <CardContent className="p-8 text-center">
          <h2 className="text-2xl font-bold font-serif mb-2">Need Technical Assistance?</h2>
          <p className="text-primary-100 mb-6">Contact the IT department for system issues or bug reports.</p>
          <button className="px-6 py-3 bg-white text-primary-700 font-bold rounded-xl shadow-lg hover:bg-primary-50 transition-colors">
            Contact IT Support
          </button>
        </CardContent>
      </Card>
    </div>
  );
};

export default HelpUs;
