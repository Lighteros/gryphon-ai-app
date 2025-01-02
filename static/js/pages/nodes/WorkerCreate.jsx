import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useStep } from '../../hooks/useStep';
import { useForm } from 'react-hook-form';
import { useNodeWorkerCreate, useNodeWorkerUpdate } from '../../services/nodeWorker';
import { onApiResponse } from '../../lib/query';
import { copyText, createCommandWorker, generateRandomString } from '../../utils';
import { useNodeWorkerGpuList } from '../../services/nodeWorker';

import { useToggle } from '../../hooks/useToggle';
import { Icons } from '../../constant/icon';
import Button from '../../components/Ui/Button';
import Modal from '../../components/Modal/Modal';
import LoadingIcon from '../../components/Ui/LoadingIcon';
import toast from '../../lib/toast';
import { useUser } from '../../context/AuthContext';
import withAuth from '../../context/withAuth';
const pageSize = 200;
export const NodeWokerOs = {
  LINUX: 'Linux',
  MACOS: 'macOS',
  WINDOWS: 'Windows'
};

const WorkerCreate = () => {
  const [searchGpu, setSearchGpu] = useState('');
  const { user } = useUser();
  const [openModalChangeName, toggleModalChangName] = useToggle(false);
  const [step, { goToNextStep, goToPrevStep, canGoToNextStep, canGoToPrevStep, setStep, reset }] =
    useStep(3);
  const { register, setValue, watch } = useForm({
    defaultValues: {
      device_id: crypto.randomUUID(),
      device_name: 'New-Device-' + generateRandomString(8),
      os: null,
      type: 'gpu'
    }
  });
  const { isPending, mutate } = useNodeWorkerCreate();
  const { data } = useNodeWorkerGpuList({
    page_index: 1,
    page_size: pageSize
  });

  const pageData = useMemo(() => {
    return data?.data?.records?.filter((item) => {
      return item.name?.toLowerCase().includes(searchGpu?.toLowerCase());
    });
  }, [data?.data, searchGpu]);
  const command = createCommandWorker({
    device_id: watch('device_id'),
    user_code: user?.code,
    device_name: watch('device_name'),
    os: watch('os')
  });
  return (
    <main>
      <div className="sec">
        <div className="container">
          <div className="sec-row">
            <div className="sec-row__item">
              <div className="sec-box">
                <Link to="/worker" className="btn-back">
                  Back to devices
                </Link>
                <p className="sec-ttl-node">
                  {watch('device_name')}
                  <span
                    className="icon"
                    onClick={() => {
                      toggleModalChangName();
                    }}
                  />
                </p>
                <p className="sec-txt">
                  Complete steps below to connect your device. If you need assistance connecting
                  your workers to IO network, please contact our support team via chat.
                </p>
                <p className="sec-note">
                  <a href="/privacy-policy" className="anchor" target="_blank">
                    Privacy Policy
                  </a>{' '}
                  and{' '}
                  <a href="/term-of-service" className="anchor" target="_blank">
                    Terms of Service
                  </a>{' '}
                  apply.
                </p>
              </div>
            </div>
            <div className="sec-row__item text-right">
              <p className="label-time">Waiting For Device to Connect...</p>
            </div>
          </div>
        </div>
      </div>

      <div className="sec --bor">
        {step === 1 && (
          <div className="container sec-row">
            <div className="sec-row__item --bor">
              <div className="sec-box">
                <div className="system">
                  <div className="system-row">
                    <div className="item">
                      <p className="sec-lead">1. Operating System</p>
                      <p className="system__note">Choose Operating System “OS”.</p>
                    </div>
                    <div className="item " onClick={goToNextStep}>
                      <button className="btn-linear" disabled={!watch().os}>
                        Next Step
                      </button>
                    </div>
                  </div>
                  <div className="system-select">
                    <label className="system-select__item">
                      <span className="system-select__logo">
                        <img src="/assets/images/nodes/icon_apple.svg" alt="images" />
                      </span>
                      <span className="system-select__ttl">MacOs</span>

                      <input
                        type="radio"
                        className="system-select__input"
                        value={NodeWokerOs.MACOS}
                        {...register('os')}
                      />
                      <span
                        className={`system-select__icon ${
                          watch().os === NodeWokerOs.MACOS ? 'is-active' : ''
                        }`}
                      />
                    </label>
                    <label className="system-select__item">
                      <span className="system-select__logo">
                        <img src="/assets/images/nodes/icon_windown.svg" alt="images" />
                      </span>
                      <span className="system-select__ttl">Windows</span>
                      <input
                        type="radio"
                        className="system-select__input"
                        value={NodeWokerOs.WINDOWS}
                        {...register('os')}
                      />
                      <span
                        className={`system-select__icon ${
                          watch().os === NodeWokerOs.WINDOWS ? 'is-active' : ''
                        }`}
                      />
                    </label>
                    <label className="system-select__item">
                      <span className="system-select__logo">
                        <img src="/assets/images/nodes/icon_ubutu.svg" alt="images" />
                      </span>
                      <span className="system-select__ttl">Ubuntu</span>
                      <input
                        type="radio"
                        className="system-select__input"
                        value={NodeWokerOs.LINUX}
                        {...register('os')}
                      />
                      <span
                        className={`system-select__icon ${
                          watch('os') === NodeWokerOs.LINUX ? 'is-active' : ''
                        }`}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="sec-row__item">
              <div className="step">
                <p className="step__ttl">Creation Steps</p>
                <div className="step-list">
                  <p className="step-list__item curent">Operating System</p>
                  <p className="step-list__item">Worker Type</p>
                  <p className="step-list__item">Script File</p>
                </div>
              </div>
            </div>
          </div>
        )}
        {step === 2 && (
          <div className="container sec-row">
            <div className="sec-row__item --bor">
              <div className="sec-box" style={{ maxWidth: '100%' }}>
                <div className="system">
                  <p className="btn-back" onClick={goToPrevStep}>
                    Back one step
                  </p>
                  <div className="system-row">
                    <div className="item">
                      <p className="sec-lead">2. Worker Type</p>
                      <p className="system__note">
                        If you choose GPU Worker and your device doesn't have GPU the setup will
                        fail.
                      </p>
                    </div>
                    <div
                      className="item"
                      onClick={() => {
                        // mutate(watch(), {
                        //   onSuccess(data) {
                        //     if (onApiResponse(data, true)) {
                        goToNextStep();
                        //     }
                        //   }
                        // });
                      }}
                    >
                      <button className="btn-linear" disabled={!watch().type}>
                      Next Step
                      </button>
                    </div>
                  </div>
                  <div className="system-select">
                    <label className="system-select__item" style={{ width: '100%' }}>
                      <span className="system-select__col ">
                        <span className="system-select__logo">
                          <img src="/assets/images/nodes/icon_gpu.svg" alt="images" />
                        </span>
                        <span className="system-select__ttl">GPU Worker</span>
                      </span>
                      <input
                        type="radio"
                        className="system-select__input"
                        name="system-01"
                        value="gpu"
                        {...register('type')}
                      />
                      <span
                        className={`system-select__icon ${
                          watch('type') === 'gpu' ? 'is-active' : ''
                        }`}
                      />
                    </label>
                  </div>
                </div>
              </div>
              <div className="support">
                <p className="support-ttl">List of supported GPUs</p>

                <div className="support-search">
                  <button className="support-search__btn" />
                  <input
                    type="text"
                    className="support-search__input"
                    placeholder="Search"
                    value={searchGpu}
                    onChange={(e) => setSearchGpu(e.target.value)}
                  />
                </div>
                <div className="support-body">
                  <ul className="support-list">
                    {pageData?.map((item) => (
                      <li className="support-list__item" key={item.id}>
                        <span className="icon">
                          <img src="/assets/images/nodes/icon_nvidia.svg" alt="images" />
                        </span>
                        {item.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="sec-row__item">
              <div className="step">
                <p className="step__ttl">Creation Steps</p>
                <div className="step-list">
                  <p className="step-list__item is-active">Operating System</p>
                  <p className="step-list__item curent">Worker Type</p>
                  <p className="step-list__item">Script File</p>
                </div>
              </div>
            </div>
          </div>
        )}
        {step === 3 && (
          <div className="container sec-row">
            <div className="sec-row__item --bor">
              <div className="system">
                <p className="btn-back" onClick={goToPrevStep}>
                  Back one step
                </p>
                <p className="sec-lead">Script File</p>
                <p className="sec-note ">Download Script File to Install Drivers</p>
              </div>
              <div className="download">
                <div className="download-box">
                  <p className="download__ttl">Download Docker Desktop</p>
                  <div className="download-box__body">
                    <p className="download__sub">Download Docker</p>
                    <div className="download-link">
                      <p className="download-link__txt">
                        https://www.docker.com/products/docker-desktop/
                      </p>
                      <a className="download-link__icon" />
                    </div>
                  </div>
                </div>
                <div className="download-box">
                  <p className="download__ttl">Click on the link and follow the steps</p>
                  <div className="download-box__body">
                    <p className="download__sub">Download Docker</p>
                    <div className="download-link">
                      <p className="download-link__txt">
                        https://developers.io.net/docs/installing-on-windows
                      </p>
                      <a className="download-link__icon" />
                    </div>
                    <div className="download-list">
                      <div className="download-list__item">
                        <span className="icon">
                          <img src="/assets/images/nodes/icon_check_02.svg" alt="images" />
                        </span>
                        1. CUDA Toolkit download and setup
                      </div>
                      <div className="download-list__item">
                        <span className="icon">
                          <img src="/assets/images/nodes/icon_install.svg" alt="images" />
                        </span>
                        2. Nvidia Drivers Installation
                      </div>
                    </div>
                  </div>
                </div>
                <div className="download-box">
                  <p className="download__ttl">Download binary and run the command</p>
                  <div className="download-box__body">
                    <p className="download__sub">Download executable at</p>
                    <div className="download-link">
                      <p className="download-link__txt">
                        https://github.com/ionet-official/io_launch_binaries/raw/main/io_net_launch_binary_windows.exe
                      </p>
                      <a className="download-link__icon" />
                    </div>
                    <p className="download__sub">Run the command to launch binary</p>
                    <div className="download-link">
                      <p className="download-link__txt">{command}</p>
                    </div>
                  </div>
                  <div className="download-center">
                    <span
                      className="download-copy"
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        copyText(command);
                      }}
                    >
                      Copy Code
                    </span>
                  </div>
                </div>
                <div className="download-box">
                  <p className="download__ttl">Download Docker Desktop</p>
                  <div className="download-box__body">
                    <div className="download-link">
                      <p className="download-link__txt">
                        If you need assistance connecting your workers to IO network, please contact
                        our support team via chat.
                      </p>
                    </div>
                    <div className="download-center">
                      <a href="#" className="download-connect">
                        Connect Device
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="sec-row__item">
              <div className="step">
                <p className="step__ttl">Creation Steps</p>
                <div className="step-list">
                  <p className="step-list__item is-active">Operating System</p>
                  <p className="step-list__item is-active">Worker Type</p>
                  <p className="step-list__item curent">Script File</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Modal isOpen={openModalChangeName} closeModal={toggleModalChangName}>
        <ModelChangeName
          onClose={toggleModalChangName}
          setValue={(pre) => setValue('device_name', pre)}
          watch={watch}
          id={null}
          check={false}
        />
      </Modal>
    </main>
  );
};

export default withAuth(WorkerCreate, '/worker');

export const ModelChangeName = ({ onClose, setValue, watch }) => {
  const [name, setName] = useState(watch('device_name'));
  const onSubmit = (e) => {
    e.preventDefault();
    if (name) {
      setValue(name);
      onClose();
    }
  };
  return (
    <div id="popup">
      <div className="popup__body" style={{ width: '60rem' }}>
        <div className="popup__content">
          <p className="popup__txt" style={{ marginBottom: 10 }}>
            Change name device
          </p>
          <div className="popup-form">
            <form onSubmit={onSubmit}>
              <label style={{ position: 'relative' }}>
                <img
                  src={Icons.icon_create}
                  alt="images"
                  style={{ position: 'absolute', left: 5, top: 12 }}
                />
                <input
                  tabIndex="1"
                  autoFocus={true}
                  className="form-control"
                  type="text"
                  placeholder="Name device"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </label>
              <Button type="submit" disabled={!name} style={{ marginTop: 20 }}>
                Change name
              </Button>
              <p className="popup-form__note">
                <Link onClick={() => onClose()} tabIndex={5}>
                  Cancel
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
