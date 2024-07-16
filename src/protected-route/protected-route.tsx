import { useSelector } from '../services/store';
import { Navigate, useLocation } from 'react-router';
import { Preloader } from '@ui';
import React, { FC } from 'react';
import { userSelector, userAuthSelector } from '../slices/userSlice';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  onlyUnAuth,
  children
}: ProtectedRouteProps) => {
  const isAuthChecked = useSelector(userAuthSelector);
  const user = useSelector(userSelector);
  const location = useLocation();

  if (!isAuthChecked && user) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && user) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }

  return children;
};
