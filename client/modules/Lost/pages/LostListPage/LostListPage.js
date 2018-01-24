import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// Import Components
import LostList from '../../components/LostList';
import LostCreateWidget from '../../components/LostCreateWidget/LostCreateWidget';

// Import Actions
import { addLostRequest, fetchLosts, deleteLostRequest } from '../../LostActions';

// Import Selectors
import { getLosts } from '../../LostReducer';

class LostListPage extends Component {
  componentDidMount() {
    this.props.dispatch(fetchLosts());
  }

  handleDeleteLost = lost => {
    if (confirm('Do you want to delete this lost')) { // eslint-disable-line
      this.props.dispatch(deleteLostRequest(lost));
    }
  };

  handleAddLost = (name, title, content) => {
    this.props.dispatch(addLostRequest({ name, title, content }));
  };

  render() {
    return (
      <div>
        <LostCreateWidget addLost={this.handleAddLost} showAddLost />
        <LostList handleDeleteLost={this.handleDeleteLost} losts={this.props.losts} />
      </div>
    );
  }
}

// Actions required to provide data for this component to render in sever side.
LostListPage.need = [() => { console.log('fethserverrr'); return fetchLosts(); }];  // eslint-disable-line

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    losts: getLosts(state),
  };
}


LostListPage.propTypes = {
  // losts: PropTypes.arrayOf(PropTypes.shape({
  //   name: PropTypes.string.isRequired,
  //   title: PropTypes.string.isRequired,
  //   content: PropTypes.string.isRequired,
  // })).isRequired,
  dispatch: PropTypes.func.isRequired,
};

LostListPage.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(LostListPage);
