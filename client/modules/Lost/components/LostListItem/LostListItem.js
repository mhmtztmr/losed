import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from './LostListItem.css';

function LostListItem(props) {
  return (
    <div className={styles['single-lost']}>
      <h3 className={styles['lost-title']}>
        <Link to={`/losts/${props.lost.slug}-${props.lost.cuid}`} >
          {props.lost.title}
        </Link>
      </h3>
      <p className={styles['author-name']}><FormattedMessage id="by" /> {props.lost.name}</p>
      <p className={styles['lost-desc']}>{props.lost.content}</p>
      <p className={styles['lost-action']}><a href="#" onClick={props.onDelete}><FormattedMessage id="deleteLost" /></a></p>
      <hr className={styles.divider} />
    </div>
  );
}

LostListItem.propTypes = {
  lost: PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default LostListItem;
