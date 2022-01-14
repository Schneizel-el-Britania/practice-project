import React, { useEffect, useState } from 'react';
import pricingData from './pricingData.json'
import styles from './Pricing.module.sass';
import ListItem from './ListItem';

export default function Pricing() {

  const [width, setWidth] = useState(0);
  const [isHidden, setHidden] = useState(Array(pricingData.length).fill(true));

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
          <a href={benefit.link?.path} className={styles.link}>{benefit.link?.content}</a>
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

  const bodyClass = (index) => (isHidden[index] && width < 768) ? styles.minimized : styles.extended;
  const expandBox = (index) => setHidden(() => {
    const result = [...isHidden];
    result[index] = !isHidden[index];
    return result;
  });

  useEffect(() => {
    const callback = () => setWidth(window.innerWidth)
    window.addEventListener('resize', callback);
    return () => window.removeEventListener('resize', callback);
  }, [])

  return (
    <div className={styles.container}>
      {
        pricingData.map((item, index) =>
          <div onClick={() => expandBox(index)}>
            <div className={styles.header}>
              <h3 className={styles.title}>{item.header.title}</h3>
              <p>{item.header.desc}</p>
              <p>us${item.header.price}</p>
            </div>
            <ul className={bodyClass(index)}>{getListItems(item)}</ul>
          </div>
        )
      }
    </div>
  )
}
