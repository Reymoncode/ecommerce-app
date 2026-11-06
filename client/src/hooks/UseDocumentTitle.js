import { useEffect } from 'react';

// Sets the browser tab title while the page is on screen, then puts the old one back.
export function useDocumentTitle(title) {
  useEffect(() => {
    const previous = document.title;
    document.title = title;
    return () => {
      document.title = previous;
    };
  }, [title]);
}

export default useDocumentTitle;