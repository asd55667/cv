import { type Component } from 'solid-js';

import styles from './education.module.css'

import { LightBlock } from '../block/Block';

interface IEducation {
  //
}


export const Education: Component<IEducation> = (props) => {
  return (
    <LightBlock label="education">
      <div class="flex flex-col justify-center gap-4 lt4">
        <div class="flex flex-col justify-center gap-1">
          <div class="lt2">B.S Arts in Graphic design</div>
          <div>Stanford university</div>

          <div class={styles.date}>2017 - 2020</div>
        </div>

        <div class="flex flex-col justify-center gap-1">
          <div class="lt2">B.S of Design</div>
          <div>Hardvard University</div>

          <div class={styles.date}>2013 - 2017</div>
        </div>
      </div>
    </LightBlock>
  )
}
