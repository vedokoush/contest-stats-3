import React, { useEffect, useState } from 'react';
import { AdminPanel } from '../components/AdminPanel';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../components/Button';
import { api } from '../lib/api';

/**
 * AdminPage - Dedicated page for the admin panel
 * Provides full CRUD interface for contest management
 */
export const AdminPage: React.FC = () => {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    setAuthenticated(!!token);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      setLoading(true);
      const res = await api.post('/auth/login', { password });
      const token = res.data?.token;
      if (token) {
        localStorage.setItem('admin_token', token);
        setAuthenticated(true);
      } else {
        setError('Invalid response from server');
      }
    } catch (err: any) {
      setError(err?.response?.data?.detail || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('admin_token');
      if (token) {
        await api.post('/auth/logout');
      }
    } catch (e) {
      // ignore
    }
    localStorage.removeItem('admin_token');
    setAuthenticated(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Admin header */}
      <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Back"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
          </div>
          <div className="flex items-center gap-3">
            {authenticated ? (
              <Button variant="outline" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <Button variant="outline" onClick={() => {}}>
                Admin
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Admin content */}
      <div className="py-8">
        {!authenticated ? (
          <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Admin Login</h2>
            {error && <div className="text-sm text-red-600 mb-2">{error}</div>}
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit" disabled={loading} className="flex-1">
                  {loading ? 'Logging in...' : 'Login'}
                </Button>
                <Button variant="ghost" onClick={() => navigate('/')}>Back</Button>
              </div>
            </form>
          </div>
        ) : (
          <AdminPanel />
        )}
      </div>
    </div>
  );
};
