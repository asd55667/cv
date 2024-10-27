import { Show, type Component } from "solid-js";

import positive from "./contact.module.css";
import negative from "./contrast.module.css";

import { SvgIcon } from "@/components/svg";
import { useAppState } from "@/AppContext";
import { cn } from "@/utils";
interface IContact {
  reverse: boolean;
}
export const Contact: Component<IContact> = (props) => {
  const context = useAppState();
  const { t } = context;
  const cv = () => context.cv;

  let el: HTMLDivElement | undefined;
  const styles = props.reverse ? negative : positive;
  const isDark = () =>
    (context.isDark && !props.reverse) || (!context.isDark && props.reverse);

  return (
    <div class={styles.contact}>
      <div class={styles.item}>
        <Show when={!isDark()}>
          <SvgIcon class={styles.email} name="email" />
        </Show>

        <Show when={isDark()}>
          <label>{t("home.email")}</label>
        </Show>
        {cv().email}
      </div>

      <div ref={el} class={cn(styles.item, context.spot("phone", el))}>
        <Show when={!isDark()}>
          <SvgIcon class={styles.icon} name="phone" />
        </Show>

        <Show when={isDark()}>
          <label>{t("home.phone")}</label>
        </Show>
        {cv().phone}
      </div>

      {cv().site && !isDark() && (
        <a class={styles.item} href={cv().site}>
          <Show when={!isDark()} fallback={<label>{t("home.site")}</label>}>
            <SvgIcon class={styles.icon} name="site" />
          </Show>

          {cv().site}
        </a>
      )}
    </div>
  );
};
