'use client';
import store from '@/api/Store';
import { Provider } from 'react-redux';

const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
