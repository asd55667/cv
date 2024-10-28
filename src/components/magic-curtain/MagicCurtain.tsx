import {
  Accessor,
  Component,
  createContext,
  createEffect,
  createMemo,
  createSignal,
  JSX,
  onCleanup,
  onMount,
  Setter,
  useContext,
} from "solid-js";

import styles from "./magic-curtain.module.css";

interface MagicCurtainState {
  items: Accessor<MagicCurtainItem[]>;
  setItems: Setter<MagicCurtainItem[]>;
  ref?: HTMLDivElement;
}

const MagicCurtainContext = createContext<MagicCurtainState>(
  {} as MagicCurtainState,
);
export const useMagicCurtainState = () => useContext(MagicCurtainContext);

interface IMagicCurtainItem {
  children?: JSX.Element;
}

const MagicCurtainRoot: Component<IMagicCurtainItem> = (props) => {
  const [items, setItems] = createSignal<MagicCurtainItem[]>([]);
  const [controlsPosition, setControlsPosition] = createSignal({
    left: -9999,
    top: -9999,
  });
  const [isFirefox, setIsFirefox] = createSignal(false);

  let ref: HTMLDivElement | undefined;
  createEffect(() => {
    setIsFirefox(/firefox/i.test(navigator.userAgent));
  });

  const state: MagicCurtainState = {
    items,
    setItems,
    ref,
  };

  return (
    <MagicCurtainContext.Provider value={state}>
      <div
        ref={ref}
        data-is-firefox={isFirefox()}
        class={styles.MagicCurtainRoot}
      >
        {props.children}
      </div>
    </MagicCurtainContext.Provider>
  );
};

type Visibility = "hidden" | "animating-out" | "visible";
interface MagicCurtainItem {
  visibility: Accessor<Visibility>;
  setVisibility: (visibility: Visibility) => void;
  ref?: HTMLDivElement;
}

interface IMagicCurtainItem {
  visibility?: Visibility;
  children?: JSX.Element;
  id?: string
}

const MagicCurtainItem: Component<IMagicCurtainItem> = (props) => {
  const context = useMagicCurtainState();
  let ref: HTMLDivElement | undefined;
  const [visibility, setVisibility] = createSignal<Visibility>(
    props.visibility ?? "hidden",
  );

  let item: MagicCurtainItem;

  onMount(() => {
    item = { ref, visibility, setVisibility };
    context.setItems([...context.items(), item]);
  });

  return (
    <div
      data-visibility={visibility()}
      ref={ref}
      id={props.id}
      class={styles.MagicCurtainItem}
      {...props}
    >
      {visibility() === "hidden" ? null : props.children}
    </div>
  );
};

interface IMagicCurtain {
  onAnimationEnd?: (event: AnimationEvent) => void;
  children?: JSX.Element;
}

const MagicCurtainControl: Component<IMagicCurtain> = (props) => {
  const context = useMagicCurtainState();
  const [upcomingAnimationCallback, setUpcomingAnimationCallback] =
    createSignal<(() => void) | null>(null);

  const [item, setItem] = createSignal<MagicCurtainItem | null>(null);

  const updateItem = () => {
    let newItem = context.items()[1]
    setItem(context.items()[1]);
  }
  onMount(updateItem);

  const hasAnimatingItem = createMemo(
    () =>
      !!context.items().find((value) => value.visibility() === "animating-out"),
  );

  const startAnimation = (clickedItem: MagicCurtainItem) => {
    if (clickedItem.visibility() === "visible") {
      return;
    }

    const itemToHide = context
      .items()
      .find((value) => value.visibility() === "visible");

    const handleAnimationEnd = (event: AnimationEvent) => {
      const isMagicCurtainAnimation = [
        styles["magic-curtain-fade"],
        styles["magic-curtain-clip"],
        styles["magic-curtain-clip-reverse"],
      ].includes(event.animationName);
      console.log(event.animationName);


      if (event.target instanceof HTMLElement && isMagicCurtainAnimation) {
        clickedItem?.setVisibility("hidden");
        itemToHide?.setVisibility("visible");
        updateItem();
        props.onAnimationEnd?.(event);
        (event.target as HTMLElement)!.removeEventListener(
          "animationend",
          handleAnimationEnd,
        );
        upcomingAnimationCallback?.()?.();
      }
    };

    clickedItem.setVisibility("visible");
    itemToHide?.setVisibility("animating-out");

    itemToHide?.ref?.addEventListener("animationend", handleAnimationEnd);
  };

  const onClick = () => {
    if (item()?.visibility() === "visible") {
      return;
    }

    if (hasAnimatingItem()) {
      setUpcomingAnimationCallback((() => {
        startAnimation(item()!);
        setUpcomingAnimationCallback(null);
      }) as never);
    } else {
      startAnimation(item()!);
    }
  };

  return <div onClick={onClick}>{props.children}</div>;
};

export { MagicCurtainRoot as Root };
export { MagicCurtainItem as Item };
export { MagicCurtainControl as Control };
