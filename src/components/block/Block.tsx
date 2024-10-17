import { type JSX, type Component } from 'solid-js';
import styles from './block.module.css'

import { useAppState } from '@/AppContext';
interface IBlock {
  label: JSX.Element;
  class?: string;
  children?: JSX.Element;
}

export const Block: Component<IBlock> = (props) => {
  return (
    <div class={props?.class}>
      <div class='lt1'>
        {props.label}
      </div>

      {props.children}
    </div>
  );
}

interface ICVBlock {
  label: JSX.Element
  children: JSX.Element
}
export const CVBlock: Component<ICVBlock> = (props) => {
  const context = useAppState()
  const theme = () => context.isDark ? "dark" : "light"

  return (
    <div class={styles[theme()]}>
      <div class={styles.title}>{props.label}</div>
      <div class={styles.block}>
        {props.children}
      </div>
    </div>
  )
}
