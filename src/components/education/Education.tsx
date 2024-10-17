import { type Component } from 'solid-js';

import { For } from 'solid-js';

import styles from './education.module.css'

import { useAppState } from '@/AppContext';

interface IEducation {
  educations: {
    major: string;
    school: string;
    date: string;
  }[]
}

export const Education: Component<IEducation> = (props) => {
  const context = useAppState()

  return (
    <div class={styles.edus}>
      <For each={props.educations}>
        {(edu) => (
          <div class={styles.edu}>
            <div class={styles.major}>{edu.major}</div>
            <div class={styles.school}>{edu.school}</div>

            <div class={styles.date}>{edu.date}</div>
          </div>
        )}
      </For>
    </div>
  )
}
