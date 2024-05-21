import React from 'react';

export default function ContactUsPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <p className="text-lg text-gray-800 mb-6">
        We're here to assist you. If you have any questions, feedback, or concerns, please feel free to reach out to us.
        You can contact us through the methods listed below:
      </p>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Customer Support</h2>
        <p className="text-gray-800 mb-2">
          For general inquiries or assistance, our customer support team is available to help.
        </p>
        <p className="text-gray-800 mb-2">
          <strong>Email:</strong> support@gtnelu.am
        </p>
        <p className="text-gray-800 mb-2">
          <strong>Phone:</strong> +374 91165863
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Business Inquiries</h2>
        <p className="text-gray-800 mb-2">
          If you have business-related inquiries or partnership opportunities, please reach out to us.
        </p>
        <p className="text-gray-800 mb-2">
          <strong>Email:</strong> business@gtnelu.am
        </p>
        <p className="text-gray-800 mb-2">
          <strong>Phone:</strong> +374 91165863
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Visit Us</h2>
        <p className="text-gray-800">
          Feel free to visit our office during business hours. Our address is:
        </p>
        <p className="text-gray-800">
         Vilnuys 4 - Masiv 9 , Yerevan , Armenia 
        </p>
      </section>
    </div>
  );
}