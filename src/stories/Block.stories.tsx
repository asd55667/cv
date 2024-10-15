import type { Meta, StoryObj } from 'storybook-solidjs';

import { Block, LightBlock, DarkBlock } from '@/components/block/Block';

const meta = {
    title: 'Example/Block',
    component: Block,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} satisfies Meta<typeof Block>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light = () => (
    <div class="bg-white w-full h-full">
        <LightBlock label="About Me">
            {() => <div>Lorem ipsum dolor sit amet consectetur adipiscing elit scelerisque sit senectus maecenas donec amet viverra Aliquam aenean eget gravida vitae nunc vitae sit.</div>}
        </LightBlock>
    </div>
)

export const Dark = () => (
    <div class='bg-dark w-full h-full'>
        <DarkBlock label="About John Carter">
            {() => <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dictumst sagittis nisi interdum mauris. Nulla hendrerit elementum ullamcorper rhoncus sed at. Odio ut sit tempor sit. Donec id elit feugiat cursus.</div>}
        </DarkBlock>
    </div>
)