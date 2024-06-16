import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { api } from '@services/api';

import {
  storageUserGet,
  storageUserRemove,
  storageUserSave,
} from '@storage/storageUser';

import {
  storageAuthTokenGet,
  storageAuthTokenRemove,
  storageAuthTokenSave,
} from '@storage/storageAuthToken';

import { IUserDTO } from '@dtos/UserDTO';

type ICredentials = {
  email: string;
  password: string;
};

type IAuthUserResponse = {
  user: IUserDTO;
  token: string;
  refresh_token: string;
};

type IAuthProviderProps = {
  children: ReactNode;
};

type IAuthContextDataProps = {
  user: IUserDTO;
  isLoadingUserStorageData: boolean;
  updateUserProfile(userUpdated: IUserDTO): Promise<void>;
  signIn({ email, password }: ICredentials): Promise<void>;
  signOut(): Promise<void>;
};

const AuthContext = createContext<IAuthContextDataProps>(
  {} as IAuthContextDataProps,
);

function AuthProvider({ children }: IAuthProviderProps) {
  const [user, setUser] = useState<IUserDTO>({} as IUserDTO);
  const [isLoadingUserStorageData, setIsLoadingUserStorageData] =
    useState(true);

  // FUNCTIONS
  const userAndTokenUpdate = useCallback(
    async (userData: IUserDTO, token: string) => {
      api.defaults.headers.common.Authorization = `Bearer ${token}`;

      setUser(userData);
    },
    [],
  );

  const storageUserAndTokenSave = useCallback(
    async (userData: IUserDTO, token: string, refresh_token: string) => {
      try {
        setIsLoadingUserStorageData(true);

        await storageUserSave(userData);
        await storageAuthTokenSave({ token, refresh_token });
      } catch (error) {
        throw error;
      } finally {
        setIsLoadingUserStorageData(false);
      }
    },
    [],
  );

  const signIn = useCallback(
    async ({ email, password }: ICredentials) => {
      try {
        const response = await api.post('/sessions', { email, password });

        if (response.status === 201) {
          const userData = response.data as IAuthUserResponse;

          await storageUserAndTokenSave(
            userData.user,
            userData.token,
            userData.refresh_token,
          );
          await userAndTokenUpdate(userData.user, userData.token);
        }
      } catch (error) {
        throw error;
      } finally {
        setIsLoadingUserStorageData(false);
      }
    },
    [userAndTokenUpdate, storageUserAndTokenSave],
  );

  const signOut = useCallback(async () => {
    try {
      setIsLoadingUserStorageData(true);

      setUser({} as IUserDTO);

      await storageUserRemove();
      await storageAuthTokenRemove();
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }, []);

  const updateUserProfile = useCallback(async (userUpdated: IUserDTO) => {
    try {
      setUser(userUpdated);

      await storageUserSave(userUpdated);
    } catch (error) {
      throw error;
    }
  }, []);

  const loadUserData = useCallback(async () => {
    try {
      setIsLoadingUserStorageData(true);

      const userLogged = await storageUserGet();
      const { token } = await storageAuthTokenGet();

      if (userLogged && token) {
        // setUser(userLogged);
        userAndTokenUpdate(userLogged, token);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }, [userAndTokenUpdate]);
  // END FUNCTIONS

  useEffect(() => {
    loadUserData();
  }, [loadUserData]);

  useEffect(() => {
    const subscribe = api.registerInterceptTokenManager(signOut);

    // LIMPEZA DE MEMÓRIA
    return () => {
      subscribe();
    };
  }, [signOut]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoadingUserStorageData,
        updateUserProfile,
        signIn,
        signOut,
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
