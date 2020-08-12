import { CSSProperties } from 'react';

import { Memory, State } from "@asm/domain";
import { colors } from '@asm/color';

interface Props {
  memory: Memory;
  register: State['registers'];
}

const Element: React.FC<Props> = (props) => {
  const { memory, register } = props;
  return (
    <div style={{display: 'table-row'}}>
      <div style={{...cellStyle, textAlign: 'right'}}>{memory.address}</div>
      <div style={{...cellStyle, textAlign: 'right'}}>{memory.content}</div>
      <div style={{...cellStyle, textAlign: 'center'}}>
        {
          register.RSP === memory.address && <span style={pointerStyle}>
            ←RSP
          </span>
        }
      </div>
      <div style={{...cellStyle, textAlign: 'center'}}>
        {
          register.RBP === memory.address && <span style={pointerStyle}>
            ←RBP
          </span>
        }
      </div>
    </div>
  )
};

const cellStyle: CSSProperties = {
  display: 'table-cell',
  padding: '3px 5px',
  borderStyle: 'solid',
  borderColor: colors[3],
  borderWidth: '1px',
};

const pointerStyle: CSSProperties = {
  backgroundColor: colors[4],
  color: colors[1],
  borderRadius: '2px',
  padding: '2px 4px',
  margin: 'auto',
};

export default Element;