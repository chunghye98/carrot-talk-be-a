import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: ['filled', 'outlined', 'ghost'],
        defaultValue: 'filled',
      },
    },
    radius: {
      control: {
        type: 'select',
        options: ['s', 'l'],
        defaultValue: undefined,
      },
    },
    label: {
      control: {
        type: 'text',
      },
    },
    warningMessage: {
      control: {
        type: 'text',
      },
    },
    value: {
      control: {
        type: 'text',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'filled',
    placeholder: '내용을 입력하세요',
  },
};

export const Address: Story = {
  args: {
    variant: 'filled',
    radius: 's',
    placeholder: '동명(읍, 면)으로 검색(ex. 서초동)',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    placeholder: '내용을 입력하세요',
  },
};

export const Chat: Story = {
  args: {
    variant: 'outlined',
    radius: 'l',
    placeholder: '내용을 입력하세요',
  },
};

export const Signup: Story = {
  args: {
    variant: 'outlined',
    radius: 's',
    placeholder: '내용을 입력하세요',
  },
};

export const Price: Story = {
  args: {
    variant: 'ghost',
    placeholder: '가격(선택사항)',
    label: '₩',
  },
};

export const WithValue: Story = {
  args: {
    variant: 'ghost',
    placeholder: '내용을 입력하세요',
    value: '내용이 입력되어 있습니다',
  },
};

export const WithWarning: Story = {
  args: {
    variant: 'ghost',
    placeholder: '내용을 입력하세요',
    warningMessage: '돈이 부족합니다!',
  },
};
