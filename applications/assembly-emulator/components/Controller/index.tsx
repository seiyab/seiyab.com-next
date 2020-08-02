import { useCallback, useState } from 'react';

import { parseNaiveInt } from "@/generic/number";

import { State, push, pop } from "@asm/domain";
import Button from '@asm/components/Button';
import { colors } from '@asm/color';

interface Props {
  state: State,
  setState: (transform: (oldState: State) => State) => void;
}

const Controller: React.FC<Props> = (props: Props) => {
  const { state, setState } = props;
  const [value, setValue] = useState('0');
  const intValue = parseNaiveInt(value);
  const onChange: JSX.IntrinsicElements['input']['onChange'] = useCallback(
    (event) => setValue(event.target.value),
    [setValue],
  );
  const onClickPush: JSX.IntrinsicElements['button']['onClick'] = useCallback(
    () => {
      if (isNaN(intValue)) return;
      setState(push(intValue));
    },
    [intValue, setState]
  )
  const onClickPop: JSX.IntrinsicElements['button']['onClick'] = useCallback(
    () => {
      setState(pop('RAX'));
    },
    [setState],
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