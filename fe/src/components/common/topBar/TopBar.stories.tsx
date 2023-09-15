import { ChevronLeft } from '@components/common/icons';
import { Meta, StoryObj } from '@storybook/react';
import { Button } from '../button/Button';
import { LeftButton } from './LeftButton';
import { RightButton } from './RightButton';
import { Title } from './Title';
import { TopBar } from './TopBar';

const meta: Meta<typeof TopBar> = {
  title: 'TopBar',
  component: TopBar,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <>
        <LeftButton>
          <Button variant="text">
            <ChevronLeft stroke="#000" />
            뒤로
          </Button>
        </LeftButton>
        <Title>Title</Title>
        <RightButton>
          <Button variant="text">완료</Button>
        </RightButton>
      </>
    ),
  },
};

export const Transparent: Story = {
  args: {
    transparent: true,
    children: (
      <>
        <LeftButton>
          <Button variant="text">
            <ChevronLeft stroke="#000" />
            뒤로
          </Button>
        </LeftButton>
        <RightButton>
          <Button variant="text">완료</Button>
        </RightButton>
      </>
    ),
  },
};

export const NoTitle: Story = {
  args: {
    children: (
      <>
        <LeftButton>
          <Button variant="text">
            <ChevronLeft stroke="#000" />
            뒤로
          </Button>
        </LeftButton>
        <RightButton>
          <Button variant="text">완료</Button>
        </RightButton>
      </>
    ),
  },
};

export const NoRightButton: Story = {
  args: {
    children: (
      <>
        <LeftButton>
          <Button variant="text">
            <ChevronLeft stroke="#000" />
            뒤로
          </Button>
        </LeftButton>
        <Title>Title</Title>
      </>
    ),
  },
};

export const DisabledRightButton: Story = {
  args: {
    children: (
      <>
        <LeftButton>
          <Button variant="text">
            <ChevronLeft stroke="#000" />
            뒤로
          </Button>
        </LeftButton>
        <Title>Title</Title>
        <RightButton>
          <Button variant="text" disabled>
            완료
          </Button>
        </RightButton>
      </>
    ),
  },
};
