import React, { forwardRef } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub, FaGlobe } from 'react-icons/fa';

const ModernTemplate = forwardRef(({ data }, ref) => {
  const {
    profileInfo,
    contactInfo,
    workExperience,
    education,
    skills,
    projects,
    certifications,
    languages,
    interests
  } = data;

  return (
    <div ref={ref} id="resume-content" className="max-w-[800px] mx-auto bg-white shadow-lg p-8">
      {/* Header Section */}
      <div className="text-center mb-8">
        {profileInfo?.profileImageUrl && (
          <div className="flex justify-center mb-4">
            <img
              src={profileInfo.profileImageUrl}
              alt={profileInfo?.fullName || 'Profile'}
              className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
            />
          </div>
        )}
        <h1 className="text-3xl font-bold text-gray-800">{profileInfo?.fullName}</h1>
        <p className="text-xl text-gray-600 mt-2">{profileInfo?.designation}</p>
        {profileInfo?.summary && (
          <p className="text-gray-600 mt-4">{profileInfo.summary}</p>
        )}
      </div>

      {/* Contact Information */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {contactInfo?.email && (
          <div className="flex items-center gap-2">
            <FaEnvelope className="text-gray-600" />
            <span>{contactInfo.email}</span>
          </div>
        )}
        {contactInfo?.phone && (
          <div className="flex items-center gap-2">
            <FaPhone className="text-gray-600" />
            <span>{contactInfo.phone}</span>
          </div>
        )}
        {contactInfo?.location && (
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-gray-600" />
            <span>{contactInfo.location}</span>
          </div>
        )}
        {contactInfo?.linkedin && (
          <div className="flex items-center gap-2">
            <FaLinkedin className="text-gray-600" />
            <a href={contactInfo.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              LinkedIn
            </a>
          </div>
        )}
        {contactInfo?.github && (
          <div className="flex items-center gap-2">
            <FaGithub className="text-gray-600" />
            <a href={contactInfo.github} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              GitHub
            </a>
          </div>
        )}
        {contactInfo?.website && (
          <div className="flex items-center gap-2">
            <FaGlobe className="text-gray-600" />
            <a href={contactInfo.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              Portfolio
            </a>
          </div>
        )}
      </div>

      {/* Work Experience */}
      {workExperience?.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Work Experience</h2>
          {workExperience.map((exp, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{exp.role}</h3>
                  <p className="text-gray-600">{exp.company}</p>
                </div>
                <p className="text-gray-600 text-sm">
                  {exp.startDate} - {exp.endDate}
                </p>
              </div>
              <p className="text-gray-700 mt-2">{exp.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {education?.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Education</h2>
          {education.map((edu, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{edu.degree}</h3>
                  <p className="text-gray-600">{edu.institution}</p>
                </div>
                <p className="text-gray-600 text-sm">
                  {edu.startDate} - {edu.endDate}
                </p>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {skills?.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Skills</h2>
          <div className="grid grid-cols-2 gap-4">
            {skills.map((skill, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="font-medium">{skill.name}</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${skill.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects?.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Projects</h2>
          {projects.map((project, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-lg font-semibold">{project.title}</h3>
              <p className="text-gray-700 mt-1">{project.description}</p>
              <div className="flex gap-4 mt-2">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline flex items-center gap-1"
                  >
                    <FaGithub /> GitHub
                  </a>
                )}
                {project.liveDemo && (
                  <a
                    href={project.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline flex items-center gap-1"
                  >
                    <FaGlobe /> Live Demo
                  </a>
                )}
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Certifications */}
      {certifications?.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Certifications</h2>
          {certifications.map((cert, index) => (
            <div key={index} className="mb-2">
              <h3 className="text-lg font-semibold">{cert.title}</h3>
              <p className="text-gray-600">{cert.issuer} - {cert.year}</p>
            </div>
          ))}
        </section>
      )}

      {/* Languages */}
      {languages?.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Languages</h2>
          <div className="grid grid-cols-2 gap-4">
            {languages.map((lang, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="font-medium">{lang.name}</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${lang.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Interests */}
      {interests?.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Interests</h2>
          <div className="flex flex-wrap gap-2">
            {interests.map((interest, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full"
              >
                {interest}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
});

ModernTemplate.displayName = 'ModernTemplate';

export default ModernTemplate; 