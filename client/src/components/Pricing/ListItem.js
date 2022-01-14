import React, { createElement, useRef } from 'react';
import { useHover } from '../../hooks';
import Popup from '../Popup';

export default function ListItem(props) {
  const { type, className, popupContent, children } = props;

  const target = useRef(null);
  const isHovering = useHover(target, { delay: 100 });

  return (
    createElement(type, { ref: target, className },
      children,
      isHovering ? <Popup content={popupContent} /> : undefined
    )
  )
}
