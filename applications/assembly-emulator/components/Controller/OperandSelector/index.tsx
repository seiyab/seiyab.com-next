import { ChangeEvent, useCallback } from 'react';

import { match } from '@/generic/syntax';
import { Address, Operand, Register, OperandKind } from "@asm/domain";
import Select from "@asm/components/Select";
import Input from "@asm/components/Input";
import { parseNaiveInt } from '@/generic/number';

// TODO: OperandKindを限定できるようにしたい
interface Props {
  current: Operand;
  onChange: (choice: Operand) => void;
}

const optionImmediate = { value: 'Immediate', text: 'Immediate' } as const;
const optionRegister = { value: 'Register', text: 'Register' } as const;
const optionMemory = { value: 'Memory', text: 'Memory' } as const;

type AvailableOption<K extends OperandKind> = ({ value: K } & { text: string})[];

const kinds: AvailableOption<OperandKind> = [
  optionImmediate,
  optionRegister,
  optionMemory,
];


const wKinds: AvailableOption<'Register'|'Memory'> = [
  optionRegister,
  optionMemory,
];

const registerOptions = ['RSP', 'RBP', 'RAX'].map((reg) => (
  { value: reg, text: reg }
));

const operandSelector = (ks: AvailableOption<OperandKind>): React.FC<Props> => (props: Props) => {
  const { current, onChange } = props;
  const onChangeType: JSX.IntrinsicElements['select']['onChange'] = useCallback(
    (ev: ChangeEvent<HTMLSelectElement>) => {
      const selected = ev.target.value as OperandKind;
      onChange(
        match(selected)({
          'Immediate': { kind: 'Immediate', value: 0 },
          'Register': { kind: 'Register', value: 'RAX' },
          'Memory': { kind: 'Memory', value: 0 as Address },
        })
      )
    },
    [onChange],
  );
  const onChangeConst: JSX.IntrinsicElements['input']['onChange'] = useCallback(
    (ev: ChangeEvent<HTMLInputElement>) => {
      const intValue = parseNaiveInt(ev.target.value);
      if (isNaN(intValue)) return;
      onChange({ kind: 'Immediate', value: intValue});
    },
    [onChange],
  );
  const onChangeRegister: JSX.IntrinsicElements['select']['onChange'] = useCallback(
    (ev: ChangeEvent<HTMLSelectElement>) => {
      const selected = ev.target.value as Register;
      onChange({ kind: 'Register', value: selected })
    },
    [onChange],
  );
  const onChangeMemory: JSX.IntrinsicElements['input']['onChange'] = useCallback(
    (ev: ChangeEvent<HTMLInputElement>) => {
      const intValue = parseNaiveInt(ev.target.value);
      if (isNaN(intValue)) return;
      onChange({ kind: 'Memory', value: intValue as Address});
    },
    [onChange],
  );
  return (
    <div style={{display: 'flex'}}>
      <Select
        options={ks}
        selected={current.kind}
        onChange={onChangeType}
      />
      <span style={{ width: '4px' }}/>
      {
        match(current.kind)({
          'Immediate': (<Input
            defaultValue={0}
            type="number"
            onChange={onChangeConst}
            style={{ width: '80px' }}
          />),
          'Register': (<Select
            options={registerOptions}
            selected={current.value as Register}
            onChange={onChangeRegister}
          />),
          'Memory': (<Input
            defaultValue={0}
            type="number"
            onChange={onChangeMemory}
            style={{ width: '80px' }}
          />),
        })
      }
    </div>
  );
};

export const RWOperandSelector = operandSelector(kinds);
export const WOperandSelector = operandSelector(wKinds);
export default RWOperandSelector;