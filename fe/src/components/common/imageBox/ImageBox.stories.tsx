import type { Meta, StoryObj } from '@storybook/react';
import { ImageBox } from './ImageBox';

const meta: Meta = {
  title: 'ImageBox',
  component: ImageBox,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: {
        type: 'radio',
        options: ['rectangle', 'circle'],
      },
      defaultValue: 'rectangle',
    },
    size: {
      control: { type: 'radio', options: ['s', 'm', 'l'] },
      defaultValue: 's',
    },
    imgUrl: {
      control: { type: 'text' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultRandomImage = 'https://avatars.githubusercontent.com/u/982349?v=4';

export const ImageBoxSmallCircle: Story = {
  args: {
    variant: 'circle',
    size: 's',
    imgUrl: defaultRandomImage,
  },
};

export const ImageBoxSmallRectangle: Story = {
  args: {
    variant: 'rectangle',
    size: 's',
    imgUrl: defaultRandomImage,
  },
};

export const ImageBoxMediumRectangle: Story = {
  args: {
    variant: 'rectangle',
    size: 'm',
    imgUrl: defaultRandomImage,
  },
};

export const ImageBoxLargeRectangle: Story = {
  args: {
    variant: 'rectangle',
    size: 'l',
    imgUrl: 'none url',
  },
};
