import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaShare } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { generatePDF } from '../../utils/pdfGenerator';
import { validateResumeData } from '../../utils/validation';
import ShareModal from '../../components/ShareModal';
import ModernTemplate from '../../components/ResumeTemplates/ModernTemplate';
import ProfileSection from '../../components/ResumeSections/ProfileSection';
import ContactSection from '../../components/ResumeSections/ContactSection';
import WorkExperienceSection from '../../components/ResumeSections/WorkExperienceSection';
import EducationSection from '../../components/ResumeSections/EducationSection';
import SkillsSection from '../../components/ResumeSections/SkillsSection';
import ProjectsSection from '../../components/ResumeSections/ProjectsSection';
import CertificationsSection from '../../components/ResumeSections/CertificationsSection';
import LanguagesSection from '../../components/ResumeSections/LanguagesSection';
import InterestsSection from '../../components/ResumeSections/InterestsSection';

const EditResume = () => {
  const { resumeId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeSection, setActiveSection] = useState('profile');
  const [resumeData, setResumeData] = useState({
    title: '',
    template: {
      theme: 'modern',
      colorPalette: ['#4F46E5', '#1F2937', '#374151', '#6B7280'],
    },
    profileInfo: {
      fullName: '',
      designation: '',
      summary: '',
      profileImageUrl: ''
    },
    contactInfo: {
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      github: '',
      website: ''
    },
    workExperience: [],
    education: [],
    skills: [],
    projects: [],
    certifications: [],
    languages: [],
    interests: [],
  });
  const [downloading, setDownloading] = useState(false);
  const resumeRef = useRef(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

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

    if (resumeId !== 'new') {
      fetchResume();
    } else {
      setLoading(false);
    }
  }, [resumeId, navigate]);

  useEffect(() => {
    if (resumeId !== 'new') {
      setShareUrl(`${window.location.origin}/resume/view/${resumeId}`);
    }
  }, [resumeId]);

  const handleSave = async () => {
    const { isValid, errors } = validateResumeData(resumeData);
    setValidationErrors(errors);

    if (!isValid) {
      toast.error(
        <div>
          <p>Please fix the following errors:</p>
          <ul className="list-disc pl-4 mt-2">
            {Object.values(errors).map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      );
      return;
    }

    setSaving(true);
    try {
      const method = resumeId === 'new' ? 'post' : 'put';
      const url = `/api/resume${resumeId === 'new' ? '' : `/${resumeId}`}`;
      
      const response = await axios[method](url, {
        ...resumeData,
        userId: user.id
      });

      toast.success('Resume saved successfully');
      if (resumeId === 'new') {
        navigate(`/resume/${response.data._id}`);
      }
    } catch (err) {
      console.error('Failed to save resume:', err);
      toast.error('Failed to save resume');
    } finally {
      setSaving(false);
    }
  };

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

  const handleSectionChange = (section, data) => {
    setResumeData(prev => {
      if (section === 'profile') {
        return {
          ...prev,
          profileInfo: {
            ...prev.profileInfo,
            ...data
          }
        };
      }
      if (section === 'contact') {
        return {
          ...prev,
          contactInfo: {
            ...prev.contactInfo,
            ...data
          }
        };
      }
      return {
        ...prev,
        [section]: data,
      };
    });
    setValidationErrors(prev => {
      const newErrors = { ...prev };
      Object.keys(newErrors)
        .filter(key => key.startsWith(section))
        .forEach(key => delete newErrors[key]);
      return newErrors;
    });
  };

  const handleShare = () => {
    if (resumeId === 'new') {
      toast.error('Please save the resume first');
      return;
    }
    setShowShareModal(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  const sections = [
    { id: 'profileInfo', label: 'Profile', component: ProfileSection },
    { id: 'contactInfo', label: 'Contact', component: ContactSection },
    { id: 'workExperience', label: 'Work Experience', component: WorkExperienceSection },
    { id: 'education', label: 'Education', component: EducationSection },
    { id: 'skills', label: 'Skills', component: SkillsSection },
    { id: 'projects', label: 'Projects', component: ProjectsSection },
    { id: 'certifications', label: 'Certifications', component: CertificationsSection },
    { id: 'languages', label: 'Languages', component: LanguagesSection },
    { id: 'interests', label: 'Interests', component: InterestsSection },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <div className="flex-1">
              <input
                type="text"
                value={resumeData.title}
                onChange={(e) => handleSectionChange('title', e.target.value)}
                className={`text-2xl font-bold bg-transparent border-none focus:outline-none focus:ring-0 w-full ${
                  validationErrors.title ? 'text-red-500' : ''
                }`}
                placeholder="Resume Title"
              />
              {validationErrors.title && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.title}</p>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleShare}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <FaShare className="mr-2" /> Share
              </button>
              <button
                onClick={handleDownload}
                disabled={downloading}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {downloading ? 'Downloading...' : 'Download PDF'}
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {saving ? 'Saving...' : 'Save Resume'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Editor Section */}
            <div className="space-y-6">
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="border-b">
                  <nav className="flex overflow-x-auto">
                    {sections.map(section => (
                      <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
                          activeSection === section.id
                            ? 'border-b-2 border-indigo-500 text-indigo-600'
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        {section.label}
                        {Object.keys(validationErrors).some(error => error.startsWith(section.id)) && (
                          <span className="ml-2 text-red-500">•</span>
                        )}
                      </button>
                    ))}
                  </nav>
                </div>

                <div className="p-6">
                  {sections.map(section => {
                    const Component = section.component;
                    return activeSection === section.id ? (
                      <div key={section.id}>
                        <Component
                          data={resumeData[section.id]}
                          onChange={(data) => handleSectionChange(section.id, data)}
                          errors={validationErrors}
                        />
                      </div>
                    ) : null;
                  })}
                </div>
              </div>
            </div>

            {/* Preview Section */}
            <div className="sticky top-6">
              <div className="bg-white shadow rounded-lg p-6 overflow-auto max-h-[calc(100vh-8rem)]">
                <ModernTemplate ref={resumeRef} data={resumeData} />
              </div>
            </div>
          </div>

          <ShareModal
            isOpen={showShareModal}
            onClose={() => setShowShareModal(false)}
            shareUrl={shareUrl}
            resumeTitle={resumeData.title}
          />
        </div>
      </div>
    </div>
  );
};

export default EditResume;