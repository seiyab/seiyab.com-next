import clsx from 'clsx';
import * as E from 'fp-ts/Either';
import { Do } from 'fp-ts-contrib/Do';
import {
  parse,
  Class,
  Relationship,
} from 'plantuml-parser';
import { useCallback, useState, useRef } from 'react';
import { useRecoilState } from 'recoil';

import { ClazzName } from '@puml/domain';
import ReloadButton from '@puml/components/ReloadButton';
import { globalState, State, empty } from '@puml/state';
import { put } from '@/generic/string';
import { demo1, demo2 } from './demo';
import style from './style.module.css';

interface Props {
  className?: string;
}

const PumlInput: React.FC<Props> = ({ className }) => {
  const [, setState] = useRecoilState(globalState);
  const [error, setError] = useState<null | string>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const reload = useCallback(
    () => {
      const text = textareaRef.current?.value;
      if (!text) {
        setState(empty);
        setError(null)
        return;
      }
      const eitherState = textToState(text)
      if (E.isLeft(eitherState)) {
        setError(eitherState.left)
        return;
      } 
      setState(eitherState.right);
      setError(null)
    },
    [setState],
  )
  const [showDemo1, showDemo2] = [demo1, demo2].map((puml) => () => {
    if (!textareaRef.current) return;
    textareaRef.current.value = puml;
    reload();
  })
  return (
    <div className={clsx(className)}>
      <header>
        <div>
          <button type="button" onClick={showDemo1}>
            demo1
          </button>
          <button type="button" onClick={showDemo2}>
            demo2
          </button>
          <ReloadButton onClick={reload}/>
        </div>
        <div>
          Paste PlantUML here
        </div>
        {error && <div className={style['uml-error']}>{error}</div>}
      </header>
      <section>
        <textarea
          rows={40}
          cols={25}
          ref={textareaRef}
        />
      </section>
    </div>
  );
};

const textToState = (text: string): E.Either<string, State> =>  (
  Do(E.either)
    .bind('umls', E.tryCatch(
      () => (parse(text)),
      () => 'failed to parse.',
    ))
    .bindL('state', ({ umls }) => {
      const state = empty();

      umls?.forEach((uml) => {
        uml.elements.forEach((elm) => {
          if (elm instanceof Class) {
            const name = elm.name as ClazzName;
            put(state.clazzes, name, { name });
            return;
          }
          if (elm instanceof Relationship) {
            state.links.push({
              src: { target: elm.left as ClazzName },
              dst: { target: elm.right as ClazzName }
            })
          }
        });
      });

      state.links.flatMap(
        (link) => [link.src.target, link.dst.target]
      ).filter(
        (clazzName) => !(clazzName in state.clazzes)
      ).forEach((name) => {
        put(state.clazzes, name, { name })
      });

      if (Object.keys(state.clazzes).length === 0) {
        return E.left('no class is found. only class diagram is supported.')
      }

      return E.of(state);
    },
  )
  .return(({ state }) => state)
)

export default PumlInput;