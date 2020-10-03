import style from'./style.module.css';

interface Props {
  onClick: JSX.IntrinsicElements['button']['onClick'],
}
const ReloadButton: React.FC<Props> = ({ onClick }) => (
  <button onClick={onClick} className={style[".reload-button"]}>
    Reload
  </button>
)

export default ReloadButton;