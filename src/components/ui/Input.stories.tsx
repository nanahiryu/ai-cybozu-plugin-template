import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./Input";

const meta = {
  title: "UI/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Label",
    placeholder: "Enter text...",
  },
};

export const WithHelperText: Story = {
  args: {
    label: "Email",
    placeholder: "example@example.com",
    helperText: "We'll never share your email.",
  },
};

export const Error: Story = {
  args: {
    label: "Password",
    type: "password",
    error: true,
    helperText: "Password is required.",
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled",
    disabled: true,
    value: "Cannot edit",
  },
};
