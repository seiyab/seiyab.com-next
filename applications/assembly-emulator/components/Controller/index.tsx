import { useCallback, useState } from 'react';

import { parseNaiveInt } from "@/generic/number";

import { Address, State, push, pop, Operand, SrcOperand, DstOperand, mov } from "@asm/domain";
import Button from '@asm/components/Button';
import Input from '@asm/components/Input';

import RWOperandSelector, { WOperandSelector } from './OperandSelector';

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

  const [movSrc, setMovSrc] = useState<SrcOperand>(
    { kind: 'Immediate', value: 0 },
  );
  const onChangeMovSrc = useCallback(
    (src: Operand) => {
      setMovSrc(src);
    },
    [setMovSrc],
  );
  const [movDst, setMovDst] = useState<DstOperand>(
    { kind: 'Memory', value: 0 as Address },
  );
  console.log(movDst);
  const onChangeMovDst = useCallback(
    (dst: Operand) => {
      console.log(dst);
      if (dst.kind === 'Immediate') return;
      setMovDst(dst);
    },
    [setMovDst],
  );
  const onClickMov: JSX.IntrinsicElements['button']['onClick'] = useCallback(
    () => {
      setState(mov(movDst, movSrc));
    },
    [setState, movSrc, movDst],
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
      <div style={{ marginTop: '10px', display: 'flex' }}>
        <Button
          onClick={onClickMov}
        >
          MOV
        </Button>
        <span style={{width: '4px'}} />
        <div>
          <RWOperandSelector
            current={movSrc}
            onChange={onChangeMovSrc}
          />
          <WOperandSelector
            current={movDst}
            onChange={onChangeMovDst}
          />
        </div>
      </div>
    </div>
  );
};

export default Controller;