import { type JSX, type Component } from 'solid-js';
import styles from './block.module.css'

import { useAppState } from '@/AppContext';
interface IBlock {
  theme: 'light' | 'dark'
  label: JSX.Element
  children: JSX.Element
}

export const Block: Component<IBlock> = (props) => {
  return (
    <div class={styles[props.theme]}>
      <div class={styles.title}>{props.label}</div>
      <div class={styles.block}>
        {props.children}
      </div>
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
    <Block theme={theme()} label={props.label}>
      {props.children}
    </Block>
  )
}
