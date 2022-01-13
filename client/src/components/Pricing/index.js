import React from 'react';
import pricingData from './pricingData.json'
import styles from './Pricing.module.sass';

export default function Pricing() {

  const getParagraths = (item) => item.content.map((content) =>
    <p className={styles.paragrath}>
      {content.paragraph}
      <a href={content.link?.path} className={styles.link}>{content.link?.content}</a>
    </p>
  );

  const getBenefits = (item) =>
    item.benefits ? <ul>
      {item.benefits.map((item) =>
        <li className={styles.benefitsItem}>{item.content}</li>
      )}
    </ul> : null

  const getListItems = (item) => item.body.map((listItem) =>
    <li className={styles.listItem}>
      {Array.isArray(listItem.content) ? getParagraths(listItem) : <p>{listItem.content}</p>}
      {getBenefits(listItem)}
    </li>
  );

  return (
    <div className={styles.container}>
      {
        pricingData.map((item) =>
          <div>
            <div className={styles.header}>
              <h3 className={styles.title}>{item.header.title}</h3>
              <p>{item.header.desc}</p>
              <p>us${item.header.price}</p>
            </div>
            <ul className={styles.body}>{getListItems(item)}</ul>
          </div>
        )
      }
    </div>

  )
}
