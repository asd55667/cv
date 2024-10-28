import {
  createEffect,
  createSignal,
  onMount,
  Show,
  type Component,
} from "solid-js";

import { DefaultLayout } from "@/components/layouts/default";

import { useAppState } from "@/AppContext";
import { CVButton } from "@/components/button/Button";
import {
  downloadPdf,
  downloadImage,
  cn,
  useEventListener,
  setCssVariable,
} from "@/utils/index";
import { SvgIcon } from "@/components/svg";
import * as MagicCurtain from "@/components/magic-curtain/MagicCurtain";

const Home: Component = () => {
  const context = useAppState();
  const { t } = context;
  const isDark = () =>
    (context.isDark && !context.reverse) ||
    (!context.isDark && context.reverse);
  const theme = () =>
    isDark() ? t("global.light_mode") : t("global.dark_mode");

  const [expanded, setExpanded] = createSignal(false);
  const [animating, setAnimating] = createSignal(false);

  const switchTheme = (e: MouseEvent) => {
    if (animating()) {
      e.stopPropagation();
      e.preventDefault();
      return;
    }
    setAnimating(true);
    setExpanded(false);
  };

  const switchLang = () => {
    setExpanded(false);
    context.setLocale(context.locale === "en" ? "zh-cn" : "en");
  };

  const printCV = () => {
    window.print();
    setExpanded(false);
  };

  const download = (type: "pdf" | "png") => {
    return () => {
      const filename = `${context.cv.name}-${context.locale === "en" ? "cv" : "简历"}`;
      if (type === "pdf") downloadPdf(filename);
      if (type === "png") downloadImage("png", filename + ".png");
      setExpanded(!expanded());
    };
  };

  const onAnimationEnd = (event: AnimationEvent) => {
    context.setDark(!context.isDark);
    setAnimating(false);
  };

  createEffect(() => context.setThemeSwitching(animating()));

  onMount(() => {
    const onBeforeprint = (e: Event) => {
      if (animating()) e.preventDefault();
    };

    window.addEventListener("beforeprint", onBeforeprint);
    return () => window.removeEventListener("beforeprint", onBeforeprint);
  });

  const Buttons = () => (
    <>
      <CVButton onClick={switchLang}>{t("global.lang")}</CVButton>
      <MagicCurtain.Control onAnimationEnd={onAnimationEnd}>
        <CVButton onClick={switchTheme} disabled={animating()}>
          {theme()}
        </CVButton>
      </MagicCurtain.Control>
      <CVButton onClick={printCV} disabled={animating()}>
        {t("global.print")}
      </CVButton>
      <CVButton onClick={download("pdf")}>{t("global.pdf")}</CVButton>
      <CVButton onClick={download("png")}>{t("global.img")}</CVButton>
    </>
  );

  useEventListener(window, "scroll", onScroll);
  useEventListener(window, "touchmove", onScroll);

  function onScroll() {
    const left =
      document.documentElement.scrollLeft || document.body.scrollLeft;
    const top = document.documentElement.scrollTop || document.body.scrollTop;
    const [x, y] = context.spotPos;
    setCssVariable("--spotlight-x", `${x - left}`);
    setCssVariable("--spotlight-y", `${y - top}`);
  }

  return (
    <div class="center relative min-w-100vw min-h-100vh gap-2 bg-[--background] md:bg-#e1e1e1 ">
      <MagicCurtain.Root>
        <MagicCurtain.Item visibility="visible">
          <DefaultLayout reverse={false}></DefaultLayout>
        </MagicCurtain.Item>
        <MagicCurtain.Item>
          <DefaultLayout reverse={true}></DefaultLayout>
        </MagicCurtain.Item>

        <div
          id="buttons"
          class="hidden md:flex flex-col gap-4 fixed right-0 top-0 lg:translate-x--100% translate-y-25% h-full"
        >
          <Buttons />
        </div>

        <div class="fixed bottom-15 right-10 md:hidden text-white flex flex-col items-end">
          <Show when={expanded()}>
            <div class="flex flex-col gap-4 mb-4">
              <Buttons />
            </div>
          </Show>

          <CVButton
            class="relative center w-12 h-12 opacity-70 hover:opacity-100"
            onClick={() => setExpanded(!expanded())}
          >
            <SvgIcon
              class={cn("absolute w-12 h-12", expanded() && "rotate-180")}
              name="up-arrow"
            ></SvgIcon>
          </CVButton>
        </div>
      </MagicCurtain.Root>
    </div>
  );
};

export default Home;
