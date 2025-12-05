import React, { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import { api } from '../lib/api';
import { motion } from 'framer-motion';

/**
 * HomePage - Main page displaying contests organized by class and year
 * Features class selection, dynamic sidebar, and contest cards
 */
interface Contest {
  id: number;
  class_level: number;
  year: number;
  pre_number: number;
  contest_url: string;
  solution_url: string;
}

export const HomePage: React.FC = () => {
  const [selectedClass, setSelectedClass] = useState<number>(9);
  const [contests, setContests] = useState<Contest[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch contests on component mount and when class changes
  useEffect(() => {
    fetchContests();
  }, []);

  const fetchContests = async () => {
    try {
      setLoading(true);
      const response = await api.get('/contests');
      setContests(response.data);
    } catch (error) {
      console.error('Failed to fetch contests:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header selectedClass={selectedClass} onSelectClass={setSelectedClass} />

      <div className="flex">
        {selectedClass && <Sidebar contests={contests} selectedClass={selectedClass} />}

        {/* Main content */}
        <main className="flex-1 p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <p className="text-gray-500">Loading contests...</p>
              </div>
            ) : contests.length === 0 ? (
              <div className="flex items-center justify-center h-64">
                <p className="text-gray-500">No contests available yet.</p>
              </div>
            ) : (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Class {selectedClass} Contests
                </h2>
                <p className="text-gray-600 text-sm mb-8">
                  Select a year from the sidebar to view contests
                </p>
              </div>
            )}
          </motion.div>
        </main>
      </div>
    </div>
  );
};
