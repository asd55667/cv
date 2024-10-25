import { Show, type Component } from "solid-js";

import styles from './info.module.css'
import { SvgIcon } from '@/components/svg';
import { useAppState } from '@/AppContext';

export const Info: Component = (props) => {
  const context = useAppState()
  const cv = () => context.cv

  let el: HTMLDivElement | undefined

  return (
    <div class='flex items-center justify-between gap-4'>
      <div id="avatar" class={styles.avatar}>
        <SvgIcon name='avatar'></SvgIcon>
      </div>

      <div class={styles.name}>
        <Show when={!context.isDark}><div class={styles.line}></div></Show>

        <div ref={el} class={context.spot('', el)}>
          <Show when={!context.isDark && context.locale === 'en'}><span>i’m </span></Show>
          {cv().name}
          <Show when={!context.isDark && context.locale === 'en'}><span>, </span></Show>
        </div>

        <div class="whitespace-pre">
          <Show when={!context.isDark && context.locale === 'en'}><span>a </span></Show>
          <span class={styles.position}>{cv().position}</span>
          <Show when={!context.isDark && context.locale === 'en'}><span>.</span></Show>
        </div>
      </div>
    </div>
  )
}
