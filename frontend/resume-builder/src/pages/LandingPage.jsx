import React from 'react';
import { Link } from 'react-router-dom';
import { FaFileAlt, FaShare, FaDownload, FaPalette, FaMobile, FaLock } from 'react-icons/fa';

const Feature = ({ icon: Icon, title, description }) => (
  <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer transform hover:-translate-y-1">
    <div className="flex items-center justify-center w-14 h-14 mb-5 bg-gradient-to-tr from-indigo-500 to-purple-600 rounded-full text-white">
      <Icon className="w-7 h-7" />
    </div>
    <h3 className="mb-3 text-xl font-semibold text-gray-900">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </div>
);

const LandingPage = () => {
  const features = [
    {
      icon: FaFileAlt,
      title: 'Professional Templates',
      description: 'Choose from modern, ATS-friendly resume templates that help you stand out.'
    },
    {
      icon: FaShare,
      title: 'Easy Sharing',
      description: 'Share your resume with recruiters and employers with a single click.'
    },
    {
      icon: FaDownload,
      title: 'PDF Export',
      description: 'Download your resume in PDF format, ready for job applications.'
    },
    {
      icon: FaPalette,
      title: 'Customizable Design',
      description: 'Personalize colors, fonts, and layouts to match your style and industry.'
    },
    {
      icon: FaMobile,
      title: 'Responsive Design',
      description: 'Edit your resume on any device with our mobile-friendly interface.'
    },
    {
      icon: FaLock,
      title: 'Secure Storage',
      description: 'Your data is encrypted and safely stored in our secure cloud.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-indigo-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-32">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
              <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl md:text-7xl leading-tight">
                Create your <span className="text-indigo-600">professional resume</span> in minutes
              </h1>
              <p className="mt-6 text-lg text-gray-700 max-w-xl">
                Build a stunning resume that gets you noticed. Our easy-to-use builder helps you create a professional resume tailored to your industry and career goals.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row sm:justify-center lg:justify-start gap-5">
                <Link
                  to="/sign-up"
                  className="inline-flex items-center justify-center px-10 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md shadow-lg transition transform hover:scale-105"
                >
                  Get Started
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center px-10 py-4 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 font-semibold rounded-md shadow-lg transition transform hover:scale-105"
                >
                  Sign In
                </Link>
              </div>
            </div>
            <div className="hidden lg:block lg:col-span-6">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                alt="Person working on resume with laptop and notebook"
                className="rounded-xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-extrabold text-gray-900">Everything you need to create a great resume</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Our resume builder comes packed with features to help you create, customize, and share your professional resume.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, i) => (
            <Feature key={i} {...feature} />
          ))}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-gradient-to-r from-indigo-700 to-purple-700 py-20">
        <div className="max-w-2xl mx-auto text-center px-6">
          <h2 className="text-4xl font-extrabold text-white mb-4">Ready to build your resume?</h2>
          <p className="text-indigo-200 mb-8 text-lg">
            Join thousands of job seekers who have created successful resumes using our platform.
          </p>
          <Link
            to="/sign-up"
            className="inline-block px-8 py-4 text-indigo-700 bg-white rounded-md font-semibold shadow-lg hover:bg-gray-100 transition"
          >
            Create Your Resume
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
