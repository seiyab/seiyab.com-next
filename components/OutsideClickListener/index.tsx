import { useRef, useEffect } from 'react';

type Props = {
  onClick: (event: MouseEvent) => void;
}

const OutsideClickListener: React.FC<Props> = ({ children, onClick }) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  useEffect(
    () => {
      const listener = (event: MouseEvent) => {
        if (!wrapperRef.current) return;
        if (event.composedPath().includes(wrapperRef.current)) return;
        onClick(event);
      } 
      document.addEventListener('click', listener);
      return () => document.removeEventListener('click', listener);
    },
    [onClick],
  );

  return (
    <div ref={wrapperRef}>
      {children}
    </div>
  );
};

export default OutsideClickListener;