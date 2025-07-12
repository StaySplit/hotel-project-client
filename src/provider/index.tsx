import AuthProvider from './AuthProvider';

const Provider = ({ children }: { children: React.ReactNode }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default Provider;
