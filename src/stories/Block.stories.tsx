import type { Meta, StoryObj } from 'storybook-solidjs';

import { Block } from '@/components/block/Block';

const meta = {
  title: 'Example/Block',
  component: Block,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} satisfies Meta<typeof Block>;

export default meta;
type Story = StoryObj<typeof meta>;

// export const Light = () => (
//   <div class="bg-white w-275px h-full">
//     <LightBlock label="about Me">
//       Lorem ipsum dolor sit amet consectetur adipiscing elit scelerisque sit senectus maecenas donec amet viverra Aliquam aenean eget gravida vitae nunc vitae sit.
//     </LightBlock>
//   </div>
// )

// export const Dark = () => (
//   <div class='bg-dark w-249px h-full'>
//     <DarkBlock label="About John Carter">
//       Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dictumst sagittis nisi interdum mauris. Nulla hendrerit elementum ullamcorper rhoncus sed at. Odio ut sit tempor sit. Donec id elit feugiat cursus.
//     </DarkBlock>
//   </div>
// )
