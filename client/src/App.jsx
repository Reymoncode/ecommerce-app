import { useEffect, useState } from 'react';
import api from './api/axios';

export default function App() {
  const [status, setStatus] = useState('loading...');

  useEffect(() => {
    api.get('/health')
      .then((res) => setStatus(res.data.status))
      .catch(() => setStatus('error'));
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold text-indigo-600">API status: {status}</h1>
    </div>
  );
}