import React from 'react';
import { Link } from 'react-router-dom';

const WorkHome = () => {
  return (
    <main>
      {' '}
      <div className="container">
        <div className="mainvisual">
          <div className="mainvisual__wrap" style={{ zIndex: 69 }}>
            <div className="mainvisual__bg">
              <span className="icon --large" />
              <span className="icon --nomal" />
            </div>
            <p className="mainvisual__icon">
              <img src="/assets/images/nodes/icon_mv.svg" alt="images" />
            </p>
            <p className="mainvisual__ttl">Connect New Worker</p>
            <p className="mainvisual__txt">
              Connect running io.net services, you can install more service
              <br /> packages to have more earnings and hiring rate.
            </p>
            <Link to="/worker/create" className="mainvisual__btn_node">
              Connect New Worker
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default WorkHome;
