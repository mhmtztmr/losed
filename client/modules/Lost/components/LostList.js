import React, { PropTypes } from 'react';

// Import Components
import LostListItem from './LostListItem/LostListItem';

function LostList(props) {
  return (
    <div className="listView">
      {
        props.losts.map(lost => (
          <LostListItem
            lost={lost}
            key={lost.cuid}
            onDelete={() => props.handleDeleteLost(lost.cuid)}
          />
        ))
      }
    </div>
  );
}

LostList.propTypes = {
  losts: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  })).isRequired,
  handleDeleteLost: PropTypes.func.isRequired,
};

export default LostList;
