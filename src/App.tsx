import type { Component } from 'solid-js';
import { Suspense } from 'solid-js';

import { MetaProvider } from '@solidjs/meta';

import { AppContextProvider } from './AppContext';
import Home from './pages/home';

const App: Component = () => {
  return (
    <MetaProvider>
      <AppContextProvider>
        <Suspense>
          <Home />
        </Suspense>
      </AppContextProvider>
    </MetaProvider >
  );
};

export default App;
