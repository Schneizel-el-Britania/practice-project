import React from 'react';
import pricingData from './pricingData.json'
import styles from './Pricing.module.sass';
import ListItem from './ListItem';


export default function Pricing() {

  const getParagraths = (item) => item.content.map((content) =>
    <p className={styles.paragrath}>
      {content.paragraph}
      <a href={content.link?.path} className={styles.link}>{content.link?.content}</a>
    </p>
  );

  const getBenefits = (item) =>
    <ul>{
      item.benefits.map((benefit) =>
        <ListItem type='li' className={styles.benefitsItem} popupContent={benefit.desc}>
          {benefit.content}
        </ListItem>
      )
    }</ul>

  const getListItems = (item) => item.body.map((list) =>
    <li className={styles.listItem}>
      <ListItem type='p' popupContent={list.desc}>
        {Array.isArray(list.content) ? getParagraths(list) : list.content}
      </ListItem>
      {list.benefits ? getBenefits(list) : undefined}
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