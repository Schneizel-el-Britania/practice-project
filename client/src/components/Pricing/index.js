import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import pricingData from './pricingData.json'
import ListItem from './ListItem';
import styles from './Pricing.module.sass';
import CONSTANTS from '../../constants';
import Header from './Header';
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

  useEffect(() => {
    const callback = () => setWidth(window.innerWidth)
    window.addEventListener('resize', callback);
    return () => window.removeEventListener('resize', callback);
  }, [])

  const getBoxColor = (property, index) =>
    ({ [property]: boxColors[index] });

  return (
    <div className={styles.container}>
      {
        pricingData.map((item, index) =>
          <div className={styles.box} style={getBoxColor('borderColor', index)}>
            <Header
              width={width}
              isHiddenItem={isHidden[item]} setHidden={setHidden}
              index={index} headerContent={item.header}
              getBoxColor={getBoxColor}
            />
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
