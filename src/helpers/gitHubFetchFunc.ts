import { GITHUB_AUTH, LOCAL_STORAGE_KEY } from '../constants';

const gitHutFetchFunc = async () => {
  const token = localStorage.getItem(LOCAL_STORAGE_KEY);
  const response = await fetch(`${GITHUB_AUTH.PROXY_URL}/getUserData`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
};

export default gitHutFetchFunc;
