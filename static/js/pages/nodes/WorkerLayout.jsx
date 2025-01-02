import React from 'react';
import '../../assets/css/style_node.css';
import { useUser } from '../../context/AuthContext';
import { toAvatarUrl } from '../../utils/file';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { RiDiscordLine } from 'react-icons/ri';
import { FaXTwitter } from 'react-icons/fa6';
import { LiaTelegram } from 'react-icons/lia';
const WorkerLayout = () => {
  const { user, fetchUserData } = useUser();
  const location = useLocation();
  return (
    <div className="" style={{ overflow: 'auto', background: '#000' }}>
      <header className="header-node">
        <div className="header-node-wraper">
          <h1 className="header-node-logo">
            <span className="header-node-logo__ttl">
              <img src="/assets/images/nodes/logo.svg" alt="Heaven World AI" />
            </span>
            <span className="header-node-logo__sub">WORKER</span>
          </h1>
          <div className="header-node-earn">
            <p className="header-node-earn__ttl">
              Claim Earnings{' '}
              <span className="icon">
                <img src="/assets/images/nodes/logo_icon.svg" alt="Heaven World AI" />
              </span>
            </p>
            <p className="header-node-earn__txt">
              Coin <span className="number">0.00</span>
            </p>
          </div>
          <Link to="/worker/create" className="header-node-connect">
            Connect New Worker
          </Link>
          <div className="header-node-info">
            <p className="header-node-info__ttl">Docs</p>
            <p className="header-node-info__noti" />
            <Link to="/setting-full" className="header-node-info__acc">
              <img src={toAvatarUrl(user?.avatar_url)} alt="images" style={{ borderRadius: 99 }} />
            </Link>
          </div>
        </div>
      </header>{' '}
      {/* <Link
          to="/"
          className="mainvisual__btn_node"
          style={{ maxWidth: 200, justifyContent: 'center', margin: 20 }}
        >
          <p> Back to app</p>
        </Link> */}
      <main>
        <ul className="menu">
          {' '}
          <li className="menu__item">
            <Link to="/" className="menu__anchor">
              <p className=" btn-back" style={{ marginBottom: 0, color: 'white' }}>
                {' '}
                Back to app
              </p>
            </Link>{' '}
          </li>
          <li className="menu__item">
            <Link
              to="/worker/create"
              className={`menu__anchor ${location.pathname === '/worker/create' ? 'is-active' : ''}`}
            >
              Workers
            </Link>
          </li>
          <li className="menu__item">
            <Link
              to="/worker/devices"
              className={`menu__anchor ${location.pathname === '/worker/devices' ? 'is-active' : ''}`}
            >
              Earnings &amp; Rewards
            </Link>
          </li>
        </ul>
        <Outlet />
      </main>
      <footer className="footer-node">
        <div className="footer-node-wraper">
          <p className="footer__btn" />
          <div className="footer-node-row">
            <div className="footer-node-row__item --left">
              <p className="footer__logo">
                <img src="/assets/images/nodes/logo_icon.svg" alt="images" />
              </p>
              <p className="footer__ttl">All services are online</p>
            </div>
            <div className="footer-node-row__item --right">
              <div className="footer-node-social">
                <a
                  href="https://x.com/Gryphon_AI"
                  target="_blank"
                  className="footer-node-social__item"
                >
                  <FaXTwitter size={26} />
                </a>
                <a
                  href="https://t.me/Gryphon_AI"
                  target="_blank"
                  className="footer-node-social__item"
                >
                  <LiaTelegram size={30} />
                </a>
              </div>
              <p className="footer__copyright">Stability&nbsp;World @Copyright2024</p>
            </div>
          </div>
          <p className="footer__note">
            The IO tokens will not be offered in the United States or to U.S persons or to residents
            of certain other prohibited jurisdictions.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default WorkerLayout;
