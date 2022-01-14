import React from 'react';
import styles from './Popup.module.sass';

export default function Popup({content}) {
  return (
    <div className={styles.container}>
      <p>{content}</p>
    </div>
  )
}
