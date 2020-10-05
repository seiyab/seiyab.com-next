import style from './style.module.css';

const Separator: React.FC = ({children}) => {
  return (
    <div className={style.separator}>
      {children}
    </div>
  )
}

export default Separator;