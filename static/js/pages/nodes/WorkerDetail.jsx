import React from 'react';
import { useParams } from 'react-router-dom';
import { useNodeWorkerInfo } from '../../services/nodeWorker';
import { copyText, createCommandWorker } from '../../utils';
import withAuth from '../../context/withAuth';

const WorkerDetail = () => {
  const { id } = useParams();
  const detail = useNodeWorkerInfo(id);
  const data = detail.data?.data;
  const command = createCommandWorker({
    user_code: data?.user_code,
    device_name: data?.device_name,
    device_id: data?.device_id,
    os: data?.os
  });
  return (
    <div className="sec --bor">
      <div className="container sec-row detail">
        <div className="sec-row__item --bor">
          <div className="detail-area">
            <p className="detail-area__ttl">TOTAL EARNINGS</p>
            <div className="detail-sum">
              <span className="detail-sum__num">0</span>
              <span className="detail-sum__logo">
                <img src="/assets/images/nodes/logo_icon.svg" alt="images" />
              </span>
              <span className="detail-sum__txt">COIN</span>
            </div>
          </div>
          <div className="detail-area">
            <div className="detail-per">
              <div className="detail-per__txt">
                <span className="date">Last 30 days (July 8 - November 18)</span>
                <span className="time">
                  <span className="number">19%</span> Uptime
                </span>
              </div>
              <p className="detail-per__line" style={{ width: '19%' }} />
            </div>
          </div>
          <p className="detail__ttl">Re-Run docker command</p>
          <p className="detail__sub">
            If you need assistance connecting your workers to IO network, please contact our support
            team via chat.
          </p>
          <div className="detail-box">
            <p className="download__ttl">Stop all container and rin launch command</p>
            <div className="download-box__body">
              <p className="download__sub">Run the command to launch binary</p>
              <div className="download-link">
                <p className="download-link__txt">{command}</p>
                <a className="download-link__icon --copy" onClick={() => copyText(command)} />
              </div>
              <div className="download-link">
                <p className="text-warning">
                  After running the commands please give it around 10 minutes to show as connected
                </p>
              </div>
            </div>
          </div>
          <div className="detail-tag">
            <ul>
              <li className="is-select">
                Services <span className=" number">3</span>
              </li>
              <li>
                Jobs <span className="number">0</span>
              </li>
              <li>
                Notifications <span className="number">0</span>
              </li>
            </ul>
          </div>
          <div className="detail-status">
            <div className="detail-status__body">
              <span className="detail-status__icon">
                <img src="/assets/images/nodes/logo_icon.svg" alt="images" />
              </span>
              <span className="detail-status__ttl">IO Version Control</span>
            </div>
            <span className="detail-status__txt">Disconnected</span>
          </div>
          <div className="detail-status">
            <div className="detail-status__body">
              <span className="detail-status__icon">
                <img src="/assets/images/nodes/logo_icon.svg" alt="images" />
              </span>
              <span className="detail-status__ttl">IO Monitor</span>
            </div>
            <span className="detail-status__txt">Disconnected</span>
          </div>
          <div className="detail-status">
            <div className="detail-status__body">
              <span className="detail-status__icon">
                <img src="/assets/images/nodes/logo_icon.svg" alt="images" />
              </span>
              <span className="detail-status__ttl">Ray App</span>
            </div>
            <span className="detail-status__txt">Disconnected</span>
          </div>
        </div>
        <div className="sec-row__item">
          <div className="detail-info">
            <div className="detail-info__head">
              <p className="item">
                <span className="icon">
                  <img src="/assets/images/nodes/icon_nvidia.svg" alt="images" />
                </span>
                <span className="txt">Geforce GTX 1080 Ti</span>
                <span className="number">x1</span>
              </p>
              <p className="item">
                <span className="icon">
                  <img src="/assets/images/nodes/icon_windown_02.svg" alt="images" />
                </span>
                <span className="txt --large">{data?.os}</span>
              </p>
            </div>
            <p className="detail-info__ttl">Uptime Percentage</p>
            <p className="detail-info__image">
              <img src="/assets/images/nodes/detail_img_01.svg" alt="images" />
            </p>
            <p className="detail-info__copy">
              <span className="ttl">Device ID</span>
              <span className="txt">{data?.device_id}</span>
              <span className="icon" onClick={() => copyText(data?.device_id)} />
            </p>
            <p className="detail-info__ttl">Connectivity Tier</p>
            <p className="detail-info__sub">High Speed</p>
            <div className="detail-info__row">
              <p className="item">
                <span className="number">668 Mbps</span>
                <span className="txt --primary">Download</span>
              </p>
              <p className="item">
                <span className="number">324 Mbps</span>
                <span className="txt --warning">Upload</span>
              </p>
            </div>
            <p className="detail-info__ttl">Security Compliance</p>
            <p className="detail-info__key">E2E Encrypted</p>
            <p className="detail-info__ttl">Locations</p>
            <div className="detail-info__location">
              <p className="item">
                <span className="icon">
                  <img src="/assets/images/nodes/location_icon.svg" alt="images" />
                </span>
                <span className="txt">Vietnam</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(WorkerDetail,"/worker");
