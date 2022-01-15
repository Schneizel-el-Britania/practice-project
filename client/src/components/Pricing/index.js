import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import pricingData from './pricingData.json'
import styles from './Pricing.module.sass';
import ListItem from './ListItem';
import CONSTANTS from '../../constants';
const { EXTEND_BOX_WIDTH } = CONSTANTS;

const boxColors = ['#e0b48d', '#e8b954', '#555', '#28d2d0'];

export default function Pricing() {

  const [width, setWidth] = useState(window.innerWidth);
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
          <i className="fa fa-check" />
          {benefit.content}
          <a href={benefit.link?.path} className={styles.link}>{benefit.link?.content}</a>
        </ListItem>
      )
    }</ul>

  const getListItems = (item) => item.body.map((list) =>
    <li className={styles.listItem}>
      <ListItem type='p' popupContent={list.desc} className={styles.mainItem}>
        {Array.isArray(list.content) ? getParagraths(list) : list.content}
      </ListItem>
      {list.benefits ? getBenefits(list) : undefined}
    </li>
  );

  const bodyClasses = (index) => cx(styles.body, (isHidden[index] && width < EXTEND_BOX_WIDTH) ? styles.minimized : styles.extended);
  const headerClasses = (index) => cx(styles.header, (isHidden[index] || width >= EXTEND_BOX_WIDTH) ? undefined : styles.showBorder);
  const minusClasses = cx(styles.minus, 'fa fa-minus');

  const expandBox = (index) => setHidden(() => {
    if (width < EXTEND_BOX_WIDTH) {
      const result = [...isHidden];
      result[index] = !isHidden[index];
      return result;
    }
    return isHidden
  });

  useEffect(() => {
    const callback = () => setWidth(window.innerWidth)
    window.addEventListener('resize', callback);
    return () => window.removeEventListener('resize', callback);
  }, [])

  const getBoxColor = (property, index, condition = true) =>
    ({ [property]: condition ? boxColors[index] : undefined });

  return (
    <div className={styles.container}>
      {
        pricingData.map((item, index) =>
          <div className={styles.box} style={getBoxColor('borderColor', index)}>
            <div
              className={headerClasses(index)}
              style={getBoxColor('borderColor', index, (width >= EXTEND_BOX_WIDTH))}
              onClick={() => expandBox(index)}
            >
              <h3 className={styles.title} style={getBoxColor('color', index)}>{item.header.title}</h3>
              <p className={styles.desc}>{item.header.desc}</p>
              <p className={styles.price} style={getBoxColor('color', index)}>us${item.header.price}</p>
              <i className={minusClasses} style={getBoxColor('color', index)}></i>
            </div>
            <ul className={bodyClasses(index)}>
              {getListItems(item)}
              <button className={styles.button} style={getBoxColor('backgroundColor', index)}>start</button>
            </ul>
          </div>
        )
      }
    </div>
  )
}
