import { useCallback, useState } from 'react';

import OutsideClickListener from '@/components/OutsideClickListener';

import style from './style.module.css';

type Props = {
  content: JSX.Element;
};

const Dropdown: React.FC<Props> = ({ content, children }) => {
  const [isOpened, setIsOpened] = useState(false);
  const toggle = useCallback(
    () => setIsOpened((prev) => !prev),
    [setIsOpened],
  );
  const close = useCallback(
    () => setIsOpened(false),
    [setIsOpened],
  );
  return (<div className={style.dropdown}>
    <OutsideClickListener onClick={close}>
      <button
        className={style.button}
        onClick={toggle}
        type="button"
      >
        {children}
      </button>
      {isOpened && <div className={style.content}>
        {content}
      </div>}
    </OutsideClickListener>
  </div>)
};

export default Dropdown;