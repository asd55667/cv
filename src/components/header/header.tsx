import type { Component } from 'solid-js';

import styles from './header.module.css'
import { SvgIcon } from '@/components/svg';

const Header: Component = () => {
  return (
    <header class='flex items-center justify-between'>
      <div class='flex items-center justify-between gap-4'>
        <div class={styles.avatar}>
          <SvgIcon name='avatar'></SvgIcon>
        </div>

        <div class={styles.title}>
          <div>i’m john moore,</div>

          <div>
            a <span class='highlight'>digital designer.</span>
          </div>
        </div>
      </div>

      <div class='flex flex-col justify-end'>
        <div class={styles.id}>@johnmoore</div>

        <div class="flex items-center w-full">
          <SvgIcon class={styles.icon} name="facebook" />
          <SvgIcon class={styles.icon} name="twitter" />
          <SvgIcon class={styles.icon} name="instagram" />
          <SvgIcon class={styles.icon} name="dribbble" />
          <SvgIcon class={styles.icon} name="linkedin" />
          <SvgIcon class={styles.icon} name="behance" />
        </div>
      </div>
    </header>
  );
};

export default Header;
