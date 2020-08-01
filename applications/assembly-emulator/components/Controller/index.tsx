import { useCallback, useState } from 'react';

import { parseNaiveInt } from "@/generic/number";

import { Memory, CpuRegisters, incrementAddress } from "@asm/domain";
import Button from '@asm/components/Button';
import { colors } from '@asm/color';

import { usePush, usePop } from './hooks';

interface Props {
  memories: Memory[]
  setMemories: (apply: (memories: Memory[]) => Memory[]) => void;
  setRegister: (apply: (register: CpuRegisters) => CpuRegisters) => void;
}

const Controller: React.FC<Props> = (props: Props) => {
  const { memories, setMemories, setRegister } = props;
  const [value, setValue] = useState('0');
  const intValue = parseNaiveInt(value);
  const onChange: JSX.IntrinsicElements['input']['onChange'] = useCallback(
    (event) => setValue(event.target.value),
    [setValue],
  );
  const onClickPush: JSX.IntrinsicElements['button']['onClick'] = usePush(
    intValue, setMemories, setRegister,
  )
  const onClickPop: JSX.IntrinsicElements['button']['onClick'] = usePop(
    'RAX', memories, setRegister,
  )
  return (
    <div>
      <div>
        <Button
          disabled={isNaN(intValue)}
          onClick={onClickPush}
        >
          PUSH
        </Button>
        <input
          type="number"
          value={value}
          onChange={onChange}
          style={{
            marginLeft: '3px',
            backgroundColor: colors[0],
          }}
        />
      </div>
      <div style={{marginTop: '10px'}}>
        <Button
          onClick={onClickPop}
        >
          POP
        </Button>
      </div>
    </div>
  );
};

export default Controller;