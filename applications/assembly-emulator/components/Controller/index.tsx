import { useCallback, useState } from 'react';

import { parseNaiveInt } from "@/generic/number";

import { State, push, pop, Register } from "@asm/domain";
import Button from '@asm/components/Button';
import Select from '@/applications/assembly-emulator/components/Select';
import { useSelect } from '@/applications/assembly-emulator/components/Select/hooks';
import { colors } from '@asm/color';

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

  const selectProps = useSelect<Register>(
    [
      {value: 'RSP', text: 'RSP'},
      {value: 'RBP', text: 'RBP'},
      {value: 'RAX', text: 'RAX'},
    ],
    'RAX',
  )
  const onClickPop: JSX.IntrinsicElements['button']['onClick'] = useCallback(
    () => {
      setState(pop(selectProps.selected));
      console.log(selectProps.selected);
    },
    [setState, selectProps.selected],
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
          value={pushValue}
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
        <Select
          name={'popRegister'}
          {...selectProps}
          style={{
            marginLeft: '3px',
          }}
        />
      </div>
    </div>
  );
};

export default Controller;