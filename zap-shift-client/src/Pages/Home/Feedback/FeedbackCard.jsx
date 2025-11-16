import React from "react";
import { FaQuoteLeft } from "react-icons/fa";

export default function FeedbackCard() {
  return (
    <div className="w-full max-w-sm bg-white rounded-2xl shadow-md p-6 border border-gray-100">
      <div className="text-primary text-2xl mb-3">
        <FaQuoteLeft />
      </div>

      <p className="text-gray-600 leading-relaxed mb-4">
        A posture corrector works by providing support and gentle alignment to your
        shoulders, back, and spine, encouraging you to maintain proper posture
        throughout the day.
      </p>

      <div className="border-t border-dashed border-gray-300 my-4"></div>

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary"></div>
        <div>
          <h3 className="font-semibold text-gray-900">Awlad Hossin</h3>
          <p className="text-sm text-gray-500">Senior Product Designer</p>
        </div>
      </div>
    </div>
  );
}
