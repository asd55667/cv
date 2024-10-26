import { createSignal, Show, type Component } from 'solid-js';

import { DefaultLayout } from '@/components/layouts/default';

import { useAppState } from '@/AppContext';
import { CVButton } from '@/components/button/Button';
import { downloadPdf, downloadImage, cn } from '@/utils/index';
import { SvgIcon } from '@/components/svg';

const Home: Component = () => {
  const context = useAppState();
  const { t } = context;
  const theme = () => (context.isDark ? t('global.light_mode') : t('global.dark_mode'));

  const [expanded, setExpanded] = createSignal(false)

  const switchTheme = () => {
    context.setDark(!context.isDark)
    setExpanded(!expanded())
  }

  const switchLang = () => {
    setExpanded(!expanded())
    context.setLocale(context.locale === 'en' ? 'zh-cn' : 'en')
  }

  const printCV = () => {
    window.print()
    setExpanded(!expanded())
  }

  const download = (type: 'pdf' | 'png') => {
    return () => {
      const filename = `${context.cv.name}-${context.locale === 'en' ? 'cv' : '简历'}`
      if (type === 'pdf') downloadPdf(filename)
      if (type === 'png') downloadImage('png', filename + '.png')
      setExpanded(!expanded())
    }
  }

  const Buttons = () => <>
    <CVButton onClick={switchLang}>{t('global.lang')}</CVButton>
    <CVButton onClick={switchTheme}>{theme()}</CVButton>
    <CVButton onClick={printCV}>{t('global.print')}</CVButton>
    <CVButton onClick={download('pdf')}>{t('global.pdf')}</CVButton>
    <CVButton onClick={download('png')}>{t('global.img')}</CVButton>
  </>

  return (
    <div class="center relative min-w-100vw min-h-100vh gap-2 bg-[--background] md:bg-#e1e1e1 ">
      <DefaultLayout></DefaultLayout>

      <div id="buttons" class="hidden md:flex flex-col gap-4 fixed right-0 top-0 lg:translate-x--100% translate-y-25% h-full">
        <Buttons />
      </div>

      <div class="fixed bottom-15 right-10 md:hidden text-white flex flex-col items-end">
        <Show when={expanded()}>
          <div class="flex flex-col gap-4 mb-4">
            <Buttons />
          </div>
        </Show>

        <CVButton class='relative center w-12 h-12 opacity-70 hover:opacity-100'
          onClick={() => setExpanded(!expanded())}
        >
          <SvgIcon class={cn("absolute w-12 h-12", expanded() && 'rotate-180')} name='up-arrow'></SvgIcon>
        </CVButton>
      </div>
    </div>
  );
};

export default Home;
