import React from 'react';
import { Link } from 'react-router-dom';

import styles from './StartContest.module.sass'

export default function StartContest() {
  return (
    <article className={styles.container}>
      <p>Ready to get started? Launch a contest and start receiving submissions instantly.</p>
      <Link to={"/startContest"} className={styles.link}>
        <i className="far fa-lightbulb"></i>
        <span className={styles.linkText}>Start a contest</span>
      </Link>
    </article>
  )
}
