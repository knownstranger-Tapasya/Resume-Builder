import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import ModernTemplate from '../../components/ResumeTemplates/ModernTemplate';
import { generatePDF } from '../../utils/pdfGenerator';

const ViewResume = () => {
  const { resumeId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [resumeData, setResumeData] = useState(null);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const response = await axios.get(`/api/resume/${resumeId}`);
        setResumeData(response.data);
      } catch (err) {
        console.error('Failed to load resume:', err);
        toast.error('Failed to load resume');
        navigate('/dashboard');
      } finally {
        setLoading(false);
      }
    };

    fetchResume();
  }, [resumeId, navigate]);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      await generatePDF('resume-content', `${resumeData.title || 'resume'}.pdf`);
      toast.success('Resume downloaded successfully');
    } catch (err) {
      console.error('Failed to download resume:', err);
      toast.error('Failed to download resume');
    } finally {
      setDownloading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!resumeData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-red-600">Resume not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">
                {resumeData.title || 'Resume'}
              </h1>
              <button
                onClick={handleDownload}
                disabled={downloading}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {downloading ? 'Downloading...' : 'Download PDF'}
              </button>
            </div>
            <div id="resume-content">
              <ModernTemplate data={resumeData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewResume; 