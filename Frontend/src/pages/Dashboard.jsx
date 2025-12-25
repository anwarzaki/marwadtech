import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0
  });
  const [loading, setLoading] = useState(true);
  const { user, logout } = useAuth();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await api.get('/api/dashboard/dashboard');
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm">Welcome, {user?.name || 'User'}</span>
          <button
            onClick={logout}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>

      <nav className="mb-8 flex gap-4 bg-white p-4 rounded-lg shadow">
        <Link to="/dashboard" className="text-blue-600 font-medium hover:underline">Dashboard</Link>
        <Link to="/products" className="text-gray-600 hover:text-blue-600">Products</Link>
        <Link to="/media" className="text-gray-600 hover:text-blue-600">Media Upload</Link>
      </nav>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white border border-gray-200 p-6 rounded-lg shadow">
            <h3 className="text-sm text-gray-600 mb-2">Total Users</h3>
            <p className="text-3xl font-bold">{stats.totalUsers}</p>
          </div>

          <div className="bg-white border border-gray-200 p-6 rounded-lg shadow">
            <h3 className="text-sm text-gray-600 mb-2">Total Products</h3>
            <p className="text-3xl font-bold">{stats.totalProducts}</p>
          </div>

          <div className="bg-white border border-gray-200 p-6 rounded-lg shadow">
            <h3 className="text-sm text-gray-600 mb-2">Total Orders</h3>
            <p className="text-3xl font-bold">{stats.totalOrders}</p>
          </div>

          <div className="bg-white border border-gray-200 p-6 rounded-lg shadow">
            <h3 className="text-sm text-gray-600 mb-2">Total Revenue</h3>
            <p className="text-3xl font-bold">₹{stats.totalRevenue}</p>
          </div>
        </div>
      )}
    </div>
  );
}
