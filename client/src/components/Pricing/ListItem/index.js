import React, { createElement, useRef } from 'react';
import cx from 'classnames';
import Popup from '../../Popup';
import { useHover } from '../../../hooks';
import styles from './ListItem.module.sass'


export default function ListItem(props) {
  const { type, className, popupContent, children } = props;
  const target = useRef(null);
  const isHovering = useHover(target, { delay: 100 });
  const itemClasses = cx(className, styles.popupPosition)

  return (
    createElement(type, { ref: target, className: itemClasses },
      children,
      isHovering && popupContent ? <Popup content={popupContent} /> : undefined
    )
  )
}
