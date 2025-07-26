import type { Meta, StoryObj } from "@storybook/nextjs";

import { useState } from "react";

import FileDrop from "@/components/common/file-drop";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "RCFC/FileDrop",
  component: FileDrop,
} satisfies Meta<typeof FileDrop>;

export default meta;
type Story = StoryObj<typeof meta>;


export const Default: Story = {
  args: {name:"front",image:null,setImage:()=>null},
  render: (args) => {
    const [image,setImage] = useState<File | null>(null)
    return (
      <FileDrop {...args} image={image} setImage={setImage} />
    )
  }
};
