import React, { useEffect, useState } from 'react';
import pricingData from './pricingData.json'
import styles from './Pricing.module.sass';
import Header from './Header';
import Body from './Body';

const boxColors = ['#e0b48d', '#e8b954', '#555', '#28d2d0'];

export default function Pricing() {

  const [width, setWidth] = useState(window.innerWidth);
  const [isHidden, setHidden] = useState(Array(pricingData.length).fill(true));

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
              isHiddenItem={isHidden[index]} setHidden={setHidden}
              index={index} headerContent={item.header}
              getBoxColor={getBoxColor}
            />
            <Body
              width={width}
              isHiddenItem={isHidden[index]}
              index={index} bodyContent={item.body}
              getBoxColor={getBoxColor} />
          </div>
        )
      }
    </div>
  )
}
