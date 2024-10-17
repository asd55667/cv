import type { Component, JSX } from 'solid-js';

import styles from './button.module.css'
import { useAppState } from '@/AppContext';

interface IButton {
  theme: 'light' | 'dark'
  children: JSX.Element
  onClick: () => void
}

export const Button: Component<IButton> = (props) => {
  return (
    <button class={styles[props.theme]} onClick={props.onClick}>
      {props.children}
    </button>
  )
}

interface ICVButton {
  children: JSX.Element
  onClick: () => void
}

export const CVButton: Component<ICVButton> = (props) => {
  const context = useAppState()
  const theme = () => context.isDark ? "dark" : "light"
  return (
    <Button theme={theme()} onClick={props.onClick}>
      {props.children}
    </Button>
  )
}
