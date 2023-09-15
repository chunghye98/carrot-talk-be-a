import { MenuBox } from '@components/common/menu/MenuBox';
import { MenuItem } from '@components/common/menu/MenuItem';
import type { Meta, StoryObj } from '@storybook/react';
import { Dropdown } from './Dropdown';

const meta: Meta<typeof Dropdown> = {
  title: 'Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    align: {
      control: {
        type: 'select',
        options: ['left', 'right'],
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Dropdown
      opener={<button>열기</button>}
      menu={
        <MenuBox>
          <MenuItem>옵션1</MenuItem>
          <MenuItem>옵션2</MenuItem>
          <MenuItem>옵션3</MenuItem>
        </MenuBox>
      }
    />
  ),
};

export const AlignRight: Story = {
  render: () => (
    <Dropdown
      opener={<button>열기</button>}
      menu={
        <MenuBox>
          <MenuItem>옵션1</MenuItem>
          <MenuItem>옵션2</MenuItem>
          <MenuItem>옵션3</MenuItem>
        </MenuBox>
      }
      align="right"
    />
  ),
};
