import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from '../../components/FoundListItem/FoundListItem.css';

// Import Actions
import { fetchFound } from '../../FoundActions';

// Import Selectors
import { getFound } from '../../FoundReducer';

export function FoundDetailPage(props) {
  return (
    <div>
      <Helmet title={props.found.title} />
      <div className={`${styles['single-found']} ${styles['found-detail']}`}>
        <h3 className={styles['found-title']}>{props.found.title}</h3>
        <p className={styles['author-name']}><FormattedMessage id="by" /> {props.found.name}</p>
        <p className={styles['found-desc']}>{props.found.content}</p>
      </div>
    </div>
  );
}

// Actions required to provide data for this component to render in sever side.
FoundDetailPage.need = [params => {
  return fetchFound(params.cuid);
}];

// Retrieve data from store as props
function mapStateToProps(state, props) {
  return {
    found: getFound(state, props.params.cuid),
  };
}

FoundDetailPage.propTypes = {
  found: PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(FoundDetailPage);
