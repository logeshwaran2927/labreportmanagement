import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';

interface RouterContextValue {
  route: string;
  params: Record<string, string>;
  navigate: (path: string) => void;
}

const RouterContext = createContext<RouterContextValue | null>(null);

export function RouterProvider({ children }: { children: ReactNode }) {
  const [route, setRoute] = useState(() => window.location.hash.slice(1) || '/');
  const [params, setParams] = useState<Record<string, string>>({});

  useEffect(() => {
    const onHashChange = () => {
      const newRoute = window.location.hash.slice(1) || '/';
      setRoute(newRoute);
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    const match = route.match(/^\/report\/(.+)$/);
    if (match) {
      setParams({ id: match[1] });
    } else {
      setParams({});
    }
  }, [route]);

  const navigate = useCallback((path: string) => {
    window.location.hash = path;
  }, []);

  return (
    <RouterContext.Provider value={{ route, params, navigate }}>{children}</RouterContext.Provider>
  );
}

export function useRouter() {
  const ctx = useContext(RouterContext);
  if (!ctx) throw new Error('useRouter must be used within RouterProvider');
  return ctx;
}
