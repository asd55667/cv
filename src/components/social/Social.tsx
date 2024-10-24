import { Show, type Component } from "solid-js";

import styles from './social.module.css'
import { SvgIcon } from '@/components/svg';
import { useAppState } from '@/AppContext';

export const Social: Component = (props) => {
  const context = useAppState()
  const cv = () => context.cv

  return (
    <div class='social hidden md:flex flex-col justify-end'>
      <div class={styles.id}>@{cv().id}</div>

      <div class={styles.socials}>
        <Show when={!context.isDark}>
          <Show when={context.locale === 'en'}>
            <a href={cv().socials.github}><SvgIcon class={styles.icon} name="github-circle" /></a>
            <SvgIcon class={styles.icon} name="facebook" />
            <SvgIcon class={styles.icon} name="twitter" />
            <SvgIcon class={styles.icon} name="instagram" />
            {/* <SvgIcon class={styles.icon} name="dribbble" /> */}
            <SvgIcon class={styles.icon} name="linkedin" />
            <SvgIcon class={styles.icon} name="behance" />
          </Show>

          <Show when={context.locale === 'zh-cn'}>
            <a href={cv().socials.github}><SvgIcon class={styles.icon} name="github" /></a>
            <SvgIcon class={styles.icon} name="wechat" />
            <SvgIcon class={styles.icon} name="zhihu" />
            <SvgIcon class={styles.icon} name="xiaohongshu" />
            <SvgIcon class={styles.icon} name="tiktok" />
          </Show>
        </Show>

        <Show when={context.isDark}>
          <Show when={context.locale === 'en'}>
            <a href={cv().socials.github}>Github</a>
            <div>Twitter</div>
            <div>Facebook</div>
            <div>Instagram</div>
            <div>TikToc</div>
          </Show>

          <Show when={context.locale === 'zh-cn'}>
            <a href={cv().socials.github}>代码仓库</a>
            <div>微信</div>
            <div>知乎</div>
            <div>小红书</div>
            <div>抖音</div>
          </Show>
        </Show>
      </div>

    </div>
  )
}
