import clsx from 'clsx';
import {
  parse,
  Class,
  Relationship,
} from 'plantuml-parser';
import { useCallback, useRef } from 'react';
import { useRecoilState } from 'recoil';

import { ClazzName } from '@puml/domain';
import ReloadButton from '@puml/components/ReloadButton';
import { globalState, State, empty } from '@puml/state';
import { iife } from '@/generic/function';
import { put } from '@/generic/string';

interface Props {
  className?: string;
}

const PumlInput: React.FC<Props> = ({ className }) => {
  const [, setState] = useRecoilState(globalState);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const reload = useCallback(
    () => {
      const text = textareaRef.current?.value;
      if (!text) {
        setState(empty);
        return;
      }
      setState(textToState(text));
    },
    [setState],
  )
  return (
    <div className={clsx(className)}>
      <header>
        Paste PlantUML here
        <ReloadButton onClick={reload}/>
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

const textToState = (text: string): State =>  {
  const umls = iife(() => {
    try {
      return parse(text);
    } catch(e) {
      console.error(e);
      return null;
    }
  });

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

  return state;
}

export default PumlInput;