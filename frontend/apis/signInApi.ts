import api from '@utils/api';

interface LocalSignInApi {
  username: string;
  password: string;
}

interface GithubSignInApi {
  code: string;
}

export const localSignInApi = async (data: LocalSignInApi) => {
  const url = '/api/auth/signin/local';
  const response = await api({ url, method: 'POST', data });

  return response.data;
};

export const githubSingInApi = async (data: GithubSignInApi) => {
  const url = '/api/auth/signin/github';

  const response = await api({ url, method: 'POST', data });

  return response.data;
};
