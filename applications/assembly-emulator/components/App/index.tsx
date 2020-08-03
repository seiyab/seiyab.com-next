import { useState } from 'react';

import Stack from '@asm/components/Stack';
import RegisterContents from '@/applications/assembly-emulator/components/RegisterContents';
import Controller from '@asm/components/Controller';
import { initialState } from '@asm/domain';

const init = initialState(10);

const App: React.FC = () => {
  const [state, setState] = useState(init);
  return (
    <div style={{display: 'flex', marginTop: '10px'}}>
      <div style={{marginLeft: '10px'}}>
        <Stack
          state={state}
        />
      </div>
      <div style={{marginLeft: '10px'}}>
        <RegisterContents register={state.registers}/>
      </div>
      <div style={{marginLeft: '10px'}}>
        <Controller
          setState={setState}
        />
      </div>
    </div>
  )
};

export default App;