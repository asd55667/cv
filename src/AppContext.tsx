import * as i18n from "@solid-primitives/i18n";
import * as storage from "@solid-primitives/storage";
import {
  ParentComponent,
  Suspense,
  createContext,
  createEffect,
  createResource,
  createSignal,
  startTransition,
  useContext,
} from "solid-js";
import { createStore } from "solid-js/store";
import { Meta, Title } from "@solidjs/meta";

// en dictionary is loaded by default
import { dict as en_dict } from "../lang/en/en";

import en_base_cv from "../cv/shared/base/en.json";
import { setCssVariable } from "./utils";

type RawDictionary = typeof en_dict;
type TypeCV = typeof en_base_cv;

export type Locale = "en" | "zh-cn";
export const CV_YEARS = ["2024", "2026"] as const;
export type CVYear = (typeof CV_YEARS)[number];
const LATEST_CV_YEAR: CVYear = CV_YEARS[CV_YEARS.length - 1];

/*
for validating of other dictionaries have same keys as en dictionary
some might be missing, but the shape should be the same
*/
type DeepPartial<T> =
  T extends readonly (infer U)[]
    ? DeepPartial<U>[]
    : T extends (infer U)[]
      ? DeepPartial<U>[]
      :
  T extends Record<string, unknown>
    ? { [K in keyof T]?: DeepPartial<T[K]> }
    : T;

const raw_dict_map: Record<
  Locale,
  () => Promise<{ dict: DeepPartial<RawDictionary> }>
> = {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-explicit-any
  en: () => null as any, // en is loaded by default
  "zh-cn": () => import("../lang/zh-cn/zh-cn"),
};

type CVTheme = "light" | "dark";
type CVOption = `${CVTheme}_${Locale}_${CVYear}`;
type ThemeOption = `${CVTheme}_${Locale}`;
type CVPatch = DeepPartial<TypeCV>;

const cv_base_map: Record<Locale, () => Promise<TypeCV>> = {
  en: () => Promise.resolve(en_base_cv),
  "zh-cn": () => import("../cv/shared/base/zh-cn.json"),
};

const cv_theme_map: Partial<Record<ThemeOption, () => Promise<CVPatch>>> = {
  light_en: () => import("../cv/shared/theme/light/en.json"),
};

const cv_year_map: Record<CVOption, () => Promise<CVPatch>> = {
  light_en_2024: () => import("../cv/light/2024/en.json"),
  dark_en_2024: () => import("../cv/dark/2024/en.json"),
  "light_zh-cn_2024": () => import("../cv/light/2024/zh-cn.json"),
  "dark_zh-cn_2024": () => import("../cv/dark/2024/zh-cn.json"),
  light_en_2026: () => import("../cv/light/2026/en.json"),
  dark_en_2026: () => import("../cv/dark/2026/en.json"),
  "light_zh-cn_2026": () => import("../cv/light/2026/zh-cn.json"),
  "dark_zh-cn_2026": () => import("../cv/dark/2026/zh-cn.json"),
};

export type Dictionary = i18n.Flatten<RawDictionary>;

const en_flat_dict: Dictionary = i18n.flatten(en_dict);

async function fetchDictionary(locale: Locale): Promise<Dictionary> {
  if (locale === "en") return en_flat_dict;

  const { dict } = await raw_dict_map[locale]();
  const flat_dict = i18n.flatten(dict) as RawDictionary;
  return { ...en_flat_dict, ...flat_dict };
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  !!value && typeof value === "object" && !Array.isArray(value);

function mergeCV<T>(base: T, patch?: DeepPartial<T>): T {
  if (patch === undefined) return base;

  if (Array.isArray(base) && Array.isArray(patch)) {
    const merged = [...base] as unknown[];
    patch.forEach((item, index) => {
      if (item === undefined) return;
      const prev = merged[index];
      merged[index] =
        isRecord(prev) && isRecord(item)
          ? mergeCV(prev, item as DeepPartial<typeof prev>)
          : (item as unknown);
    });
    merged.length = patch.length;
    return merged as T;
  }

  if (isRecord(base) && isRecord(patch)) {
    const merged: Record<string, unknown> = { ...base };
    Object.entries(patch).forEach(([key, value]) => {
      if (value === undefined) return;
      const prev = merged[key];
      merged[key] =
        Array.isArray(prev) && Array.isArray(value)
          ? mergeCV(prev, value)
          :
        isRecord(prev) && isRecord(value)
          ? mergeCV(prev, value as DeepPartial<typeof prev>)
          : (value as unknown);
    });
    return merged as T;
  }

  return patch as T;
}

async function fetchCV(key: CVOption): Promise<TypeCV> {
  const [theme, locale] = key.split("_") as [CVTheme, Locale, CVYear];
  const themeKey = `${theme}_${locale}` as ThemeOption;

  const [baseCV, themePatch, yearPatch] = await Promise.all([
    cv_base_map[locale](),
    cv_theme_map[themeKey]?.() ?? Promise.resolve({}),
    cv_year_map[key](),
  ]);

  return mergeCV(mergeCV(baseCV, themePatch), yearPatch);
}

// Some browsers does not map correctly to some locale code
// due to offering multiple locale code for similar language (e.g. tl and fil)
// This object maps it to correct `langs` key
const LANG_ALIASES: Partial<Record<string, Locale>> = {
  fil: "en",
};

const toLocale = (string: string): Locale | undefined =>
  string in raw_dict_map
    ? (string as Locale)
    : string in LANG_ALIASES
      ? (LANG_ALIASES[string] as Locale)
      : undefined;

const toCVYear = (value: unknown): CVYear | undefined =>
  typeof value === "string" &&
  CV_YEARS.includes(value as CVYear)
    ? (value as CVYear)
    : undefined;

interface Settings {
  locale: Locale;
  dark: boolean;
  year: CVYear;
}

function initialLocale(location: Location): Locale {
  let locale: Locale | undefined;

  locale = toLocale(location.pathname);
  if (locale) return locale;

  locale = toLocale(navigator.language.slice(0, 2));
  if (locale) return locale;

  locale = toLocale(navigator.language.toLocaleLowerCase());
  if (locale) return locale;

  return "en";
}

function initialSettings(location: Location): Settings {
  return {
    locale: initialLocale(location),
    dark: window.matchMedia("(prefers-color-scheme: dark)").matches,
    year: LATEST_CV_YEAR,
  };
}

function deserializeSettings(value: string, location: Location): Settings {
  const parsed = JSON.parse(value) as unknown;
  if (!parsed || typeof parsed !== "object") return initialSettings(location);

  return {
    locale:
      ("locale" in parsed &&
        typeof parsed.locale === "string" &&
        toLocale(parsed.locale)) ||
      initialLocale(location),
    dark:
      "dark" in parsed && typeof parsed.dark === "boolean"
        ? parsed.dark
        : false,
    year: ("year" in parsed && toCVYear(parsed.year)) || LATEST_CV_YEAR,
  };
}
type SpotlightEvent = "phone" | "";
interface AppState {
  get isDark(): boolean;
  setDark(value: boolean): void;
  get locale(): Locale;
  get cvYear(): CVYear;
  get cvYears(): readonly CVYear[];
  setCVYear(value: CVYear): void;
  get prevLocale(): Locale | undefined;
  get themeSwitching(): Locale | undefined;
  setThemeSwitching(value: boolean): void;
  setLocale(value: Locale): void;
  t: i18n.Translator<Dictionary>;
  spotlight(event: SpotlightEvent, timeout?: number): void;
  spot(
    event: SpotlightEvent,
    el?: HTMLElement,
  ): "" | "spotlight" | "spotlight-contrast";
  setReverse(bool: boolean): void;
  get reverse(): boolean;
  get spotPos(): [number, number];
  get dir(): "ltr" | "rtl";
  get cv(): TypeCV;
}

const AppContext = createContext<AppState>({} as AppState);

export const useAppState = () => useContext(AppContext);

export const AppContextProvider: ParentComponent = (props) => {
  const now = new Date();
  const cookieOptions: storage.CookieOptions = {
    expires: new Date(now.getFullYear() + 1, now.getMonth(), now.getDate()),
  };

  const [settings, set] = storage.makePersisted(
    createStore(initialSettings(location)),
    {
      storageOptions: cookieOptions,
      storage: storage.cookieStorage,
      deserialize: (value) => deserializeSettings(value, location),
    },
  );
  const [spotEvent, setSpotEvent] = createSignal<SpotlightEvent>("");

  const locale = () => settings.locale;

  const cv_option = (): CVOption => {
    const theme = settings.dark ? "dark" : "light";
    return `${theme}_${locale()}_${settings.year}`;
  };

  const [dict] = createResource(locale, fetchDictionary, {
    initialValue: en_flat_dict,
  });

  const [curCV] = createResource(cv_option, fetchCV, {
    initialValue: en_base_cv,
  });

  createEffect(() => {
    document.documentElement.lang = settings.locale;
  });

  createEffect(() => {
    if (settings.dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  });

  if (
    navigator.userAgent.indexOf("Safari") !== -1 &&
    navigator.userAgent.indexOf("Chrome") === -1
  ) {
    document.documentElement.classList.add("safari");
  }

  const t = i18n.translator(dict, i18n.resolveTemplate);

  const [prevLocale, setPrevLocale] = createSignal<Locale | undefined>();
  const [themeSwitching, setThemeSwitching] = createSignal<
    Locale | undefined
  >();

  let reverse = false;
  let _spotPos: [number, number] = [0, 0];
  const state: AppState = {
    get isDark() {
      return settings.dark;
    },
    setDark(value) {
      set("dark", value);
    },
    get locale() {
      return settings.locale;
    },
    get cvYear() {
      return settings.year;
    },
    get cvYears() {
      return CV_YEARS;
    },
    setCVYear(value) {
      set("year", value);
    },
    get prevLocale() {
      return prevLocale();
    },
    get themeSwitching() {
      return themeSwitching();
    },
    setThemeSwitching,
    setLocale(value) {
      setPrevLocale(this.locale);
      void startTransition(() => {
        set("locale", value);
      });
    },
    spotlight(event, timeout = 2e3) {
      setSpotEvent(event);
      setTimeout(() => {
        setSpotEvent("");
      }, timeout);
    },
    spot(event, el) {
      if (spotEvent() === event && el) {
        const {
          offsetLeft: x,
          offsetTop: y,
          offsetWidth: w,
          offsetHeight: h,
        } = el;
        // console.log(x, y, w, h, el);
        const left =
          document.documentElement.scrollLeft || document.body.scrollLeft;
        const top =
          document.documentElement.scrollTop || document.body.scrollTop;
        _spotPos = [x + w / 2 - left, y + h / 2 - top];
        setCssVariable("--spotlight-x", `${_spotPos[0]}`);
        setCssVariable("--spotlight-y", `${_spotPos[1]}`);
      }

      return spotEvent() === event
        ? reverse
          ? "spotlight-contrast"
          : "spotlight"
        : "";
    },
    setReverse(bool: boolean) {
      reverse = bool;
    },
    get reverse() {
      return reverse;
    },
    get spotPos() {
      return _spotPos;
    },
    t,
    get dir() {
      return t("global.dir") === "ltr" ? "ltr" : "rtl";
    },
    get cv() {
      return curCV.latest;
    },
  };

  return (
    <Suspense>
      <AppContext.Provider value={state}>
        <Title>{t("global.title")}</Title>
        <Meta name="lang" content={locale()} />
        <div class="center min-w-100vw min-h-100vh" dir={state.dir}>
          {props.children}
        </div>
      </AppContext.Provider>
    </Suspense>
  );
};
