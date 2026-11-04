import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function useScrollToHash() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    let id = hash.slice(1);
    try {
      id = decodeURIComponent(id);
    } catch {
      // malformed hash: use it as typed
    }
    document.getElementById(id)?.scrollIntoView();
  }, [hash]);
}

export default useScrollToHash;