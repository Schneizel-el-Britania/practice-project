import React from 'react';
import cx from 'classnames';
import styles from './Header.module.sass';
import CONSTANTS from '../../../constants';
const { EXTEND_BOX_WIDTH } = CONSTANTS;

export default function Header(props) {
  const { isHiddenItem, setHidden, width, getBoxColor, index, headerContent: { title, desc, price } } = props;
  const headerClasses = cx(styles.header, (isHiddenItem || width >= EXTEND_BOX_WIDTH) ? undefined : styles.showBorder);
  const minusClasses = cx(styles.minus, 'fa fa-minus');

  const expandBox = () => setHidden((isHidden) => {
    if (width < EXTEND_BOX_WIDTH) {
      const result = [...isHidden];
      result[index] = !isHidden[index];
      return result;
    }
    return isHidden
  });

  return (
    <div
      className={headerClasses}
      style={getBoxColor('borderColor', index)}
      onClick={expandBox}
    >
      <h3 className={styles.title} style={getBoxColor('color', index)}>{title}</h3>
      <p className={styles.desc}>{desc}</p>
      <p className={styles.price} style={getBoxColor('color', index)}>us${price}</p>
      <i className={minusClasses} style={getBoxColor('color', index)}></i>
    </div>
  )
}
