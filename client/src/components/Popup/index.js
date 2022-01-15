import React from 'react';
import cx from 'classnames';
import styles from './Popup.module.sass';

export default function Popup({ content }) {
  const arrowClasses = cx(styles.arrow, 'fas fa-chevron-left');
  return (
    <div className={styles.container}>
      <p>{content}</p>
      <i className={arrowClasses} />
    </div>
  )
}
