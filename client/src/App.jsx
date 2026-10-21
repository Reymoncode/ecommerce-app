import { useQuery } from '@tanstack/react-query';
import { getHealth } from './api/health';

export default function App() {
  const { data, isPending, isError } = useQuery({
    queryKey: ['health'],
    queryFn: getHealth,
  });

  let status = data?.status;
  if (isPending) status = 'loading...';
  if (isError) status = 'error';

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold text-indigo-600">API status: {status}</h1>
    </div>
  );
}