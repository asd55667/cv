import { createSignal, Show, type Component } from 'solid-js';

import { DefaultLayout } from '@/components/layouts/default';

import { useAppState } from '@/AppContext';
import { CVButton } from '@/components/button/Button';


const Home: Component = () => {
  const context = useAppState();
  const { t } = context;
  const theme = () => (context.isDark ? t('global.light_mode') : t('global.dark_mode'));

  const switchTheme = () => {
    context.setDark(!context.isDark)
  }

  const switchLang = () => {
    context.setLocale(context.locale === 'en' ? 'zh-cn' : 'en')
  }

  const printCV = () => {
    window.print()
  }

  const downloadPdf = () => {

  }

  const downloadPng = () => {

  }

  return (
    <div class="center bg-#e1e1e1 min-w-100vw min-h-100vh gap-2">
      <DefaultLayout></DefaultLayout>

      <div id="buttons" class="flex flex-col gap-4" style="height: var(--page-height);">
        <CVButton onClick={switchLang}>{t('global.lang')}</CVButton>
        <CVButton onClick={switchTheme}>{theme()}</CVButton>
        <CVButton onClick={printCV}>{t('global.print')}</CVButton>
        <CVButton onClick={downloadPdf}>{t('global.pdf')}</CVButton>
        <CVButton onClick={downloadPng}>{t('global.img')}</CVButton>
      </div>
    </div>
  );
};

export default Home;
