import { ChangeEvent, useCallback, useState } from 'react';

import { Props, Option } from './types';

export const useSelect = <K extends string>(
  options: Option<K>[],
  initial: K,
): Pick<Props<K>, 'options' | 'selected' | 'onChange'> => {
  const [selected, setSelected] = useState<K>(initial);
  const onChange: JSX.IntrinsicElements['select']['onChange'] = useCallback(
    (ev: ChangeEvent<HTMLSelectElement>) => {
      setSelected(ev.target.value as K);
    },
    [setSelected],
  )
  return {
    options,
    selected,
    onChange,
  }
}