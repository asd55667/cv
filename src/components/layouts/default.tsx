import type { Component } from "solid-js";

import { For, Show } from "solid-js";

import styles from "./default.module.css";
import { Contact } from "../contact/Contact";
import { Education } from "../education/Education";
import { CVBlock } from "../block/Block";
import { Experience } from "../experience/Experience";

import { useAppState } from "@/AppContext";
import { Social } from "../social/Social";
import { Info } from "../info/Info";
import { cn } from "@/utils";

export const DefaultLayout: Component = (props) => {
  const context = useAppState();
  const { t } = context;
  const cv = () => context.cv;
  const isEn = () => context.locale === "en";

  const edu = () => {
    let title = t("home.education");
    return !context.isDark ? title.toLowerCase() : title;
  };

  const Intro = () => (
    <CVBlock
      class=""
      label={
        context.isDark
          ? `${t("home.about")}${isEn() ? " " : ""}${cv().name}`
          : t("home.intro")
      }
    >
      <div class={styles.intro}>{cv().intro}</div>
    </CVBlock>
  );

  return (
    <main
      id="page"
      class={cn(styles.page, "pb-10 md:pb-0 h-full md:h-[--page-height]")}
    >
      <header class="flex md:flex-row items-center justify-between">
        <Info />

        <Show when={!context.isDark}>
          <Social class={'social hidden md:flex'} />
        </Show>

        <Show when={context.isDark}>
          <Contact />
        </Show>
      </header>

      <div class={cn(styles.main, "main flex-col md:flex-row")}>
        <div class={cn(styles.left, "flex-wrap dark:flex-col md:flex-col")}>
          <Show when={!context.isDark}>
            <CVBlock
              class={cn("contact-1 order-1 md:order-0 md:flex")}
              label={t("home.contact")}
            >
              <Contact />
            </CVBlock>
          </Show>

          <Show when={context.isDark}>
            <Intro />
          </Show>

          <CVBlock label={edu()}>
            <Education educations={cv().educations} />
          </CVBlock>

          <Show when={cv().expertise.length && !context.isDark}>
            <CVBlock label={t("home.expertise")}>
              <div class="flex flex-col justify-center gap-1">
                <For each={cv().expertise}>{(item) => <li>{item}</li>}</For>
              </div>
            </CVBlock>
          </Show>

          <CVBlock label={t("home.skill").toLowerCase()}>
            <div class="flex flex-col justify-center gap-1">
              <For each={cv().skills}>{(skill) => <li>{skill}</li>}</For>
            </div>
          </CVBlock>
        </div>

        <div class={cn(styles.right, "right md:order-0 order--1 md:h-full")}>
          <Show when={!context.isDark}>
            <Intro />
          </Show>

          <CVBlock
            label={
              context.isDark ? (
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

          <Show when={context.isDark}>
            <Social />
          </Show>
        </div>

        <Show when={!context.isDark}>
          <Social class={'social-m md:hidden flex'} />
        </Show>
      </div>
    </main>
  );
};
