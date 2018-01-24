import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// Import Components
import FoundList from '../../components/FoundList';
import FoundCreateWidget from '../../components/FoundCreateWidget/FoundCreateWidget';

// Import Actions
import { addFoundRequest, fetchFounds, deleteFoundRequest } from '../../FoundActions';

// Import Selectors
import { getFounds } from '../../FoundReducer';

class FoundListPage extends Component {
  componentDidMount() {
    this.props.dispatch(fetchFounds());
  }

  handleDeleteFound = found => {
    if (confirm('Do you want to delete this found')) { // eslint-disable-line
      this.props.dispatch(deleteFoundRequest(found));
    }
  };

  handleAddFound = (name, title, content) => {
    this.props.dispatch(addFoundRequest({ name, title, content }));
  };

  render() {
    return (
      <div>
        <FoundCreateWidget addFound={this.handleAddFound} showAddFound />
        <FoundList handleDeleteFound={this.handleDeleteFound} founds={this.props.founds} />
      </div>
    );
  }
}

// Actions required to provide data for this component to render in sever side.
FoundListPage.need = [() => { console.log('fethserverrr'); return fetchFounds(); }];  // eslint-disable-line

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    founds: getFounds(state),
  };
}


FoundListPage.propTypes = {
  founds: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  })).isRequired,
  dispatch: PropTypes.func.isRequired,
};

FoundListPage.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(FoundListPage);
