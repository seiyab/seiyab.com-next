import { CSSProperties } from 'react';

import { colors } from '@asm/color';

type Props = JSX.IntrinsicElements['input'];

const Input: React.FC<Props> = (props: Props) => (
  <input
    {...props}
    style={{
      ...style,
      ...props.style,
    }}
  />
)

const style: CSSProperties = {
  color: colors[0],
  backgroundColor: colors[2],
  borderRadius: '3px',
};

export default Input;