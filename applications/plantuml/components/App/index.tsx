import { RecoilRoot } from 'recoil';

import PumlInput from '@puml/components/PumlInput'
import Diagram from '@puml/components/Diagram';
import Separator from '@puml/components/Separator';

import style from './style.module.css';

const App: React.FC = () => {
  return (
    <div  className={style.app}>
      <RecoilRoot>
        <main className={style.main}>
          <PumlInput className={style.input}/>
          <Separator/>
          <Diagram className={style.diagram}/>
        </main>
      </RecoilRoot>
    </div>
  );
}

export default App;