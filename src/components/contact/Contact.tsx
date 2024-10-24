import { Show, type Component } from 'solid-js';

import styles from './contact.module.css'

import { SvgIcon } from '@/components/svg';
import { useAppState } from '@/AppContext';

export const Contact: Component = (props) => {
  const context = useAppState()
  const { t } = context
  const cv = () => context.cv
  return (
    <div class={styles.contact}>
      <div class={styles.item}>
        <Show when={!context.isDark}>
          <SvgIcon class={styles.email} name='email' />
        </Show>

        <Show when={context.isDark}>
          <label>{t('home.email')}</label>
        </Show>
        {cv().email}
      </div>

      <div class={styles.item}>
        <Show when={!context.isDark}>
          <SvgIcon class={styles.icon} name="phone" />
        </Show>

        <Show when={context.isDark}>
          <label>{t('home.phone')}</label>
        </Show>
        {cv().phone}
      </div>

      {cv().site && <a class={styles.item} href={cv().site}>
        <Show when={!context.isDark}>
          <SvgIcon class={styles.icon} name="site" />
        </Show>

        {cv().site}
      </a>}
    </div>
  )
}
