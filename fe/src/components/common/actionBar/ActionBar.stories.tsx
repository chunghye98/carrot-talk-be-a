import type { Meta, StoryObj } from '@storybook/react';
import { ActionBar } from './ActionBar';
import { EditBar } from '@components/common/actionBar/EditBar';
import { Button } from '@components/common/button/Button';
import { PostBar } from '@components/common/actionBar/PostBar';
import { ChatBar } from '@components/common/actionBar/ChatBar';
import { Input } from '@components/common/input/Input';
import { formatPrice } from '@utils/formatPrice';
import { Heart, Send } from '../icons';

const meta: Meta<typeof ActionBar> = {
  title: 'ActionBar',
  component: ActionBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <ActionBar>Default</ActionBar>,
};

export const Edit: Story = {
  render: () => (
    <EditBar>
      {mock.map((location) => (
        <Button
          key={location.id}
          variant="category"
          state={selectedId === location.id ? 'active' : 'default'}
          onClick={() => {}}
        >
          {location.name}
        </Button>
      ))}
    </EditBar>
  ),
};

export const Post: Story = {
  render: () => (
    <PostBar isLiked={true}>
      <div className="info">
        {/* 
        info 클래스 네임으로 사용처에서 스타일을 주어 두 요소를 묶어줍니다 
          display: flex;
          gap: 8px;
          align-items: center;
        */}
        <Heart onClick={() => {}} />
        {formattedPrice}
      </div>
      <Button variant="rectangle" size="s" state="active" onClick={() => {}}>
        대화 중인 채팅방{/* count가 추가될 수 있습니다 */}
      </Button>
    </PostBar>
  ),
};

export const Chat: Story = {
  render: () => (
    <ChatBar>
      <Input
        onChange={() => {}}
        onPressEnter={() => {}}
        placeholder="내용을 입력하세요"
        radius="l"
        variant="outlined"
      />
      <Button variant="fab" size="s">
        <Send />
      </Button>
    </ChatBar>
  ),
};

const mock = [
  {
    id: 3,
    name: '역삼 1동', // 로그인안한 유저는 역삼 1동이 default, 첫 번째가 대표 동네
  },

  {
    id: 4,
    name: '역삼 2동', // 로그인안한 유저는 역삼 1동이 default,
  },
];

const selectedId = 3;
const formattedPrice = formatPrice(158000);
