import React from 'react';
import cx from 'classnames';
import ListItem from '../ListItem';
import styles from './Body.module.sass';
import CONSTANTS from '../../../constants';
const { EXTEND_BOX_WIDTH } = CONSTANTS;


export default function Body(props) {
  const { isHiddenItem, width, getBoxColor, index, bodyContent } = props;

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

  const getListItems = bodyContent.map((list) =>
    <li className={styles.listItem}>
      <ListItem type='p' popupContent={list.desc} className={styles.mainItem}>
        {Array.isArray(list.content) ? getParagraths(list) : list.content}
      </ListItem>
      {list.benefits ? getBenefits(list) : undefined}
    </li>
  );

  const bodyClasses = cx(
    styles.body,
    (isHiddenItem && width < EXTEND_BOX_WIDTH) ? styles.minimized : styles.extended
  );

  return (
    <ul className={bodyClasses}>
      {getListItems}
      <button className={styles.button} style={getBoxColor('backgroundColor', index)}>start</button>
    </ul>
  )
}
