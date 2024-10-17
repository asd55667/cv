import { Show, type Component } from "solid-js";

import styles from './info.module.css'
import { SvgIcon } from '@/components/svg';
import { useAppState } from '@/AppContext';

export const Info: Component = (props) => {
  const context = useAppState()
  const cv = () => context.cv

  return (
    <div class='flex items-center justify-between gap-4'>
      <div class={styles.avatar}>
        <SvgIcon name='avatar'></SvgIcon>
      </div>

      <div class={styles.name}>
        <div>
          <Show when={!context.isDark}><span>i’m </span></Show>
          {cv().name}
          <Show when={!context.isDark}><span>, </span></Show>
        </div>

        <div>
          <Show when={!context.isDark}><span>a </span></Show>
          <span class={styles.position}>{cv().position}</span>
          <Show when={!context.isDark}><span>.</span></Show>
        </div>
      </div>
    </div>
  )
}
