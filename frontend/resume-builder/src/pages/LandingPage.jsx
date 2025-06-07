import React from 'react';
import { Link } from 'react-router-dom';
import { FaFileAlt, FaShare, FaDownload, FaPalette, FaMobile, FaLock } from 'react-icons/fa';

const Feature = ({ icon: Icon, title, description }) => (
  <div className="p-6 bg-white rounded-lg shadow-md">
    <div className="flex items-center justify-center w-12 h-12 mb-4 bg-indigo-100 rounded-full">
      <Icon className="w-6 h-6 text-indigo-600" />
    </div>
    <h3 className="mb-2 text-lg font-semibold">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const LandingPage = () => {
  const features = [
    {
      icon: FaFileAlt,
      title: 'Professional Templates',
      description: 'Choose from a variety of modern, ATS-friendly resume templates designed to make you stand out.'
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
      description: 'Your data is encrypted and safely stored in our secure cloud storage.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-gray-50 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 lg:mt-16 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">Create your professional</span>
                  <span className="block text-indigo-600">resume in minutes</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Build a stunning resume that gets you noticed. Our easy-to-use builder helps you create
                  a professional resume tailored to your industry and career goals.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Link
                      to="/sign-up"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                    >
                      Get Started
                    </Link>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Link
                      to="/login"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
                    >
                      Sign In
                    </Link>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Everything you need to create a great resume
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Our resume builder comes packed with features to help you create, customize, and share your professional resume.
            </p>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <Feature key={index} {...feature} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-indigo-700">
        <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            <span className="block">Ready to build your resume?</span>
            <span className="block">Start for free today.</span>
          </h2>
          <p className="mt-4 text-lg leading-6 text-indigo-200">
            Join thousands of job seekers who have created successful resumes using our platform.
          </p>
          <Link
            to="/sign-up"
            className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 sm:w-auto"
          >
            Create Your Resume
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
