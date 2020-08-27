import { CSSProperties } from 'react';
import { colors } from '@asm/color';

import { Props } from './types';

const Select = <T extends string>(props: Props<T>): React.ReactElement<Props<T>> => {
  const { options, selected, name, style, onChange } = props;
  return(
    <select name={name} style={{...defaultStyle, ...style}} onChange={onChange} defaultValue={selected}>
      {
        options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        ))
      }
    </select>
  )
}

const defaultStyle: CSSProperties = {
  backgroundImage: 'url(/assets/triangle.svg)',
  backgroundPositionX: '93%',
  backgroundPositionY: '50%',
  backgroundRepeat: 'no-repeat',
  backgroundSize: '8px',
  paddingRight: '18px',
  paddingLeft: '3px',

  backgroundColor: colors[1],
  color: colors[0],
  borderColor: colors[4],
  borderRadius: '4px',
  borderStyle: 'solid',
  borderWidth: '1px',
} as const;

export default Select;