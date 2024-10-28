import type { Component } from "solid-js";

import { For, Show } from "solid-js";

import positive from "./default.module.css";
import negative from "./contrast.module.css";
import { Contact } from "../contact/Contact";
import { Education } from "../education/Education";
import { CVBlock } from "../block/Block";
import { Experience } from "../experience/Experience";

import { useAppState } from "@/AppContext";
import { Social } from "../social/Social";
import { Info } from "../info/Info";
import { cn } from "@/utils";

interface I {
  class?: string;
  reverse: boolean;
}

export const DefaultLayout: Component<I> = (props) => {
  const context = useAppState();
  const { t } = context;
  const cv = () => context.cv;
  const isEn = () => context.locale === "en";

  const edu = () => {
    let title = t("home.education");
    return !context.isDark ? title.toLowerCase() : title;
  };

  const styles = props.reverse ? negative : positive;
  const isDark = () =>
    (context.isDark && !props.reverse) || (!context.isDark && props.reverse);
  context.setReverse(props.reverse);

  const Intro = () => (
    <CVBlock
      reverse={props.reverse}
      label={
        isDark()
          ? `${t("home.about")}${isEn() ? " " : ""}${cv().name}`
          : t("home.intro")
      }
    >
      <div class={styles.intro}>{cv().intro}</div>
    </CVBlock>
  );

  return (
    <main
      id={props.reverse ? "page-reverse" : "page"}
      class={cn(
        props.class,
        styles.page,
        "pb-10 md:pb-0 h-full md:h-[--page-height]",
      )}
    >
      <header class="flex md:flex-row items-center justify-between">
        <Info reverse={props.reverse} />

        <Show when={!isDark()}>
          <Social class={"social hidden md:flex"} reverse={props.reverse} />
        </Show>

        <Show when={isDark()}>
          <Contact reverse={props.reverse} />
        </Show>
      </header>

      <div class={cn(styles.main, "main flex-col md:flex-row")}>
        <div class={cn(styles.left, "flex-wrap dark:flex-col md:flex-col")}>
          <Show when={!isDark()}>
            <CVBlock
              reverse={props.reverse}
              class={cn("contact-1 order-1 md:order-0 md:flex")}
              label={t("home.contact")}
            >
              <Contact reverse={props.reverse} />
            </CVBlock>
          </Show>

          <Show when={isDark()}>
            <Intro />
          </Show>

          <CVBlock label={edu()} reverse={props.reverse}>
            <Education reverse={props.reverse} />
          </CVBlock>

          <Show when={cv().expertise.length && !isDark()}>
            <CVBlock label={t("home.expertise")} reverse={props.reverse}>
              <div class="flex flex-col justify-center gap-1">
                <For each={cv().expertise}>{(item) => <li>{item}</li>}</For>
              </div>
            </CVBlock>
          </Show>

          <CVBlock
            label={t("home.skill").toLowerCase()}
            reverse={props.reverse}
          >
            <div class="flex flex-col justify-center gap-1">
              <For each={cv().skills}>{(skill) => <li>{skill}</li>}</For>
            </div>
          </CVBlock>
        </div>

        <div
          class={cn(styles.right, "right md:order-0 order--1 md:h-full")}
          data-reverse={props.reverse}
        >
          <Show when={!isDark()}>
            <Intro />
          </Show>

          <CVBlock
            reverse={props.reverse}
            label={
              isDark() ? (
                `${t("home.work")}${isEn() ? " " : ""}${t("home.experience")}`
              ) : (
                <div>
                  {t("home.work").toLowerCase() + (isEn() ? " " : "")}
                  <span class="highlight">
                    {t("home.experience").toLowerCase()}
                  </span>
                </div>
              )
            }
          >
            <div class={styles.exprs}>
              <For each={cv().experience}>
                {(expr) => (
                  <Experience
                    reverse={props.reverse}
                    title={expr.company}
                    position={expr.position}
                    date={expr.date}
                  >
                    {expr.desc}

                    <Show when={expr?.children?.length}>
                      <div class={styles.subExpr}>
                        <For each={expr.children}>
                          {(child) => <li>{child}</li>}
                        </For>
                      </div>
                    </Show>
                  </Experience>
                )}
              </For>
            </div>
          </CVBlock>

          <Show when={isDark()}>
            <Social reverse={props.reverse} />
          </Show>
        </div>

        <Show when={!isDark()}>
          <Social class={"social-m md:hidden flex"} reverse={props.reverse} />
        </Show>
      </div>
    </main>
  );
};
