import React from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { browserHistory } from 'react-router';

class TopBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMenuOpened: false,
    };
  }

  navigateToPage(page) {
    this.closeNavigationMenu();
    browserHistory.push(page);
  }

  toggleNavigationMenu() {
    const { isMenuOpened } = this.state;
    this.setState({ isMenuOpened: !isMenuOpened });
  }

  closeNavigationMenu() {
    this.setState({ isMenuOpened: false });
  }

  render() {
    return (
      <div>
        <Drawer
          docked={false}
          onRequestChange={this.closeNavigationMenu.bind(this)}
          open={this.state.isMenuOpened}
        >
          <MenuItem
            onTouchTap={() => this.navigateToPage('/profile')}
          >
            Profile
          </MenuItem>
          <MenuItem
            onTouchTap={() => this.navigateToPage('/carriers')}
          >
            Carriers
          </MenuItem>
          <MenuItem>Menu Item 2</MenuItem>
        </Drawer>
        <AppBar
          title="SHIPTR"
          onLeftIconButtonTouchTap={this.toggleNavigationMenu.bind(this)}
        />
      </div>
    );
  }
}

export default TopBar;
