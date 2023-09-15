import { useEffect, useState } from 'react';
// jsdocs 도입하기^^...
// shouldRender: 컴포넌트가 렌더링 되어야 하는지 나타내는 플래그
// handleTransitionEnd: 애니메이션의 끝을 처리하는 함수
// animationTrigger: 애니메이션을 트리거할지 나타내는 플래그
type UseAnimationReturn = {
  shouldRender: boolean;
  handleTransitionEnd: () => void;
  animationTrigger: boolean;
};
// condition : isOpen등
export const useAnimation = (condition: boolean): UseAnimationReturn => {
  // 애니메이션이 완료되었는지
  const [isComplete, setComplete] = useState(false);

  useEffect(() => {
    if (condition) {
      setComplete(true);
    }
  }, [condition]);

  // 'condition'이 참이거나 애니메이션이 완료된 경우에 렌더링
  const shouldRender = condition || isComplete;

  // 'condition'과 'isComplete' 모두 참일 때 애니메이션을 트리거
  const animationTrigger = condition && isComplete;

  const handleTransitionEnd = () => {
    // 'condition'이 false(꺼져야할때) 'isComplete' 상태를 false로 리셋
    if (!condition) setComplete(false);
  };

  return { shouldRender, handleTransitionEnd, animationTrigger };
};
