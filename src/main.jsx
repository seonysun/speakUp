import { StrictMode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from './hooks/useTheme';
import { store } from './redux/store';
import { router } from './router';
import './styles/main.css';
import { SupabaseProvider } from './supabase/context';

const enableMocking = import.meta.env.VITE_ENABLE_MSW;

if (enableMocking) {
  const { worker } = await import('./mocks/browser');
  worker.start({
    onUnhandledRequest: 'bypass',
  });
}

const query = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={query}>
        <ThemeProvider>
          <SupabaseProvider>
            <RouterProvider router={router} />
          </SupabaseProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  </StrictMode>,
);
