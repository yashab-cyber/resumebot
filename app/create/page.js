'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaRobot, FaUser, FaBriefcase, FaGraduationCap, FaCode, FaCertificate, FaTrophy } from 'react-icons/fa';

export default function CreateResume() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const [formData, setFormData] = useState({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      linkedIn: '',
      github: '',
      portfolio: '',
    },
    summary: '',
    education: [],
    experience: [],
    skills: {
      technical: [],
      soft: [],
      languages: [],
      tools: [],
    },
    projects: [],
    certifications: [],
    achievements: [],
  });

  const steps = [
    { title: 'Personal Info', icon: <FaUser /> },
    { title: 'Summary', icon: <FaRobot /> },
    { title: 'Education', icon: <FaGraduationCap /> },
    { title: 'Experience', icon: <FaBriefcase /> },
    { title: 'Skills & Projects', icon: <FaCode /> },
    { title: 'Certifications', icon: <FaCertificate /> },
  ];

  const handleSave = async () => {
    setLoading(true);
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/resume`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          isPublic: true,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Resume bot created successfully! 🎉');
        router.push('/dashboard');
      } else if (response.status === 403) {
        // Plan limit reached
        if (data.upgrade) {
          const upgrade = confirm(`${data.error}\n\nWould you like to upgrade to ${data.upgrade} plan?`);
          if (upgrade) {
            router.push('/pricing');
          }
        } else {
          alert(data.error);
        }
      } else {
        alert(data.error || 'Failed to save resume');
      }
    } catch (error) {
      console.error('Save error:', error);
      alert('Failed to save resume. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const addEducation = () => {
    setFormData({
      ...formData,
      education: [...formData.education, {
        institution: '',
        degree: '',
        field: '',
        startDate: '',
        endDate: '',
        gpa: '',
        achievements: [],
      }],
    });
  };

  const addExperience = () => {
    setFormData({
      ...formData,
      experience: [...formData.experience, {
        company: '',
        position: '',
        location: '',
        startDate: '',
        endDate: '',
        current: false,
        responsibilities: [],
      }],
    });
  };

  const addProject = () => {
    setFormData({
      ...formData,
      projects: [...formData.projects, {
        name: '',
        description: '',
        technologies: [],
        link: '',
        github: '',
        highlights: [],
      }],
    });
  };

  const addCertification = () => {
    setFormData({
      ...formData,
      certifications: [...formData.certifications, {
        name: '',
        issuer: '',
        date: '',
        credentialId: '',
        link: '',
      }],
    });
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">Personal Information</h2>
            <input
              type="text"
              placeholder="Full Name *"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={formData.personalInfo.fullName}
              onChange={(e) => setFormData({
                ...formData,
                personalInfo: { ...formData.personalInfo, fullName: e.target.value }
              })}
            />
            <input
              type="email"
              placeholder="Email *"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={formData.personalInfo.email}
              onChange={(e) => setFormData({
                ...formData,
                personalInfo: { ...formData.personalInfo, email: e.target.value }
              })}
            />
            <input
              type="tel"
              placeholder="Phone"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={formData.personalInfo.phone}
              onChange={(e) => setFormData({
                ...formData,
                personalInfo: { ...formData.personalInfo, phone: e.target.value }
              })}
            />
            <input
              type="text"
              placeholder="Location"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={formData.personalInfo.location}
              onChange={(e) => setFormData({
                ...formData,
                personalInfo: { ...formData.personalInfo, location: e.target.value }
              })}
            />
            <input
              type="url"
              placeholder="LinkedIn URL"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={formData.personalInfo.linkedIn}
              onChange={(e) => setFormData({
                ...formData,
                personalInfo: { ...formData.personalInfo, linkedIn: e.target.value }
              })}
            />
            <input
              type="url"
              placeholder="GitHub URL"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={formData.personalInfo.github}
              onChange={(e) => setFormData({
                ...formData,
                personalInfo: { ...formData.personalInfo, github: e.target.value }
              })}
            />
            <input
              type="url"
              placeholder="Portfolio URL"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={formData.personalInfo.portfolio}
              onChange={(e) => setFormData({
                ...formData,
                personalInfo: { ...formData.personalInfo, portfolio: e.target.value }
              })}
            />
          </div>
        );

      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">Professional Summary</h2>
            <p className="text-gray-600 mb-4">
              Write a brief summary about yourself, your experience, and career goals.
            </p>
            <textarea
              rows="6"
              placeholder="Enter your professional summary..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={formData.summary}
              onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
            />
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">Education</h2>
            {formData.education.map((edu, index) => (
              <div key={index} className="border border-gray-300 rounded-lg p-4 space-y-3">
                <input
                  type="text"
                  placeholder="Institution"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  value={edu.institution}
                  onChange={(e) => {
                    const newEducation = [...formData.education];
                    newEducation[index].institution = e.target.value;
                    setFormData({ ...formData, education: newEducation });
                  }}
                />
                <input
                  type="text"
                  placeholder="Degree"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  value={edu.degree}
                  onChange={(e) => {
                    const newEducation = [...formData.education];
                    newEducation[index].degree = e.target.value;
                    setFormData({ ...formData, education: newEducation });
                  }}
                />
                <input
                  type="text"
                  placeholder="Field of Study"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  value={edu.field}
                  onChange={(e) => {
                    const newEducation = [...formData.education];
                    newEducation[index].field = e.target.value;
                    setFormData({ ...formData, education: newEducation });
                  }}
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Start Date"
                    className="px-4 py-2 border border-gray-300 rounded-lg"
                    value={edu.startDate}
                    onChange={(e) => {
                      const newEducation = [...formData.education];
                      newEducation[index].startDate = e.target.value;
                      setFormData({ ...formData, education: newEducation });
                    }}
                  />
                  <input
                    type="text"
                    placeholder="End Date"
                    className="px-4 py-2 border border-gray-300 rounded-lg"
                    value={edu.endDate}
                    onChange={(e) => {
                      const newEducation = [...formData.education];
                      newEducation[index].endDate = e.target.value;
                      setFormData({ ...formData, education: newEducation });
                    }}
                  />
                </div>
                <input
                  type="text"
                  placeholder="GPA"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  value={edu.gpa}
                  onChange={(e) => {
                    const newEducation = [...formData.education];
                    newEducation[index].gpa = e.target.value;
                    setFormData({ ...formData, education: newEducation });
                  }}
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addEducation}
              className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-500 transition"
            >
              + Add Education
            </button>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">Work Experience</h2>
            {formData.experience.map((exp, index) => (
              <div key={index} className="border border-gray-300 rounded-lg p-4 space-y-3">
                <input
                  type="text"
                  placeholder="Company"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  value={exp.company}
                  onChange={(e) => {
                    const newExperience = [...formData.experience];
                    newExperience[index].company = e.target.value;
                    setFormData({ ...formData, experience: newExperience });
                  }}
                />
                <input
                  type="text"
                  placeholder="Position"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  value={exp.position}
                  onChange={(e) => {
                    const newExperience = [...formData.experience];
                    newExperience[index].position = e.target.value;
                    setFormData({ ...formData, experience: newExperience });
                  }}
                />
                <input
                  type="text"
                  placeholder="Location"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  value={exp.location}
                  onChange={(e) => {
                    const newExperience = [...formData.experience];
                    newExperience[index].location = e.target.value;
                    setFormData({ ...formData, experience: newExperience });
                  }}
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Start Date"
                    className="px-4 py-2 border border-gray-300 rounded-lg"
                    value={exp.startDate}
                    onChange={(e) => {
                      const newExperience = [...formData.experience];
                      newExperience[index].startDate = e.target.value;
                      setFormData({ ...formData, experience: newExperience });
                    }}
                  />
                  <input
                    type="text"
                    placeholder="End Date"
                    className="px-4 py-2 border border-gray-300 rounded-lg"
                    value={exp.endDate}
                    onChange={(e) => {
                      const newExperience = [...formData.experience];
                      newExperience[index].endDate = e.target.value;
                      setFormData({ ...formData, experience: newExperience });
                    }}
                  />
                </div>
                <textarea
                  rows="3"
                  placeholder="Responsibilities (comma-separated)"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  value={exp.responsibilities.join(', ')}
                  onChange={(e) => {
                    const newExperience = [...formData.experience];
                    newExperience[index].responsibilities = e.target.value.split(',').map(r => r.trim());
                    setFormData({ ...formData, experience: newExperience });
                  }}
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addExperience}
              className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-500 transition"
            >
              + Add Experience
            </button>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4">Skills</h2>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Technical Skills (comma-separated)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  value={formData.skills.technical.join(', ')}
                  onChange={(e) => setFormData({
                    ...formData,
                    skills: { ...formData.skills, technical: e.target.value.split(',').map(s => s.trim()) }
                  })}
                />
                <input
                  type="text"
                  placeholder="Soft Skills (comma-separated)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  value={formData.skills.soft.join(', ')}
                  onChange={(e) => setFormData({
                    ...formData,
                    skills: { ...formData.skills, soft: e.target.value.split(',').map(s => s.trim()) }
                  })}
                />
                <input
                  type="text"
                  placeholder="Languages (comma-separated)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  value={formData.skills.languages.join(', ')}
                  onChange={(e) => setFormData({
                    ...formData,
                    skills: { ...formData.skills, languages: e.target.value.split(',').map(s => s.trim()) }
                  })}
                />
                <input
                  type="text"
                  placeholder="Tools & Technologies (comma-separated)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  value={formData.skills.tools.join(', ')}
                  onChange={(e) => setFormData({
                    ...formData,
                    skills: { ...formData.skills, tools: e.target.value.split(',').map(s => s.trim()) }
                  })}
                />
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Projects</h2>
              {formData.projects.map((proj, index) => (
                <div key={index} className="border border-gray-300 rounded-lg p-4 space-y-3 mb-3">
                  <input
                    type="text"
                    placeholder="Project Name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    value={proj.name}
                    onChange={(e) => {
                      const newProjects = [...formData.projects];
                      newProjects[index].name = e.target.value;
                      setFormData({ ...formData, projects: newProjects });
                    }}
                  />
                  <textarea
                    rows="2"
                    placeholder="Description"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    value={proj.description}
                    onChange={(e) => {
                      const newProjects = [...formData.projects];
                      newProjects[index].description = e.target.value;
                      setFormData({ ...formData, projects: newProjects });
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Technologies (comma-separated)"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    value={proj.technologies.join(', ')}
                    onChange={(e) => {
                      const newProjects = [...formData.projects];
                      newProjects[index].technologies = e.target.value.split(',').map(t => t.trim());
                      setFormData({ ...formData, projects: newProjects });
                    }}
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="url"
                      placeholder="Project Link"
                      className="px-4 py-2 border border-gray-300 rounded-lg"
                      value={proj.link}
                      onChange={(e) => {
                        const newProjects = [...formData.projects];
                        newProjects[index].link = e.target.value;
                        setFormData({ ...formData, projects: newProjects });
                      }}
                    />
                    <input
                      type="url"
                      placeholder="GitHub Link"
                      className="px-4 py-2 border border-gray-300 rounded-lg"
                      value={proj.github}
                      onChange={(e) => {
                        const newProjects = [...formData.projects];
                        newProjects[index].github = e.target.value;
                        setFormData({ ...formData, projects: newProjects });
                      }}
                    />
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={addProject}
                className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-500 transition"
              >
                + Add Project
              </button>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4">Certifications</h2>
              {formData.certifications.map((cert, index) => (
                <div key={index} className="border border-gray-300 rounded-lg p-4 space-y-3 mb-3">
                  <input
                    type="text"
                    placeholder="Certification Name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    value={cert.name}
                    onChange={(e) => {
                      const newCerts = [...formData.certifications];
                      newCerts[index].name = e.target.value;
                      setFormData({ ...formData, certifications: newCerts });
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Issuer"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    value={cert.issuer}
                    onChange={(e) => {
                      const newCerts = [...formData.certifications];
                      newCerts[index].issuer = e.target.value;
                      setFormData({ ...formData, certifications: newCerts });
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Date"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    value={cert.date}
                    onChange={(e) => {
                      const newCerts = [...formData.certifications];
                      newCerts[index].date = e.target.value;
                      setFormData({ ...formData, certifications: newCerts });
                    }}
                  />
                  <input
                    type="url"
                    placeholder="Credential Link"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    value={cert.link}
                    onChange={(e) => {
                      const newCerts = [...formData.certifications];
                      newCerts[index].link = e.target.value;
                      setFormData({ ...formData, certifications: newCerts });
                    }}
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={addCertification}
                className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-500 transition"
              >
                + Add Certification
              </button>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Achievements</h2>
              <textarea
                rows="4"
                placeholder="Enter achievements (one per line)"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                value={formData.achievements.join('\n')}
                onChange={(e) => setFormData({
                  ...formData,
                  achievements: e.target.value.split('\n').filter(a => a.trim())
                })}
              />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <FaRobot className="text-3xl text-blue-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ResumeBot
              </span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-12">Create Your Resume Bot</h1>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-between">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`flex-1 text-center ${
                  index < steps.length - 1 ? 'border-r-2' : ''
                } ${currentStep === index ? 'border-blue-600' : 'border-gray-300'}`}
              >
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-2 ${
                    currentStep === index
                      ? 'bg-blue-600 text-white'
                      : currentStep > index
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {step.icon}
                </div>
                <p className="text-xs font-medium">{step.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          {renderStep()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          {currentStep < steps.length - 1 ? (
            <button
              onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSave}
              disabled={loading}
              className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating Bot...' : 'Create Bot'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
