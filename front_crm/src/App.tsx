import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { store } from './store';
import { theme } from './theme';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Customers from './pages/customers/Customers';
import Leads from './pages/leads/Leads';
import DashboardLayout from './components/layout/DashboardLayout';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import Activities from './pages/activities/Activities';
import Payments from './pages/payments/Payments';
import Settings from './pages/settings/Settings';
import Profile from './pages/profile/Profile';

// Separate the routes component to use hooks
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      {/* Protected Routes */}
      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/leads" element={<Leads />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

// Main App component
function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <AppRoutes />
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
