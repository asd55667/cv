import type { Component } from 'solid-js';

import { For, Show } from 'solid-js';

import styles from './default.module.css'
import { Contact } from '../contact/Contact';
import { Education } from '../education/Education';
import { CVBlock } from '../block/Block';
import { Experience } from '../experience/Experience';

import { useAppState } from '@/AppContext';
import { Social } from '../social/Social';
import { Info } from '../info/Info';

export const DefaultLayout: Component = (props) => {
  const context = useAppState()
  const { t } = context
  const cv = () => context.cv
  const isEn = () => context.locale === 'en'

  const edu = () => {
    let title = t("home.education")
    return !context.isDark ? title.toLowerCase() : title
  }

  return (
    <main class={styles.page}>
      <header class='flex items-center justify-between'>
        <Info />

        <Show when={!context.isDark}>
          <Social />
        </Show>

        <Show when={context.isDark}>
          <Contact email={cv().email} phone={cv().phone} site={cv().site} />
        </Show>
      </header>

      <div class={styles.main}>
        <div class={styles.left}>
          <Show when={!context.isDark}>
            <CVBlock label={t('home.contact')}>
              <Contact email={cv().email} phone={cv().phone} site={cv().site} />
            </CVBlock>
          </Show>

          <Show when={context.isDark}>
            <CVBlock label={`${t('home.about')}${isEn() ? ' ' : ''}${cv().name}`}>
              <div class={styles.intro}>{cv().intro}</div>
            </CVBlock>
          </Show>

          <CVBlock label={edu()}>
            <Education educations={cv().educations} />
          </CVBlock>

          <Show when={cv().expertise.length && !context.isDark}>
            <CVBlock label={t("home.expertise")}>
              <div class="flex flex-col justify-center gap-1">
                <For each={cv().expertise}>
                  {(item) => (<li>{item}</li>)}
                </For>
              </div>
            </CVBlock>
          </Show>

          <Show when={!context.isDark}>
            <CVBlock label={t('home.skill').toLowerCase()}>
              <div class="flex flex-col justify-center gap-1">
                <For each={cv().skills}>
                  {(skill) => (
                    <li>{skill}</li>
                  )}
                </For>
              </div>
            </CVBlock>
          </Show>

          <Show when={context.isDark}>
            <Social />
          </Show>
        </div>

        <div class={styles.right}>
          <Show when={!context.isDark}>
            <CVBlock label={t("home.intro")}>
              <div class={styles.intro}>{cv().intro}</div>
            </CVBlock>
          </Show>

          <CVBlock
            label={
              context.isDark ? `${t('home.work')}${isEn() ? ' ' : ''}${t('home.experience')}` :
                <div>{t('home.work').toLowerCase() + (isEn() ? ' ' : '')}<span class='highlight'>{t("home.experience").toLowerCase()}</span></div>
            }
          >
            <div class={styles.exprs}>
              <For each={cv().experience}>
                {(expr) => (
                  <Experience title={expr.company} position={expr.position} date={expr.date}>
                    {expr.desc}
                  </Experience>
                )}
              </For>
            </div>
          </CVBlock>

          <Show when={context.isDark}>
            <CVBlock label={t('home.skill')}>
              <div class="flex flex-col justify-center gap-1">
                <For each={cv().skills}>
                  {(skill) => (
                    <li>{skill}</li>
                  )}
                </For>
              </div>
            </CVBlock>
          </Show>
        </div>
      </div>
    </main>
  )
}
