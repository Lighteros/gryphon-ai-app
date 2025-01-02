import React from "react";
import "./style.css";

const ComingSoon = () => {
  return (
    <div className="container-coming_soon" style={{ margin: 0 }}>
      <div className="gallery" style={{ position: "fixed", padding: 0 }}>
        <div id="background-image-top"></div>
        <div className="gallery__row">
          {/* <div className="gallery__list list-image">
            {generateImageItems(11)}
            <div className="gallery__reapeat">{generateImageItems(11)}</div>
          </div> */}
        </div>
        <div className="gallery__row">
          {/* <div className="gallery__list list-image">
            {generateImageItems(11)}
            <div className="gallery__reapeat">{generateImageItems(11)}</div>
          </div> */}
        </div>
      </div>

      <div
        className="coming_top"
        style={{ display: "flex", justifyContent: "center", height: "auto" }}
      >
        <img
          src="/assets/images/banner/coming_soon_phone.png"
          style={{ height: "50vh", objectFit: "cover" }}
          alt="banner"
        />
      </div>
      <div className="coming_bot">
        <div className="coming_box">
          <div className="coming_text">
            <h3>Coming soon</h3>
            <h5>Stay tuned!</h5>
            <p>
              The platform is moving into final developments and getting ready
              to finally launch internationally
            </p>
          </div>

          <div className="coming_icon">
            <div className="icon_app-store">
              <img
                src="/assets/images/icon_app_store.png"
                alt="icon_app_store"
              />
              <img
                src="/assets/images/text_app_store.png"
                alt="text_app_store"
              />
            </div>
            <div className="icon_gg-play">
              <img src="/assets/images/icon_gg_play.png" alt="icon_gg_play" />
              <img src="/assets/images/text_gg_play.png" alt="text_gg_play" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
