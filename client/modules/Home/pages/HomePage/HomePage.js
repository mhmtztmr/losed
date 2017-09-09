import React from 'react';
import { Link } from 'react-router';

function HomePage() {
  return (
    <div>
      <Link to={'/posts'} >
        Posts
      </Link>
    </div>
  );
}

HomePage.contextTypes = {
  router: React.PropTypes.object,
};

export default HomePage;
