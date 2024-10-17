import { Show, type Component } from "solid-js";

import styles from './social.module.css'
import { SvgIcon } from '@/components/svg';
import { useAppState } from '@/AppContext';

export const Social: Component = (props) => {
  const context = useAppState()
  const cv = () => context.cv

  return (
    <div class='flex flex-col justify-end'>
      <div class={styles.id}>@{cv().id}</div>

      <div class={styles.socials}>
        <Show when={!context.isDark}>
          <SvgIcon class={styles.icon} name="facebook" />
          <SvgIcon class={styles.icon} name="twitter" />
          <SvgIcon class={styles.icon} name="instagram" />
          <SvgIcon class={styles.icon} name="dribbble" />
          <SvgIcon class={styles.icon} name="linkedin" />
          <SvgIcon class={styles.icon} name="behance" />
        </Show>

        <Show when={context.isDark}>
          <div>Twitter</div>
          <div>Facebook</div>
          <div>Instagram</div>
        </Show>
      </div>

    </div>
  )
}
