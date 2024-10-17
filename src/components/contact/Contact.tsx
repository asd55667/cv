import { Show, type Component } from 'solid-js';

import styles from './contact.module.css'

import { SvgIcon } from '@/components/svg';
import { useAppState } from '@/AppContext';

interface IContact {
  email: string;
  phone: string;
  site: string;
}

export const Contact: Component<IContact> = (props) => {
  const context = useAppState()
  const { t } = context
  return (
    <div class={styles.contact}>
      <div class={styles.item}>
        <Show when={!context.isDark}>
          <SvgIcon class={styles.email} name='email' />
        </Show>

        <Show when={context.isDark}>
          <label>{t('home.email')}</label>
        </Show>
        {props.email}
      </div>

      <div class={styles.item}>
        <Show when={!context.isDark}>
          <SvgIcon class={styles.icon} name="phone" />
        </Show>

        <Show when={context.isDark}>
          <label>{t('home.phone')}</label>
        </Show>
        {props.phone}
      </div>

      {props.site && <div class={styles.item}>
        <Show when={!context.isDark}>
          <SvgIcon class={styles.icon} name="site" />
        </Show>

        {props.site}
      </div>}
    </div>
  )
}
