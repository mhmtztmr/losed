import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from '../../components/LostListItem/LostListItem.css';

// Import Actions
import { fetchLost } from '../../LostActions';

// Import Selectors
import { getLost } from '../../LostReducer';

export function LostDetailPage(props) {
  return (
    <div>
      <Helmet title={props.lost.title} />
      <div className={`${styles['single-lost']} ${styles['lost-detail']}`}>
        <h3 className={styles['lost-title']}>{props.lost.title}</h3>
        <p className={styles['author-name']}><FormattedMessage id="by" /> {props.lost.name}</p>
        <p className={styles['lost-desc']}>{props.lost.content}</p>
      </div>
    </div>
  );
}

// Actions required to provide data for this component to render in sever side.
LostDetailPage.need = [params => {
  return fetchLost(params.cuid);
}];

// Retrieve data from store as props
function mapStateToProps(state, props) {
  return {
    lost: getLost(state, props.params.cuid),
  };
}

LostDetailPage.propTypes = {
  lost: PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    // slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(LostDetailPage);
