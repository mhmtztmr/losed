import React, { PropTypes } from 'react';

// Import Components
import FoundListItem from './FoundListItem/FoundListItem';

function FoundList(props) {
  return (
    <div className="listView">
      {
        props.founds.map(found => (
          <FoundListItem
            found={found}
            key={found.cuid}
            onDelete={() => props.handleDeleteFound(found.cuid)}
          />
        ))
      }
    </div>
  );
}

FoundList.propTypes = {
  founds: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  })).isRequired,
  handleDeleteFound: PropTypes.func.isRequired,
};

export default FoundList;
