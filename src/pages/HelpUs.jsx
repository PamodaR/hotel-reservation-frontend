import React from "react";
import { AlertCircle, Clock, ShieldCheck, UserCheck, MessageSquare } from "lucide-react";

const StaffGuidelines = () => {
  return (
    <div className="card-glass p-8 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 mb-6 font-serif">
        Staff Support Guidelines
      </h2>

      <div className="space-y-6">

        {/* Respond Professionally */}
        <div className="flex gap-4">
          <div className="p-3 bg-primary-50 text-primary-600 rounded-lg">
            <UserCheck size={22} />
          </div>
          <div>
            <h4 className="font-bold text-gray-900">Professional Communication</h4>
            <p className="text-gray-600 text-sm">
              Always respond politely and professionally. Avoid informal or offensive language
              when communicating with users.
            </p>
          </div>
        </div>

        {/* Response Time */}
        <div className="flex gap-4">
          <div className="p-3 bg-primary-50 text-primary-600 rounded-lg">
            <Clock size={22} />
          </div>
          <div>
            <h4 className="font-bold text-gray-900">Response Time</h4>
            <p className="text-gray-600 text-sm">
              All user inquiries should be reviewed within <strong>24 hours</strong>.
              Urgent matters must be prioritized.
            </p>
          </div>
        </div>

        {/* Accurate Information */}
        <div className="flex gap-4">
          <div className="p-3 bg-primary-50 text-primary-600 rounded-lg">
            <AlertCircle size={22} />
          </div>
          <div>
            <h4 className="font-bold text-gray-900">Provide Accurate Information</h4>
            <p className="text-gray-600 text-sm">
              Verify booking details, dates, and user information before providing responses.
              Never assume missing information.
            </p>
          </div>
        </div>

        {/* Data Privacy */}
        <div className="flex gap-4">
          <div className="p-3 bg-primary-50 text-primary-600 rounded-lg">
            <ShieldCheck size={22} />
          </div>
          <div>
            <h4 className="font-bold text-gray-900">Data Confidentiality</h4>
            <p className="text-gray-600 text-sm">
              User personal data must remain confidential. Do not share booking or contact
              information with unauthorized parties.
            </p>
          </div>
        </div>

        {/* Clear Responses */}
        <div className="flex gap-4">
          <div className="p-3 bg-primary-50 text-primary-600 rounded-lg">
            <MessageSquare size={22} />
          </div>
          <div>
            <h4 className="font-bold text-gray-900">Clear & Helpful Replies</h4>
            <p className="text-gray-600 text-sm">
              Responses should be clear, concise, and solution-focused.
              Always guide the user on the next steps.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default StaffGuidelines;
