import { ErrorBoundary } from './components/ErrorBoundary';
import { Header } from './components/Header';
import { Dashboard } from './features/dashboard/Dashboard';

function App() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Dashboard />
      </div>
    </ErrorBoundary>
  );
}

export default App;
