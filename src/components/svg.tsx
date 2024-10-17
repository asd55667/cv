import type { Component } from 'solid-js';
import { createMemo } from 'solid-js';


interface ISvg {
  name: string
  class?: string
  color?: string
  prefix?: string
}

export const SvgIcon: Component<ISvg> = (props) => {
  const symbolId = createMemo(() => `#${props.prefix ?? 'icon'}-${props.name}`)

  return (
    <svg aria-hidden="true" class={props.class}>
      <use href={symbolId()} fill={props.color ?? 'none'} />
    </svg>
  )
}
