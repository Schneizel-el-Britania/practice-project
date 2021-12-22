import React, { useState } from 'react';
import cx from "classnames"
import articles from './agencyData.json';
import styles from './AgencyLevel.module.sass'

const iconColors = [
  ['#de4437', '#fceceb'],
  ['#00c9a7', '#e6faf6'],
  ['#377dff', '#ebf2ff'],
]

export default function AgencyLevel() {
  const [hovered, setHovered] = useState({
    ic0: false,
    ic1: false,
    ic2: false,
  })

  const setIconColor = (icon, index) => ({
    color: hovered['ic' + index] ? icon[1] : icon[0],
    backgroundColor: hovered['ic' + index] ? icon[0] : icon[1]
  })

  const updateHover = (index, value) => setHovered((hovered) => ({
    ...hovered,
    ['ic' + index]: value,
  }))

  return (
    <div>
      <h2 className={styles.header}>agency level experience</h2>
      <section className={styles.container}>
        {
          articles.map((article, index) =>
            <article className={styles.article} key={index}>
              <span
                onMouseEnter={() => updateHover(index, true)}
                onMouseLeave={() => updateHover(index, false)}
                style={setIconColor(iconColors[index], index)}
                className={styles.icon}
              >
                <span
                  className={cx("fa-2x", article.icon, styles.innerIcon)}
                  alt={article.title}
                />
              </span>
              <h3 className={styles.title}>{article.title}</h3>
              <p className={styles.desc}>
                {article.desc}
                <a href={article.link}>learn more</a>
              </p>
            </article>)
        }
      </section>
    </div>
  )
}
