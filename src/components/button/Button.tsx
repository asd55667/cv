import type { Component, JSX } from "solid-js";

import styles from "./button.module.css";
import { useAppState } from "@/AppContext";
import { cn } from "@/utils";

interface IButton {
  theme: "light" | "dark";
  children: JSX.Element;
  onClick: (e: MouseEvent) => void;
  class?: string;
  disabled?: boolean;
}

export const Button: Component<IButton> = (props) => {
  return (
    <button
      class={cn(styles[props.theme], styles.button, props.class)}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

interface ICVButton {
  children: JSX.Element;
  onClick: (e: MouseEvent) => void;
  class?: string;
  disabled?: boolean;
}

export const CVButton: Component<ICVButton> = (props) => {
  const context = useAppState();
  const theme = () => (context.isDark ? "dark" : "light");
  return (
    <Button
      class={props.class}
      theme={theme()}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </Button>
  );
};
