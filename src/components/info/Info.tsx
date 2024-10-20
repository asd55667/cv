import { Show, type Component } from "solid-js";

import styles from './info.module.css'
import { SvgIcon } from '@/components/svg';
import { useAppState } from '@/AppContext';

export const Info: Component = (props) => {
  const context = useAppState()
  const cv = () => context.cv

  return (
    <div class='flex items-center justify-between gap-4'>
      <div id="avatar" class={styles.avatar}>
        <SvgIcon name='avatar'></SvgIcon>
      </div>

      <div class={styles.name}>
        <div>
          <Show when={!context.isDark && context.locale === 'en'}><span>i’m </span></Show>
          {cv().name}
          <Show when={!context.isDark && context.locale === 'en'}><span>, </span></Show>
        </div>

        <div>
          <Show when={!context.isDark && context.locale === 'en'}><span>a </span></Show>
          <span class={styles.position}>{cv().position}</span>
          <Show when={!context.isDark && context.locale === 'en'}><span>.</span></Show>
        </div>
      </div>
    </div>
  )
}
