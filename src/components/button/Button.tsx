import type { Component, JSX } from 'solid-js';

import styles from './button.module.css'
import { useAppState } from '@/AppContext';
import { cn } from '@/utils';

interface IButton {
  theme: 'light' | 'dark'
  children: JSX.Element
  onClick: () => void
  class?: string
}

export const Button: Component<IButton> = (props) => {
  return (
    <button class={cn(styles[props.theme], styles.button,props.class)} onClick={props.onClick}>
      {props.children}
    </button>
  )
}

interface ICVButton {
  children: JSX.Element
  onClick: () => void
  class?: string
}

export const CVButton: Component<ICVButton> = (props) => {
  const context = useAppState()
  const theme = () => context.isDark ? "dark" : "light"
  return (
    <Button class={props.class} theme={theme()} onClick={props.onClick}>
      {props.children}
    </Button>
  )
}
