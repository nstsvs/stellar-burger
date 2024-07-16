import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from 'react-redux';
import { userSelector } from '../../slices/userSlice';

export const AppHeader: FC = () => {
  const userName = (): string => {
    const user = useSelector(userSelector);
    return user?.name || '';
  };

  return <AppHeaderUI userName={userName()} />;
};
