import { type Component } from 'solid-js';

import styles from './contact.module.css'

import { SvgIcon } from '@/components/svg';
import { LightBlock } from '../block/Block';

interface IContact {
  // email: string;
  // phone: string;
  // site: string;
}

export const Contact: Component<IContact> = (props) => {
  return (
    <LightBlock label='contact'>
      <div class={styles.item}>
        <SvgIcon class={styles.email} name='email' />
        contact@johnmoore.com
      </div>

      <div class={styles.item}>
        <SvgIcon class={styles.icon} name="phone" />
        +1 (450) 780 9317
      </div>

      <div class={styles.item}>
        <SvgIcon class={styles.icon} name="site" />
        www.johncarter.com
      </div>
    </LightBlock>
  )
}
