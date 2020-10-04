import { Link } from "@puml/domain";

import { Position } from '../position';
import { clazzSize } from '../ClazzView';

interface Props {
  link: Link;
  srcPosition: Position;
  dstPosition: Position;
}

const LinkView: React.FC<Props> = ({
  link: _link,
  srcPosition,
  dstPosition,
}) => {
  const terminals = locateTerminal(srcPosition, dstPosition);
  if ( terminals === null) return null;
  const {
    srcTerminal,
    dstTerminal,
  } = terminals;
  return (
    <line
      x1={srcTerminal.x} y1={srcTerminal.y}
      x2={dstTerminal.x} y2={dstTerminal.y}
      stroke="black"
    />
  );
};

const locateTerminal = (
  srcPosition: Position,
  dstPosition: Position,
): { srcTerminal: Position, dstTerminal: Position } | null => {
  const [src, dst] = [srcPosition, dstPosition].map((position) => ({
    top: position.y,
    bottom: position.y + clazzSize.height,
    left: position.x,
    right: position.x + clazzSize.width,
  }));
  if (src.bottom < dst.top) {
    return {
      srcTerminal: bottom(src),
      dstTerminal: top(dst),
    };
  }
  if (dst.bottom < src.top) {
    return {
      srcTerminal: top(src),
      dstTerminal: bottom(dst),
    };
  }
  if (src.right < dst.left) {
    return {
      srcTerminal: right(src),
      dstTerminal: left(dst),
    };
  }
  if (dst.right < src.left) {
    return {
      srcTerminal: left(src),
      dstTerminal: right(dst),
    }
  }
  return null;
}

const top = (box: { top: number, bottom: number, left: number, right: number}): Position => ({
  x: (box.left + box.right) / 2,
  y: box.top,
});

const bottom = (box: { top: number, bottom: number, left: number, right: number}): Position => ({
  x: (box.left + box.right) / 2,
  y: box.bottom,
});

const left = (box: { top: number, bottom: number, left: number, right: number}): Position => ({
  x: box.left,
  y: (box.top + box.bottom) / 2,
})

const right = (box: { top: number, bottom: number, left: number, right: number}): Position => ({
  x: box.right,
  y: (box.top + box.bottom) / 2,
})

export default LinkView;
