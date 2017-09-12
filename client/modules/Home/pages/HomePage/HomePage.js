import React from 'react';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';

function HomePage() {
  return (
    <div>
      <div>
        <Link to={'/login'} >
          Login
        </Link>
        <Link to={'/signup'} >
          Signup
        </Link>
      </div>
      <div>
        <Link to={'/posts'} >
          Posts
        </Link>
        <RaisedButton type="submit" label="Material UI Test Button" primary />
      </div>
    </div>
  );
}

HomePage.contextTypes = {
  router: React.PropTypes.object,
};

export default HomePage;
