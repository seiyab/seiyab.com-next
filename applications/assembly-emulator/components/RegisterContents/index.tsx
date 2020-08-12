import { State } from '@asm/domain';
import { colors } from '@asm/color';

interface Props {
  register: State['registers'];
}

const Registers: React.FC<Props> = (props) => {
  return (
    <div style={{display: 'table'}}>
      {
        Object.entries(props.register).map(([key, value]) => (
          <div key={key} style={{display: 'table-row', height: '25px'}}>
            <div style={{...cellStyle}}>
              {key}
            </div>
            <div style={{...cellStyle, width: '70px', textAlign: 'right'}}>
              {value}
            </div>
          </div>
        ))
      }
    </div>
  )
}

const cellStyle = {
  display: 'table-cell',
  padding: '3px 10px',
  borderStyle: 'solid',
  borderColor: colors[3],
  borderWidth: '1px',
}

export default Registers;