import React from 'react';

export default function HelpPage() {
  return (
    <div className="container mx-auto py-8" style={{ paddingBottom: '80px' }}>
      {/* Adjust paddingBottom value based on the height of your footer */}
      <h1 className="text-3xl font-bold mb-4">Welcome to Gtnelu.am Help Center</h1>
      <p className="text-lg text-gray-800 mb-6">
        At Gtnelu.am, we aim to provide you with a seamless and enjoyable experience. If you have any questions or
        need assistance, you've come to the right place! Below are some common topics and answers to help you get
        started.
      </p>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Getting Started</h2>
        <p className="text-gray-800 mb-2">
          <strong>Creating an Account:</strong> To get started, simply sign up for a Gtnelu.am account. Click on the
          "Sign Up" button and follow the prompts to create your profile.
        </p>
        <p className="text-gray-800 mb-2">
          <strong>Browsing and Searching:</strong> Use the search bar to find prompts or browse categories to discover
          interesting topics.
        </p>
        <p className="text-gray-800 mb-2">
          <strong>Posting:</strong> If you want to share your thoughts, click on "Create Post" and fill out the details
          of your prompt.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Common Questions</h2>
        <p className="text-gray-800 mb-2">
          <strong>How do I edit my profile?</strong> Navigate to your profile page and click on "Edit Profile" to update
          your information.
        </p>
        <p className="text-gray-800 mb-2">
          <strong>How do I delete a post?</strong> Go to your post and click on "Delete" to remove it from the platform.
        </p>
        <p className="text-gray-800 mb-2">
          <strong>How can I contact support?</strong> If you encounter any issues or have questions, visit our "Contact
          Us" page to reach out to our support team.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Additional Assistance</h2>
        <p className="text-gray-800">
          If you need further assistance or have specific inquiries, please don't hesitate to contact us. We're here to
          help you make the most out of your Gtnelu.am experience!
        </p>
      </section>
    </div>
  );
}