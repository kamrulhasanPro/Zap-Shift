import React from "react";
import { FaQuoteLeft } from "react-icons/fa";

export default function FeedbackCard({feedback}) {
  const {review, user_photoURL, user_email, userName} = feedback
  return (
    <div className="w-full max-w-sm bg-white rounded-2xl shadow-md p-6 border border-gray-100">
      <div className="text-secondary text-2xl mb-3">
        <FaQuoteLeft  className="rotate-180"/>
      </div>

      <p className="text-gray-600 leading-relaxed mb-4">
        {review}
      </p>

      <div className="border-t border-dashed border-gray-300 my-4"></div>

      <div className="flex items-center gap-3">
        <figure className="w-10 h-10 rounded-full bg-primary overflow-hidden">
          <img src={user_photoURL} alt="" />
        </figure>
        <div>
          <h3 className="font-semibold text-gray-900">{userName}</h3>
          <p className="text-sm text-gray-500">{user_email}</p>
        </div>
      </div>
    </div>
  );
}
