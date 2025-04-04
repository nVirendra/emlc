import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface Props {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const { user } = useAuth();

  return user ? <>{children}</> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
