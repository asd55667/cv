import { type JSX, type Component } from 'solid-js';



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


interface ILightBlock {
  label: JSX.Element
  children: JSX.Element;
}

// typeof props.label === 'string' ? props.label : <props.label />
export const LightBlock: Component<ILightBlock> = (props) => {
  return (
    <Block
      class="w-full flex flex-col gap-4 text-black"
      label={props.label}
    >
      <div class="flex flex-col justify-center gap-4 lt4">
        {props.children}
      </div>
    </Block >
  )
}

interface IDarkBlock {
  label: string
  children: JSX.Element;
}


export const DarkBlock: Component<IDarkBlock> = (props) => {
  return (
    <Block
      class='w-62 flex flex-col gap-1 font-normal leading-5 text-left text-white'
      label={
        <div class="pb-14px ">
          {props.label}
        </div>
      }
    >
      {props.children}
    </Block >
  )
}
