import { State } from '@asm/domain';

interface Props {
  register: State['registers'];
}

const Registers: React.FC<Props> = (props) => {
  return (
    <div style={{display: 'table'}}>
      {
        Object.entries(props.register).map(([key, value]) => (
          <div key={key} style={{display: 'table-row'}}>
            <div style={{display: 'table-cell'}}>
              {key}
            </div>
            <div style={{display: 'table-cell'}}>
              {value}
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default Registers;