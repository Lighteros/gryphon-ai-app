import React from 'react';
import FadeIn from '../components/Animated/FadeIn';
import { Link } from 'react-router-dom';
import { APP_ROUTE } from '../routes/link';


const Landing = () => {

  let delay = 0;
  return (
    <div className="content-page">
      <div className="p-content content-left m-l">
        <div className="p-content__wrap">
          <div className="edition">
            <FadeIn index={delay++}>
              <div className="top-page" style={{ paddingBottom: 8 }}>
                <h2 className="top-text-page">
                  Explore Popular <span style={{ color: '#ffffff' }}>Tools</span>{' '}
                </h2>
                <img src="/assets/images/icon_email/icon-result-btn.png" alt="images" />
              </div>
              <p className="description-social" style={{ paddingBottom: 16 }}>
                AI tools to take your photos and generations to the next level.{' '}
              </p>
            </FadeIn>
            <div className="feature-card__container">
              <Link to={'/' + APP_ROUTE.TEXT_TO_IMAGE.routeName} className="feature-card">
                <img src="/assets/images/subtract.jpg?v=1" alt="images" />
                <p className="feature-card__body"></p>
                <div className="feature-card__bottom">
                  <div className="feature-card__button">
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.35457 5.72201H5.42049V9.65609H4.10913V5.72201H0.175049V4.41065H4.10913V0.476562H5.42049V4.41065H9.35457V5.72201Z"
                        fill="#FAFAFA"
                      />
                    </svg>
                  </div>
                  <h5>Text to Image</h5>
                </div>
              </Link>
              {/* <Link to={'/' + APP_ROUTE.IMAGE_TO_IMAGE.routeName} className="feature-card">
                <img src="/assets/images/subtract1.jpg?v=1" alt="images" />
                <div className="feature-card__body">
                  <img src="/assets/images/subtract1.jpg?v=1" alt="images" />
                </div>
                <div className="feature-card__bottom">
                  <div className="feature-card__button">
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.35457 5.72201H5.42049V9.65609H4.10913V5.72201H0.175049V4.41065H4.10913V0.476562H5.42049V4.41065H9.35457V5.72201Z"
                        fill="#FAFAFA"
                      />
                    </svg>
                  </div>
                  <h5>Image to Image</h5>
                </div>
              </Link> */}
              <Link to={'/' + APP_ROUTE.TEXT_TO_VIDEO.routeName} className="feature-card">
                <img src="/assets/images/subtract2.jpg?v=1" alt="images" />
                <div className="feature-card__body"></div>
                <div className="feature-card__bottom">
                  <div className="feature-card__button">
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.35457 5.72201H5.42049V9.65609H4.10913V5.72201H0.175049V4.41065H4.10913V0.476562H5.42049V4.41065H9.35457V5.72201Z"
                        fill="#FAFAFA"
                      />
                    </svg>
                  </div>
                  <h5>Text to video</h5>
                </div>
              </Link>
              <Link to={'/' + APP_ROUTE.FACE_SWAP.routeName} className="feature-card">
                <img src="/assets/images/subtract4.jpg?v=1" alt="images" />
                <div className="feature-card__body"></div>
                <div className="feature-card__bottom">
                  <div className="feature-card__button">
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.35457 5.72201H5.42049V9.65609H4.10913V5.72201H0.175049V4.41065H4.10913V0.476562H5.42049V4.41065H9.35457V5.72201Z"
                        fill="#FAFAFA"
                      />
                    </svg>
                  </div>
                  <h5>Swap Face Image</h5>
                </div>
              </Link>
              <Link to={'/' + APP_ROUTE.REFACE_VIDEO.routeName} className="feature-card">
                <img src="/assets/images/subtract3.jpg?v=1" alt="images" />
                <div className="feature-card__body"></div>
                <div className="feature-card__bottom">
                  <div className="feature-card__button">
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.35457 5.72201H5.42049V9.65609H4.10913V5.72201H0.175049V4.41065H4.10913V0.476562H5.42049V4.41065H9.35457V5.72201Z"
                        fill="#FAFAFA"
                      />
                    </svg>
                  </div>
                  <h5>Swap Face Video</h5>
                </div>
              </Link>
              <Link to={'/' + APP_ROUTE.ARCHITECT_IMAGE.routeName} className="feature-card">
                <img src="/assets/images/subtract5.jpg?v=1" alt="images" />
                <div className="feature-card__body"></div>
                <div className="feature-card__bottom">
                  <div className="feature-card__button">
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.35457 5.72201H5.42049V9.65609H4.10913V5.72201H0.175049V4.41065H4.10913V0.476562H5.42049V4.41065H9.35457V5.72201Z"
                        fill="#FAFAFA"
                      />
                    </svg>
                  </div>
                  <h5>Architect</h5>
                </div>
              </Link>
              <Link to={'/' + APP_ROUTE.FACE_DANCE.routeName} className="feature-card">
                <img src="/assets/images/subtract1.jpg?v=1" alt="images" />
                <div className="feature-card__body"></div>
                <div className="feature-card__bottom">
                  <div className="feature-card__button">
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.35457 5.72201H5.42049V9.65609H4.10913V5.72201H0.175049V4.41065H4.10913V0.476562H5.42049V4.41065H9.35457V5.72201Z"
                        fill="#FAFAFA"
                      />
                    </svg>
                  </div>
                  <h5>Face Dance</h5>
                </div>
              </Link>
              {/* <Link to={'/' + APP_ROUTE.FACE_DANCE.routeName} className="feature-card">
                <img src="/assets/images/subtract5.jpg?v=1" alt="images" />
                <div className="feature-card__body"></div>
                <div className="feature-card__bottom">
                  <div className="feature-card__button">
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.35457 5.72201H5.42049V9.65609H4.10913V5.72201H0.175049V4.41065H4.10913V0.476562H5.42049V4.41065H9.35457V5.72201Z"
                        fill="#FAFAFA"
                      />
                    </svg>
                  </div>
                  <h5>{APP_ROUTE.FACE_DANCE.name}</h5>
                </div>
              </Link> */}
              {/* <Link to={'/' + APP_ROUTE.IMAGE_TO_VIDEO.routeName} className="feature-card">
                <img src="/assets/images/subtract2.jpg" alt="images" />
                <div className="feature-card__body">
                   
                </div>
                <div className="feature-card__bottom">
                  <div className="feature-card__button">
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.35457 5.72201H5.42049V9.65609H4.10913V5.72201H0.175049V4.41065H4.10913V0.476562H5.42049V4.41065H9.35457V5.72201Z"
                        fill="#FAFAFA"
                      />
                    </svg>
                  </div>
                  <h5>Text to video & image to video</h5>
                </div>
              </Link> */}
            </div>
          </div>

          {/* <h2 className="top-text-page" style={{ marginTop: 30 }}>
            Community <span style={{ color: '#ffffff' }}>Creations</span>{' '}
          </h2>
          <div
            style={{ border: '1px solid #1A1D21', padding: 30, borderRadius: 15, marginTop: 10 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
                <img src={img} />
                <div className="username">Artificium</div>
                <div className="timestamp">just now</div>
              </div>
              <div onClick={() => copyText()} style={{ cursor: 'pointer', userSelect: 'none' }}>
                <img src={Icons.icon_copy} />
              </div>
            </div>
            <div className="content">
              <p className="description-social">Sure thing! How about these spaceship names:</p>
              <div className="chip-container">
                <div className="chip">
                  <p>Starfire</p>
                  <div onClick={() => copyText()} style={{ cursor: 'pointer', userSelect: 'none' }}>
                    <img src={Icons.icon_copy} />
                  </div>
                </div>
                <div className="chip">
                  <p>Celestia</p>{' '}
                  <div onClick={() => copyText()} style={{ cursor: 'pointer', userSelect: 'none' }}>
                    <img src={Icons.icon_copy} />
                  </div>
                </div>
                <div className="chip">
                  <p>Cosmic Voyager</p>{' '}
                  <div onClick={() => copyText()} style={{ cursor: 'pointer', userSelect: 'none' }}>
                    <img src={Icons.icon_copy} />
                  </div>
                </div>

                <div style={{ paddingLeft: 10, cursor: 'pointer' }}>
                  <svg
                    width="5"
                    height="11"
                    viewBox="0 0 5 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.29721 2.03349C4.29721 3.06487 3.46111 3.90096 2.42973 3.90096C1.39835 3.90096 0.562256 3.06487 0.562256 2.03349C0.562256 1.00211 1.39835 0.166016 2.42973 0.166016C3.46111 0.166016 4.29721 1.00211 4.29721 2.03349Z"
                      fill="#686B6E"
                    />
                    <path
                      d="M4.29721 8.7564C4.29721 9.78778 3.46111 10.6239 2.42973 10.6239C1.39835 10.6239 0.562256 9.78778 0.562256 8.7564C0.562256 7.72502 1.39835 6.88892 2.42973 6.88892C3.46111 6.88892 4.29721 7.72502 4.29721 8.7564Z"
                      fill="#686B6E"
                    />
                  </svg>
                </div>
              </div>
              <p className="description-social">
                Here are a few concept arts that also might inspire you. Take a look!
              </p>
              <div className="image-grid">
                <img  src={img1}alt="Lion" />
                <img src={img2} alt="Lion" />
                <img  src={img3} alt="Lion" />
              </div>
              <div className="chip-container">
                <div className="chip" style={{ background: '#1A1D21' }}>
                  <p style={{ color: '#aaa' }}>Regenerate response</p>
                </div>
                <div className="chip" style={{ background: '#1A1D21', gap: 5 }}>
                  <p style={{ color: '#aaa' }}>Modify</p>{' '}
                  <RiArrowDropDownLine size={20} color="#aaa" />
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Landing;
