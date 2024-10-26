import { type JSX, type Component, Show } from "solid-js";

import styles from "./experience.module.css";
import { useAppState } from "@/AppContext";

interface IExperience {
  title: string;
  position: string;
  date: string;
  children: JSX.Element;
}

export const Experience: Component<IExperience> = (props) => {
  const context = useAppState();

  return (
    <div class={styles.expr}>
      <div class={styles.title}>
        {props.title}
        <Show when={context.isDark && context.locale === "en"}>
          <span class={styles.date}>{props.date}</span>
        </Show>
      </div>

      <div class={styles.row2}>
        <span class={styles.position}>{props.position}</span>

        <Show when={!context.isDark || context.locale === "zh-cn"}>
          <span class={styles.date}>{props.date}</span>
        </Show>
      </div>

      <div>{props.children}</div>
    </div>
  );
};
