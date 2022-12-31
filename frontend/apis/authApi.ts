import api from '@utils/api';

interface LocalSignInApi {
  username: string;
  password: string;
}

export const localSignInApi = async (data: LocalSignInApi) => {
  const url = '/api/auth/signin/local';

  const response = await api({ url, method: 'POST', data });

  return response.data;
};

interface GithubSignInApi {
  code: string;
}

export const githubSignInApi = async (data: GithubSignInApi) => {
  const url = '/api/auth/signin/github';

  const response = await api({ url, method: 'POST', data });

  return response.data;
};

export const checkSignInApi = async () => {
  const url = '/api/auth';

  const response = await api({ url, method: 'GET' });

  return response.data;
};

export const signOutApi = async () => {
  const url = '/api/auth/signout';

  const response = await api({ url, method: 'GET' });

  return response.data;
};

interface CreateUserApi extends LocalSignInApi {
  nickname: string;
}

export const createUserApi = async (data: CreateUserApi) => {
  const url = '/api/auth/signup';

  const response = await api({ url, method: 'POST', data });

  return response.data;
};
