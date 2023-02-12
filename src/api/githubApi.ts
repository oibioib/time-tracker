import { GITHUB_AUTH, LOCAL_STORAGE_KEY } from '../constants';

export const getGithubUserData = async () => {
  const token = localStorage.getItem(LOCAL_STORAGE_KEY);
  const response = await fetch(`${GITHUB_AUTH.PROXY_URL}/getUserData`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error('Failed to get GitHub Data');
  }
  const data = await response.json();
  return data;
};

export const getGitHubToken = async (gitHubCode: string) => {
  const response = await fetch(
    `${GITHUB_AUTH.PROXY_URL}/getAccessToken?code=${gitHubCode}`,
    {
      method: 'GET',
    }
  );
  if (!response.ok) {
    throw new Error('Failed to get GitHub token');
  }
  const data = await response.json();
  return data;
};
