import type { Component } from 'solid-js';

import { DefaultLayout } from '@/components/layouts/default';

const Home: Component = () => {
    return (
        <div class="center flex-col bg-#e1e1e1 w-100vw h-100vh">
            {/* <DefaultLayout>
                {{ header: () => <div>header</div> }}
                {{ left: () => <div>left</div> }}
                {{ right: () => <div>right</div> }}
            </DefaultLayout> */}

            {/* <DefaultLayout
                header={() => <div>header</div>}
                left={() => <div>left</div>}
                right={() => <div>right</div>}
                footer={() => <div>footer</div>}
            >
            </DefaultLayout> */}
            <DefaultLayout></DefaultLayout>
        </div>
    );
};

export default Home;
