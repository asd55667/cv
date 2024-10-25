import { Show, type Component } from "solid-js";

import styles from './social.module.css'
import { SvgIcon } from '@/components/svg';
import { useAppState } from '@/AppContext';

export const Social: Component = (props) => {
  const context = useAppState()
  const cv = () => context.cv

  const onWechatClick = () => {
    context.spotlight('phone')
  }

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
            <button class="center" onClick={onWechatClick}><SvgIcon class={styles.icon} name="wechat" /></button>
            <a class='center' href={cv().socials.zhihu}><SvgIcon class={styles.icon} name="zhihu" /></a>
            <a class='center' href={cv().socials.xiaohongshu}><SvgIcon class={styles.icon} name="xiaohongshu" /></a>
            <a class='center' href={cv().socials.douyin}><SvgIcon class={styles.icon} name="tiktok" /></a>
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
            <button class="text-[1em] font-inherit" onClick={onWechatClick}>微信</button>
            <a href={cv().socials.zhihu}>知乎</a>
            <a href={cv().socials.xiaohongshu}>小红书</a>
            <a href={cv().socials.douyin}>抖音</a>
          </Show>
        </Show>
      </div>

    </div>
  )
}
