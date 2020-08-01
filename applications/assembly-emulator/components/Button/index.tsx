import { colors } from '@asm/color';

type Props = JSX.IntrinsicElements['button'];

const Button: React.FC<Props> = (props) => (
  <button
    type="button"
    {...props}
    style={style}
  >
    <span>{props.children}</span>
  </button>
);

const style: JSX.IntrinsicElements['button']['style'] = {
  backgroundColor: colors[4],
  color: colors[0],
  borderRadius: '3px',
  padding: '3px 5px',
} as const;

export default Button;