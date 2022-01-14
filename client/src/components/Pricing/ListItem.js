import React, { useRef } from 'react';

import { useHover } from '../../hooks';
import Popup from '../Popup';

export default function ListItem(props) {
  const { className, popupContent, children } = props;
  const target = useRef(null);
  const isHovering = useHover(target, { delay: 100 });

  return (
    <li
      ref={target}
      className={className}
    >
      {children}
      {isHovering ? <Popup content={popupContent}/> : undefined}
    </li>
  )
}
