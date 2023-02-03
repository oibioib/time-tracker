import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { GITHUB_AUTH, LOCAL_STORAGE_KEY } from '../../constants';

const LoginPage = () => {
  const [searchParams] = useSearchParams();
  const gitHubCode = searchParams.get(GITHUB_AUTH.URL_PARAM);
  const localStorageToken = localStorage.getItem(LOCAL_STORAGE_KEY);
  const [render, setRender] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (gitHubCode && !localStorageToken) {
      (async () => {
        const result = await fetch(
          `${GITHUB_AUTH.PROXY_URL}/getAccessToken?code=${gitHubCode}`,
          {
            method: 'GET',
          }
        );
        const data = await result.json();
        localStorage.setItem(LOCAL_STORAGE_KEY, data.access_token);
        setRender(!render);
      })();
    }
    if (localStorageToken) {
      navigate('/tracker');
    }
  }, [gitHubCode, localStorageToken, render, navigate]);

  return (
    <div>
      Login Page
      <button type="button">
        <a
          href={`https://github.com/login/oauth/authorize?scope=user&client_id=${GITHUB_AUTH.CLIENT_ID}&redirect_uri=${GITHUB_AUTH.REDIRECT_URI}`}>
          GitHub Login
        </a>
      </button>
    </div>
  );
};

export default LoginPage;
