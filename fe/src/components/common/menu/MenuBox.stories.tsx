import type { Meta, StoryObj } from '@storybook/react';
import { MenuBox } from './MenuBox';
import { MenuItem } from './MenuItem';

const meta: Meta<typeof MenuBox> = {
  title: 'MenuBox',
  component: MenuBox,
  parameters: {
    layout: 'centered',
  },
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <MenuBox>
      {['Item 1', 'Item 2', 'Item 3'].map((item, index) => (
        <MenuItem key={index}>{item}</MenuItem>
      ))}
    </MenuBox>
  ),
};

export const Selected: Story = {
  render: () => (
    <MenuBox>
      <MenuItem state="selected">Item 1</MenuItem>
      <MenuItem>Item 2</MenuItem>
      <MenuItem>Item 3</MenuItem>
    </MenuBox>
  ),
};

export const Warning: Story = {
  render: () => (
    <MenuBox>
      <MenuItem state="selected">Item 1</MenuItem>
      <MenuItem>Item 2</MenuItem>
      <MenuItem variant="warning">Delete All</MenuItem>
    </MenuBox>
  ),
};
