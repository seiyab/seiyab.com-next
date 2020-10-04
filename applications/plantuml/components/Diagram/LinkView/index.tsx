import { Link } from "@puml/domain";

import { Position } from '../position';

interface Props {
  link: Link;
  leftPosition: Position;
  rightPosition: Position;
}

const LinkView: React.FC<Props> = ({
  children: _,
  link: _link,
  leftPosition,
  rightPosition,
}) => {
  return (
    <line
      x1={leftPosition.x} y1={leftPosition.y}
      x2={rightPosition.x} y2={rightPosition.y}
      stroke="black"
    />
  );
};

export default LinkView;
