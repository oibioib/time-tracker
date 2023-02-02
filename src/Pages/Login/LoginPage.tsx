import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { BASE_PROXY_SERVER_URL, GitHubConst } from './utilfFunction';

const LOCAL_STORAGE_KEY = 'GitHubToken';

const LoginPage = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const gitHubCode = searchParams.get('code');
  const localStorageToken = localStorage.getItem(LOCAL_STORAGE_KEY);
  const [render, setRender] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (gitHubCode && !localStorageToken) {
      (async () => {
        const result = await fetch(
          `${BASE_PROXY_SERVER_URL}/getAccessToken?code=${gitHubCode}`,
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
          href={`https://github.com/login/oauth/authorize?scope=user&client_id=${GitHubConst.REACT_APP_CLIENT_ID}&redirect_uri=${GitHubConst.REACT_APP_REDIRECT_URI}`}>
          {t('buttons.gitHubLogin')}
        </a>
      </button>
    </div>
  );
};

export default LoginPage;
