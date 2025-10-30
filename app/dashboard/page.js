'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaRobot, FaPlus, FaEye, FaEdit, FaTrash, FaShare, FaChartLine } from 'react-icons/fa';

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token) {
      router.push('/login');
      return;
    }

    setUser(JSON.parse(userData));
    fetchResumes(token);
  }, []);

  const fetchResumes = async (token) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/resume/my-resumes`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setResumes(data);
      }
    } catch (error) {
      console.error('Error fetching resumes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this resume bot?')) return;

    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/resume/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setResumes(resumes.filter(r => r._id !== id));
      }
    } catch (error) {
      console.error('Error deleting resume:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <FaRobot className="text-6xl text-blue-600 animate-bounce mx-auto mb-4" />
          <p className="text-xl text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <FaRobot className="text-2xl sm:text-3xl text-blue-600" />
              <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ResumeBot
              </span>
            </Link>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <span className="hidden sm:inline text-sm sm:text-base text-gray-700">Welcome, {user?.name}!</span>
              <button
                onClick={handleLogout}
                className="text-sm sm:text-base text-gray-700 hover:text-blue-600 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">My Resume Bots</h1>
            <p className="text-sm sm:text-base text-gray-600">Create and manage your AI-powered resume chatbots</p>
          </div>
          <Link
            href="/create"
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 sm:px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition flex items-center justify-center space-x-2 text-sm sm:text-base"
          >
            <FaPlus />
            <span>Create New Bot</span>
          </Link>
        </div>

        {resumes.length === 0 ? (
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-8 sm:p-12 text-center">
            <FaRobot className="text-5xl sm:text-6xl text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">No Resume Bots Yet</h2>
            <p className="text-sm sm:text-base text-gray-600 mb-6 px-4">
              Create your first AI-powered resume bot to get started
            </p>
            <Link
              href="/create"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition text-sm sm:text-base"
            >
              <FaPlus />
              <span>Create Your First Bot</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {resumes.map((resume) => (
              <div key={resume._id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 sm:p-6 text-white">
                  <h3 className="text-lg sm:text-xl font-bold mb-1 truncate">{resume.personalInfo.fullName}</h3>
                  <p className="text-blue-100 text-xs sm:text-sm truncate">{resume.personalInfo.email}</p>
                </div>
                
                <div className="p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3 sm:space-x-4 text-xs sm:text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <FaEye />
                        <span>{resume.analytics.views}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <FaChartLine />
                        <span>{resume.analytics.interactions}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-xs sm:text-sm text-gray-500 mb-1">Bot ID:</p>
                    <code className="bg-gray-100 px-2 py-1 rounded text-xs sm:text-sm break-all">{resume.botId}</code>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href={`/bot/${resume.botId}`}
                      target="_blank"
                      className="bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700 transition flex items-center justify-center space-x-1 text-xs sm:text-sm"
                    >
                      <FaEye />
                      <span>View</span>
                    </Link>
                    <Link
                      href={`/share/${resume.botId}`}
                      className="bg-green-600 text-white text-center py-2 rounded-lg hover:bg-green-700 transition flex items-center justify-center space-x-1 text-xs sm:text-sm"
                    >
                      <FaShare />
                      <span>Share</span>
                    </Link>
                    <button
                      onClick={() => router.push(`/create?edit=${resume._id}`)}
                      className="bg-gray-600 text-white text-center py-2 rounded-lg hover:bg-gray-700 transition flex items-center justify-center space-x-1 text-xs sm:text-sm"
                    >
                      <FaEdit />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDelete(resume._id)}
                      className="bg-red-600 text-white text-center py-2 rounded-lg hover:bg-red-700 transition flex items-center justify-center space-x-1 text-xs sm:text-sm"
                    >
                      <FaTrash />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
