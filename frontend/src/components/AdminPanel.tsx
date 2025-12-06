import React, { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X, Plus, Trash2, Edit2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './Button';
import { api } from '../lib/api';

/**
 * AdminPanel component - complete CRUD interface for managing contests
 * Features dialog forms for adding/editing and table view for management
 */
interface Contest {
  id: number;
  class_level: number;
  year: number;
  pre_number: number;
  contest_url: string;
  solution_url: string;
}

interface FormData {
  class_level: string;
  year: string;
  pre_number: string;
  contest_url: string;
  solution_url: string;
}

export const AdminPanel: React.FC = () => {
  const [contests, setContests] = useState<Contest[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState<FormData>({
    class_level: '',
    year: '',
    pre_number: '',
    contest_url: '',
    solution_url: '',
  });

  // Fetch contests on component mount
  useEffect(() => {
    fetchContests();
  }, []);

  const fetchContests = async () => {
    try {
      setLoading(true);
      const response = await api.get('/contests');
      setContests(response.data);
    } catch (err) {
      setError('Failed to fetch contests');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.class_level || !formData.year || !formData.pre_number) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);
      const payload = {
        class_level: parseInt(formData.class_level),
        year: parseInt(formData.year),
        pre_number: parseInt(formData.pre_number),
        contest_url: formData.contest_url,
        solution_url: formData.solution_url,
      };

      if (editingId) {
        await api.put(`/contests/${editingId}`, payload);
      } else {
        await api.post('/contests', payload);
      }

      await fetchContests();
      resetForm();
      setIsDialogOpen(false);
    } catch (err) {
      setError('Failed to save contest');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (contest: Contest) => {
    setFormData({
      class_level: String(contest.class_level),
      year: String(contest.year),
      pre_number: String(contest.pre_number),
      contest_url: contest.contest_url,
      solution_url: contest.solution_url,
    });
    setEditingId(contest.id);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this contest?')) return;

    try {
      setLoading(true);
      await api.delete(`/contests/${id}`);
      await fetchContests();
    } catch (err) {
      setError('Failed to delete contest');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      class_level: '',
      year: '',
      pre_number: '',
      contest_url: '',
      solution_url: '',
    });
    setEditingId(null);
    setError('');
  };

  const handleOpenChange = (open: boolean) => {
    setIsDialogOpen(open);
    if (!open) resetForm();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="max-w-6xl mx-auto p-6"
    >
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
        <Dialog.Root open={isDialogOpen} onOpenChange={handleOpenChange}>
          <Dialog.Trigger asChild>
            <Button onClick={() => resetForm()}>
              <Plus className="w-4 h-4 mr-2" />
              Add Contest
            </Button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
            <Dialog.Content className="fixed left-[50%] top-[50%] z-50 w-full max-w-md translate-x-[-50%] translate-y-[-50%] bg-white rounded-lg shadow-xl">
              <div className="flex items-center justify-between mb-6 border-b border-gray-200 pb-4">
                <Dialog.Title className="text-lg font-semibold text-gray-900">
                  {editingId ? 'Edit Contest' : 'Add New Contest'}
                </Dialog.Title>
                <Dialog.Close asChild>
                  <button className="text-gray-400 hover:text-gray-600">
                    <X className="w-5 h-5" />
                  </button>
                </Dialog.Close>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
                    {error}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Class Level *
                  </label>
                  <select
                    value={formData.class_level}
                    onChange={(e) => setFormData({ ...formData, class_level: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="">Select class</option>
                    <option value="9">Class 9</option>
                    <option value="10">Class 10</option>
                    <option value="11">Class 11</option>
                    <option value="12">Class 12</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Year *
                  </label>
                  <input
                    type="number"
                    min="1900"
                    max={new Date().getFullYear()}
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="2030"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pre Number *
                  </label>
                  <select
                    value={formData.pre_number}
                    onChange={(e) => setFormData({ ...formData, pre_number: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="">Select pre</option>
                    <option value="1">Pre #1</option>
                    <option value="2">Pre #2</option>
                    <option value="3">Pre #3</option>
                    <option value="4">Pre #4</option>
                    <option value="5">Pre #5</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contest URL
                  </label>
                  <input
                    type="url"
                    value={formData.contest_url}
                    onChange={(e) => setFormData({ ...formData, contest_url: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="https://..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Solution URL
                  </label>
                  <input
                    type="url"
                    value={formData.solution_url}
                    onChange={(e) => setFormData({ ...formData, solution_url: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="https://..."
                  />
                </div>

                <div className="flex gap-3 pt-4 border-t border-gray-200">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleOpenChange(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="flex-1"
                  >
                    {loading ? 'Saving...' : editingId ? 'Update' : 'Add'}
                  </Button>
                </div>
              </form>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>

      {/* Contests Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Class</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Year</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Pre #</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Contest URL</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Solution URL</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <AnimatePresence>
                {contests.map((contest) => (
                  <motion.tr
                    key={contest.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm text-gray-900">Class {contest.class_level}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{contest.year}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">Pre #{contest.pre_number}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      <a href={contest.contest_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        View
                      </a>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      <a href={contest.solution_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        View
                      </a>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleEdit(contest)}
                          className="p-2 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4 text-blue-600" />
                        </button>
                        <button
                          onClick={() => handleDelete(contest.id)}
                          className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {contests.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-sm">No contests yet. Add one to get started!</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};
