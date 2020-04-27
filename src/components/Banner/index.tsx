import React from 'react';

import './Banner.scss';

interface BannerProps {
  name: string;
}

const Banner: React.FC<BannerProps> = ({ name }) => (
  <div className="banner">
    <span className="banner__text">
      Hello,
      {name}!
    </span>
  </div>
);

export default Banner;
