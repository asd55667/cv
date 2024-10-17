import { createSignal, onMount, type Component } from 'solid-js';

import { DefaultLayout } from '@/components/layouts/default';

import { useAppState } from '@/AppContext';
import { CVButton } from '@/components/button/Button';
import { downloadPdf, downloadImage, useEventListener } from '@/utils/index';

const Home: Component = () => {
  const context = useAppState();
  const { t } = context;
  const theme = () => (context.isDark ? t('global.light_mode') : t('global.dark_mode'));

  const [zoom, setZoom] = createSignal(1)
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

  onMount(resize)
  useEventListener(window, 'resize', resize)
  useEventListener(window, 'onbeforeprint', beforePrint)
  useEventListener(window, 'onafterprint', afterPrint)

  if (window.matchMedia) {
    const mediaQueryList = window.matchMedia('print');
    mediaQueryList.addListener(function (mql) {
      if (mql.matches) {
        beforePrint();
      } else {
        afterPrint();
      }
    });
  }

  function beforePrint() {
    setZoom(1)
  }

  function afterPrint() {
    resize()
  }

  function resize() {
    const a4 = [
      [595, 842],
      [1240, 1754],
      [2480, 3508]
    ]
    const { innerWidth, innerHeight } = window
    const orientation = innerWidth > innerHeight ? 'portrait' : 'landscape'

    for (const size of a4) {
      const [w, h] = size

      if (orientation === 'portrait' && innerHeight < h) {
        setZoom(innerHeight / h - 0.05)
        break;
      } else if (orientation === 'landscape' && innerWidth < w) {
        setZoom(innerWidth / w - 0.05)
        break
      }
    }
  }

  return (
    <div class="center relative min-w-100vw min-h-100vh gap-2" style={`zoom: ${zoom()};`}>
      <DefaultLayout></DefaultLayout>

      <div id="buttons" class="absolute right-0 translate-x-100% h-full flex flex-col gap-4">
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
