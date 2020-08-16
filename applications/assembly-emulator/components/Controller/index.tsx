import { useCallback, useState } from 'react';

import { parseNaiveInt } from "@/generic/number";

import { State, push, pop, Operand } from "@asm/domain";
import Button from '@asm/components/Button';
import Input from '@asm/components/Input';

import { WOperandSelector } from './OperandSelector';

interface Props {
  setState: (transform: (oldState: State) => State) => void;
}

const Controller: React.FC<Props> = (props: Props) => {
  const { setState } = props;
  const [pushValue, setPushValue] = useState('0');
  const intValue = parseNaiveInt(pushValue);
  const onChange: JSX.IntrinsicElements['input']['onChange'] = useCallback(
    (event) => setPushValue(event.target.value),
    [setPushValue],
  );
  const onClickPush: JSX.IntrinsicElements['button']['onClick'] = useCallback(
    () => {
      if (isNaN(intValue)) return;
      setState(push(intValue));
    },
    [intValue, setState]
  )

  const [popOperand, setPopOperand] = useState<Operand<'Register'| 'Memory'>>(
    { kind: 'Register', value: 'RAX' },
  );
  const onChangePopOperand = useCallback(
    (operand: Operand) => {
      if (operand.kind === 'Immediate') return;
      setPopOperand(operand);
    },
    [setPopOperand],
  );
  const onClickPop: JSX.IntrinsicElements['button']['onClick'] = useCallback(
    () => {
      setState(pop(popOperand));
    },
    [setState, popOperand],
  )

  return (
    <div style={{ width: '250px' }}>
      <div style={{ display: 'flex' }}>
        <Button
          disabled={isNaN(intValue)}
          onClick={onClickPush}
        >
          PUSH
        </Button>
        <span style={{width: '4px'}} />
        <Input
          type="number"
          value={pushValue}
          onChange={onChange}
        />
      </div>
      <div style={{ marginTop: '10px', display: 'flex' }}>
        <Button
          onClick={onClickPop}
        >
          POP
        </Button>
        <span style={{width: '4px'}} />
        <WOperandSelector
          current={popOperand}
          onChange={onChangePopOperand}
        />
      </div>
    </div>
  );
};

export default Controller;