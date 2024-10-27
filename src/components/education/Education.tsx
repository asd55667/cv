import { type Component } from "solid-js";

import { For } from "solid-js";

import positive from "./education.module.css";
import negative from "./contrast.module.css";

import { useAppState } from "@/AppContext";

interface IEducation {
  reverse: boolean;
}

export const Education: Component<IEducation> = (props) => {
  const context = useAppState();
  const cv = () => context.cv;
  const styles = props.reverse ? negative : positive;

  return (
    <div class={styles.edus}>
      <For each={cv().educations}>
        {(edu) => (
          <div class={styles.edu}>
            <div class={styles.major}>{edu.major}</div>
            <div class={styles.school}>{edu.school}</div>

            <div class={styles.date}>{edu.date}</div>
          </div>
        )}
      </For>
    </div>
  );
};
