import { useTranslation } from 'react-i18next';

const LangSwitch = () => {
  const { i18n } = useTranslation();

  function changeLanguage(language: string) {
    i18n.changeLanguage(language);
  }

  return (
    <>
      <button type="button" onClick={() => changeLanguage('en')}>
        EN
      </button>
      <button type="button" onClick={() => changeLanguage('ru')}>
        RU
      </button>
    </>
  );
};

export default LangSwitch;
