import { useState } from 'react';

import Stack from '@asm/components/Stack';
import RegisterContents from '@/applications/assembly-emulator/components/RegisterContents';
import Controller from '@asm/components/Controller';
import { Address, Memory, CpuRegisters } from '@asm/domain';

const initialMemories: Memory[] = [
  {
    address: 0 as Address,
    content: 0,
  }
];

const initialRegister: CpuRegisters = {
  RSP: 0 as Address,
  RBP: 0 as Address,
  RAX: 0,
}

const App: React.FC = () => {
  const [memories, setMemories] = useState(initialMemories);
  const [register, setRegister] = useState(initialRegister);
  return (
    <div style={{display: 'flex', marginTop: '10px'}}>
      <div style={{marginLeft: '10px'}}>
        <Stack
          memories={memories}
          register={register}
        />
      </div>
      <div style={{marginLeft: '10px'}}>
        <RegisterContents register={register}/>
      </div>
      <div style={{marginLeft: '10px'}}>
        <Controller
          memories={memories}
          setMemories={setMemories}
          setRegister={setRegister}
        />
      </div>
    </div>
  )
};

export default App;