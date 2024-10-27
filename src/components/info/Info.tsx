import { createEffect, createSignal, type Component } from "solid-js";

import styles from "./info.module.css";
import { SvgIcon } from "@/components/svg";
import { useAppState } from "@/AppContext";
import { cn } from "@/utils";

export const Info: Component = (props) => {
  const context = useAppState();
  const cv = () => context.cv;

  let el: HTMLDivElement | undefined;

  const [hideSpan, setHideSpan] = createSignal(false);

  createEffect(() => !!context.locale && setHideSpan(false));

  const animatedSpanClass = () =>
    cn(styles[context.locale], hideSpan() && "hidden", "dark:hidden");

  const onAnimationEnd = () => {
    if (context.locale === "zh-cn" || context.isDark) setHideSpan(true);
  };

  return (
    <div class="flex items-center justify-between gap-4">
      <div id="avatar" class={styles.avatar}>
        <SvgIcon name="avatar"></SvgIcon>
      </div>

      <div class={styles.name}>
        <div class={cn(styles.line, "dark:hidden")}></div>

        <div ref={el} class={cn(context.isDark && context.spot("", el))}>
          <span class={animatedSpanClass()} onanimationend={onAnimationEnd}>
            i’m{" "}
          </span>
          {cv().name}
          <span class={animatedSpanClass()} onanimationend={onAnimationEnd}>
            ,{" "}
          </span>
        </div>

        <div class="whitespace-pre">
          <span class={animatedSpanClass()} onanimationend={onAnimationEnd}>
            a{" "}
          </span>
          <span class={styles.position}>{cv().position}</span>
          <span class={animatedSpanClass()} onanimationend={onAnimationEnd}>
            .
          </span>
        </div>
      </div>
    </div>
  );
};
