import axios, { AxiosInstance } from 'axios';

import { AppError } from '@utils/AppError';

/**
 * INTERFACE PORQUE NÃO TEMOS ACESSO A FUNÇÃO SIGNOUT
 * QUE ESTÁ NO CONTEXTO
 */
type SingOut = () => void;

type IAPIInstanceProps = AxiosInstance & {
  /**
   * GERENCIAR A INTERCEPTAÇÃO DO TOKEN
   * UMA FUNÇÃO QUE RECEBE OUTRA FUNÇÃO
   * NA PRIMEIRA FUNÇÃO RECEBEMOS O MÉTODO DE SIGNOUT
   * NA SEGUNDA FUNÇÃO VAI SER O INTERCEPTOR
   */
  registerInterceptTokenManager: (signOut: SingOut) => () => void;
};

const api = axios.create({
  baseURL: 'http://192.168.100.8:3333',
}) as IAPIInstanceProps;

api.registerInterceptTokenManager = (signOut) => {
  // ESTAMOS COLOCANDO O INTERCEPTADOR ELE NA CONSTANTE
  // PORQUE VAMOS UTILIZAR UM OUTRO MÉTODO DO INTERCEPTADOR
  // QUE É DA UM EJECT NO INTERCEPTADOR DEPOIS DE USAR ELE

  const interceptTokenManager = api.interceptors.response.use(
    (response) => response,
    (requestError) => {
      // VERIFICANDO O TOKEN
      if (requestError?.response?.status === 401) {
        if (
          requestError.response.data?.message === 'token.expired' ||
          requestError.response.data?.message === 'token.invalid'
        ) {
        }

        // SE O ERRO NÃO FOR NENHUM ACIMA, FAZEMOS O LOGOUT DO USUÁRIO
        signOut();
      }

      if (requestError.response && requestError.response.data) {
        return Promise.reject(new AppError(requestError.response.data.message));
      } else {
        // return Promise.reject(
        //   new AppError('Erro no servidor. Tente novamente mais tarde.'),
        // );
        return Promise.reject(requestError);
      }
    },
  );

  return () => {
    api.interceptors.response.eject(interceptTokenManager);
  };
};

export { api };
