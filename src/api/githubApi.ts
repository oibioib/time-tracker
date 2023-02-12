import { GITHUB_AUTH, LOCAL_STORAGE_KEY } from '../constants';

const githubUserData = async () => {
  const token = localStorage.getItem(LOCAL_STORAGE_KEY);
  const response = await fetch(`${GITHUB_AUTH.PROXY_URL}/getUserData`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  console.log(data);
  return data;
};

export default githubUserData;
