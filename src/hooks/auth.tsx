import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { api } from '@services/api';

import { storageUserGet, storageUserSave } from '@storage/storageUser';

import { IUserDTO } from '@dtos/UserDTO';

type ICredentials = {
  email: string;
  password: string;
};

type IAuthProviderProps = {
  children: ReactNode;
};

type IAuthContextDataProps = {
  user: IUserDTO;
  signIn({ email, password }: ICredentials): Promise<void>;
};

const AuthContext = createContext<IAuthContextDataProps>(
  {} as IAuthContextDataProps,
);

function AuthProvider({ children }: IAuthProviderProps) {
  const [user, setUser] = useState<IUserDTO>({} as IUserDTO);

  // FUNCTIONS
  const signIn = useCallback(async ({ email, password }: ICredentials) => {
    try {
      const response = await api.post('/sessions', { email, password });

      if (response.status === 201) {
        const userData = response.data.user;

        setUser(userData);

        await storageUserSave(userData);
      }
    } catch (error) {
      throw error;
    }
  }, []);

  const loadUserData = useCallback(async () => {
    const userLogged = await storageUserGet();

    if (userLogged) {
      setUser(userLogged);
    }
  }, []);
  // END FUNCTIONS

  useEffect(() => {
    loadUserData();
  }, [loadUserData]);

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be use whiting an AuthProvider');
  }

  return context;
}

export { useAuth, AuthProvider };
