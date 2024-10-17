import type { Component } from 'solid-js';

import { DefaultLayout } from '@/components/layouts/default';

import { useAppState } from '@/AppContext';

const Home: Component = () => {
  const context = useAppState();
  const { t } = context;
  const title = () => (context.isDark ? t('global.light_mode') : t('global.dark_mode'));
  const locale = () => t('global.lang')

  const switchTheme = () => {
    context.setDark(!context.isDark)
  }

  const switchLang = () => {
    context.setLocale(context.locale === 'en' ? 'zh-cn' : 'en')
  }

  return (
    <div class="center flex items-start bg-#e1e1e1 min-w-100vw min-h-100vh p-10 gap-2">
      <DefaultLayout></DefaultLayout>
      <div class="flex flex-col gap-2 w-22">
        <button onClick={switchLang}>{locale()}</button>
        <button onClick={switchTheme}>{title()}</button>
      </div>
    </div>
  );
};

export default Home;
