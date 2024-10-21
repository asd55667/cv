import { type Component } from 'solid-js';

import { DefaultLayout } from '@/components/layouts/default';

import { useAppState } from '@/AppContext';
import { CVButton } from '@/components/button/Button';
import { downloadPdf, downloadImage, useEventListener } from '@/utils/index';

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

  const download = (type: 'pdf' | 'png') => {
    return () => {
      const filename = `${context.cv.name}-${context.locale === 'en' ? 'cv' : '简历'}`
      if (type === 'pdf') downloadPdf(filename)
      if (type === 'png') downloadImage('png', filename + '.png')
    }
  }

  return (
    <div class="center  relative min-w-100vw min-h-100vh gap-2">
      <DefaultLayout></DefaultLayout>

      <div id="buttons" class="fixed right-0 top-0 translate-x--100% translate-y-25% h-full flex flex-col gap-4">
        <CVButton onClick={switchLang}>{t('global.lang')}</CVButton>
        <CVButton onClick={switchTheme}>{theme()}</CVButton>
        <CVButton onClick={printCV}>{t('global.print')}</CVButton>
        <CVButton onClick={download('pdf')}>{t('global.pdf')}</CVButton>
        <CVButton onClick={download('png')}>{t('global.img')}</CVButton>
      </div>
    </div>
  );
};

export default Home;
