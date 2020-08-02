import { Memory, State } from "@asm/domain";
import Element from "@asm/components/Element";
import { colors } from '@asm/color';

interface Props {
  state: State;
}

const Stack: React.FC<Props> = (props: Props) => {
  const { state } = props;
  return (
    <div style={{display: 'table'}}>
        <div style={{display: 'table-row'}}>
          <div style={{...cellStyle, width: '70px'}}>Address</div>
          <div style={{...cellStyle, width: '70px'}}>Content</div>
          <div style={{...cellStyle, width: '80px'}}>RSP</div>
          <div style={{...cellStyle, width: '80px'}}>RBP</div>
        </div>
      {
        state.memories.map((memory) => (
          <Element key={memory.address} memory={memory} register={state.registers}/>
        ))
      }
    </div>
  )
}

const cellStyle: JSX.IntrinsicElements['div']['style'] = {
  display: 'table-cell',
  padding: '3px 5px',
  textAlign: 'center',
  borderStyle: 'solid',
  borderColor: colors[3],
  borderWidth: '1px',
};

export default Stack;