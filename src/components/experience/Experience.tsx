import { type JSX, type Component, Show } from "solid-js";

import positive from "./experience.module.css";
import negative from "./contrast.module.css";
import { useAppState } from "@/AppContext";

interface IExperience {
  title: string;
  position: string;
  date: string;
  children: JSX.Element;
  reverse: boolean
}

export const Experience: Component<IExperience> = (props) => {
  const context = useAppState();
  const styles = props.reverse ? negative : positive
  const isDark = () => context.isDark && !props.reverse || !context.isDark && props.reverse

  return (
    <div class={styles.expr}>
      <div class={styles.title}>
        {props.title}
        <Show when={isDark() && context.locale === "en"}>
          <span class={styles.date}>{props.date}</span>
        </Show>
      </div>

      <div class={styles.row2}>
        <span class={styles.position}>{props.position}</span>

        <Show when={!isDark() || context.locale === "zh-cn"}>
          <span class={styles.date}>{props.date}</span>
        </Show>
      </div>

      <div>{props.children}</div>
    </div>
  );
};
