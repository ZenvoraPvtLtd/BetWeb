import { AuthProvider } from './user/context/AuthContext';
import { AppRoutes } from './user/routes/AppRoutes';
import { GlobalErrorBoundary } from './user/components/common/GlobalErrorBoundary';

function App() {
  return (
    <GlobalErrorBoundary>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </GlobalErrorBoundary>
  );
}

export default App;
