import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from './FoundListItem.css';

function FoundListItem(props) {
  return (
    <div className={styles['single-found']}>
      <h3 className={styles['found-title']}>
        <Link to={`/founds/${props.found.slug}-${props.found.cuid}`} >
          {props.found.title}
        </Link>
      </h3>
      <p className={styles['author-name']}><FormattedMessage id="by" /> {props.found.name}</p>
      <p className={styles['found-desc']}>{props.found.content}</p>
      <p className={styles['found-action']}><a href="#" onClick={props.onDelete}><FormattedMessage id="deleteFound" /></a></p>
      <hr className={styles.divider} />
    </div>
  );
}

FoundListItem.propTypes = {
  found: PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default FoundListItem;
