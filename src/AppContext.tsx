import * as i18n from '@solid-primitives/i18n';
import * as storage from '@solid-primitives/storage';
import {
  ParentComponent,
  Suspense,
  createContext,
  createEffect,
  createResource,
  startTransition,
  useContext,
} from 'solid-js';
import { createStore } from 'solid-js/store';
import { Meta, Title } from '@solidjs/meta';

// en dictionary is loaded by default
import { dict as en_dict } from '../lang/en/en';

import en_light_cv from '../cv/light/en.json'

type RawDictionary = typeof en_dict;
type TypeCV = typeof en_light_cv

export type Locale =
  | 'en'
  | 'zh-cn';

/*
for validating of other dictionaries have same keys as en dictionary
some might be missing, but the shape should be the same
*/
type DeepPartial<T> =
  T extends Record<string, unknown> ? { [K in keyof T]?: DeepPartial<T[K]> } : T;

const raw_dict_map: Record<Locale, () => Promise<{ dict: DeepPartial<RawDictionary> }>> = {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-explicit-any
  en: () => null as any, // en is loaded by default
  'zh-cn': () => import('../lang/zh-cn/zh-cn'),
};

type CVOption = `light_${Locale}` | `dark_${Locale}`

const cv_map: Record<CVOption, () => Promise<TypeCV>> = {
  'light_en': () => import('../cv/light/en.json'),
  'dark_en': () => import('../cv/dark/en.json'),
  "light_zh-cn": () => import('../cv/light/zh-cn.json'),
  "dark_zh-cn": () => import('../cv/dark/zh-cn.json'),
}

export type Dictionary = i18n.Flatten<RawDictionary>;

const en_flat_dict: Dictionary = i18n.flatten(en_dict);

async function fetchDictionary(locale: Locale): Promise<Dictionary> {
  if (locale === 'en') return en_flat_dict;

  const { dict } = await raw_dict_map[locale]();
  const flat_dict = i18n.flatten(dict) as RawDictionary;
  return { ...en_flat_dict, ...flat_dict };
}


async function fetchCV(key: CVOption): Promise<TypeCV> {
  if (key === 'light_en') return en_light_cv

  const cv = await cv_map[key]()

  return { ...en_light_cv, ...cv }
}



// Some browsers does not map correctly to some locale code
// due to offering multiple locale code for similar language (e.g. tl and fil)
// This object maps it to correct `langs` key
const LANG_ALIASES: Partial<Record<string, Locale>> = {
  fil: 'en',
};

const toLocale = (string: string): Locale | undefined =>
  string in raw_dict_map
    ? (string as Locale)
    : string in LANG_ALIASES
      ? (LANG_ALIASES[string] as Locale)
      : undefined;

interface Settings {
  locale: Locale;
  dark: boolean;
}

function initialLocale(location: Location): Locale {
  let locale: Locale | undefined;

  locale = toLocale(location.pathname);
  if (locale) return locale;

  locale = toLocale(navigator.language.slice(0, 2));
  if (locale) return locale;

  locale = toLocale(navigator.language.toLocaleLowerCase());
  if (locale) return locale;

  return 'en';
}

function initialSettings(location: Location): Settings {
  return {
    locale: initialLocale(location),
    dark: window.matchMedia('(prefers-color-scheme: dark)').matches,
  };
}

function deserializeSettings(value: string, location: Location): Settings {
  const parsed = JSON.parse(value) as unknown;
  if (!parsed || typeof parsed !== 'object') return initialSettings(location);

  return {
    locale:
      ('locale' in parsed && typeof parsed.locale === 'string' && toLocale(parsed.locale)) ||
      initialLocale(location),
    dark: 'dark' in parsed && typeof parsed.dark === 'boolean' ? parsed.dark : false,
  };
}

interface AppState {
  get isDark(): boolean;
  setDark(value: boolean): void;
  get locale(): Locale;
  setLocale(value: Locale): void;
  t: i18n.Translator<Dictionary>;
  get dir(): 'ltr' | 'rtl';
  get cv(): TypeCV
}

const AppContext = createContext<AppState>({} as AppState);

export const useAppState = () => useContext(AppContext);

export const AppContextProvider: ParentComponent = (props) => {
  const now = new Date();
  const cookieOptions: storage.CookieOptions = {
    expires: new Date(now.getFullYear() + 1, now.getMonth(), now.getDate()),
  };

  const [settings, set] = storage.makePersisted(createStore(initialSettings(location)), {
    storageOptions: cookieOptions,
    storage: storage.cookieStorage,
    deserialize: (value) => deserializeSettings(value, location),
  });

  const locale = () => settings.locale;

  const cv_option = (): CVOption => {
    const theme = settings.dark ? "dark" : "light"
    return `${theme}_${locale()}`
  }

  const [dict] = createResource(locale, fetchDictionary, { initialValue: en_flat_dict });

  const [curCV] = createResource(cv_option, fetchCV, { initialValue: en_light_cv });

  createEffect(() => {
    document.documentElement.lang = settings.locale;
  });

  createEffect(() => {
    if (settings.dark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  });

  const t = i18n.translator(dict, i18n.resolveTemplate);

  const state: AppState = {
    get isDark() {
      return settings.dark;
    },
    setDark(value) {
      set('dark', value);
    },
    get locale() {
      return settings.locale;
    },
    setLocale(value) {
      void startTransition(() => {
        set('locale', value);
      });
    },
    t,
    get dir() {
      return t('global.dir') === 'ltr' ? 'ltr' : 'rtl';
    },
    get cv() {
      return curCV()
    }
  };

  return (
    <Suspense>
      <AppContext.Provider value={state}>
        <Title>{t('global.title')}</Title>
        <Meta name="lang" content={locale()} />
        <div class="center min-w-100vw min-h-100vh" dir={state.dir}>{props.children}</div>
      </AppContext.Provider>
    </Suspense>
  );
};
