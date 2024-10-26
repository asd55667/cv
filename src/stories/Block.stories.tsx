import type { Meta, StoryObj } from "storybook-solidjs";

import { Block } from "@/components/block/Block";

const meta = {
  title: "Example/Block",
  component: Block,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} satisfies Meta<typeof Block>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = () => (
  <div class="bg-white w-275px h-full">
    <Block theme="light" label="about Me">
      Lorem ipsum dolor sit amet consectetur adipiscing elit scelerisque sit
      senectus maecenas donec amet viverra Aliquam aenean eget gravida vitae
      nunc vitae sit.
    </Block>
  </div>
);

export const Dark: Story = () => (
  <div class="bg-dark w-249px h-full">
    <Block theme="dark" label="About John Carter">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dictumst sagittis
      nisi interdum mauris. Nulla hendrerit elementum ullamcorper rhoncus sed
      at. Odio ut sit tempor sit. Donec id elit feugiat cursus.
    </Block>
  </div>
);
