import type { Meta, StoryObj } from '@storybook/react';
import { MenuItem } from './MenuItem';

const meta: Meta<typeof MenuItem> = {
  title: 'MenuItem',
  component: MenuItem,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    children: {
      control: { type: 'text' },
      defaultValue: 'Item 1',
    },
    state: {
      control: { type: 'select', options: ['default', 'selected'] },
      defaultValue: 'default',
    },
    variant: {
      control: { type: 'select', options: ['default', 'warning'] },
      defaultValue: 'default',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Item 1',
    state: 'default',
    variant: 'default',
  },
};

export const Selected: Story = {
  args: {
    children: 'Item 1',
    state: 'selected',
    variant: 'default',
  },
};

export const Warning: Story = {
  args: {
    children: 'Delete All',
    state: 'selected',
    variant: 'warning',
  },
};

export const WarningSelected: Story = {
  args: {
    children: 'Delete All',
    state: 'selected',
    variant: 'warning',
  },
};
