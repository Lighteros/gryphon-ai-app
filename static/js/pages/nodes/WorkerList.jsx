import React, { useMemo, useState } from 'react';
import { useNodeWorkerList, useNodeWorkerUpdate } from '../../services/nodeWorker';
import { useNavigate } from 'react-router-dom';
import { useToggle } from '../../hooks/useToggle';
import Modal from '../../components/Modal/Modal';

import toast from '../../lib/toast';
import { NodeWokerStatus } from '../../constant';
import { Icons } from '../../constant/icon';
import Button from '../../components/Ui/Button';
import withAuth from '../../context/withAuth';
const pageSize = 200;
const WorkerList = () => {
  const [openModal, toggleModal] = useToggle(false);
  const [searchQuery, setSearchQuery] = useState({
    name: undefined,
    status: undefined,
    page_index: 1,
    page_size: pageSize
  });
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const { data } = useNodeWorkerList(searchQuery);
  const { mutate, isPending } = useNodeWorkerUpdate();

  const newData = data?.data?.records;
  return (
    <div className="container">
      <div className="list">
        <div className="list-wrap">
          <div className="list-head">
            <div className="list-search">
              <button className="list-search__btn" />
              <input
                type="text"
                className="list-search__input"
                placeholder="Search"
                value={searchQuery.name}
                onChange={(e) => setSearchQuery((x) => ({ ...x, name: e.target.value }))}
              />
            </div>
            <div className="list-info">
              <p className="list-info__btn">Show all</p>
              <ul className="list-status">
                <li className="list-status__item">Running</li>
                <li className="list-status__item">Paused</li>
                <li className="list-status__item">Intactive</li>
                <li className="list-status__item">offline</li>
                <li className="list-status__item">Terminated</li>
                <li className="list-status__item">Unsupported</li>
                <li className="list-status__item">Blocked</li>
                <li className="list-status__item">Restart required</li>
              </ul>
            </div>
          </div>
          <div className="list-body">
            <table>
              <tbody>
                <tr>
                  <th>STATUS</th>
                  <th>WORKER NAME</th>
                  <th>HIRE STATUS</th>
                  <th>OS</th>
                  <th>UP FOR</th>
                  <th>CHIP/GPUS</th>
                </tr>
                {newData?.map((item, index) => (
                  <tr key={index} style={{ position: 'relative' }}>
                    <td className="list-body__status">
                      <p>{item?.status}</p>
                    </td>
                    <td
                      className="list-body__name"
                      onClick={() => {
                        navigate('/worker/detail/' + item.id);
                      }}
                      style={{ color: '#ff4117', cursor: 'pointer' }}
                    >
                      <p>{item?.device_name}</p>
                    </td>
                    <td className="list-body__tag">
                      <p>{item?.status}</p>
                    </td>
                    <td className="list-body__tag">
                      <p>{item?.os}</p>
                    </td>
                    <td className="list-body__date">
                      <p>
                        <span className="number">38</span> Days <span className="number">9</span>{' '}
                        Hrs <span className="number">46</span> Mns
                      </p>
                    </td>
                    <td className="list-body__chip">
                      <p>
                        <span className="icon">
                          <img src="./assets/images/icon_nvidia.svg" alt="images" />
                        </span>
                        <span className="txt">Geforce GTX 1080 Ti</span>
                        <span className="number">x1</span>
                        <span
                          className="edit"
                          onClick={() => {
                            setSelected(item.id === selected ? null : item.id);
                          }}
                        >
                          ...
                        </span>
                      </p>
                      <div
                        className="dropdown-menu"
                        style={{ display: selected === item.id ? 'flex' : 'none' }}
                      >
                        <ul>
                          <li
                            onClick={() => {
                              setSelectedItem(item);
                              toggleModal();
                              setSelected(false);
                            }}
                          >
                            Rename
                          </li>
                          {item?.status !== NodeWokerStatus.TERMINATED ? (
                            <li
                              onClick={() => {
                                toast.confirmBox({
                                  isLoading: isPending,
                                  content: 'You are sure you want to TERMINATE?',
                                  onConfirm: (close) => {
                                    mutate(
                                      { id: item?.id, status: NodeWokerStatus.TERMINATED },
                                      {
                                        onSuccess: close
                                      }
                                    );
                                  }
                                });
                                setSelected(null);
                              }}
                            >
                              Terminate
                            </li>
                          ) : (
                            <div></div>
                          )}
                        </ul>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Modal isOpen={openModal} closeModal={toggleModal}>
        <ModelChangeName
          onClose={() => {
            setSelected(null);
            toggleModal();
          }}
          defaultName={selectedItem?.device_name}
          id={selectedItem?.id}
          check={true}
        />
      </Modal>
    </div>
  );
};
export default withAuth(WorkerList,"/worker");
export const ModelChangeName = ({ onClose, id, defaultName = '' }) => {
  const [name, setName] = useState(defaultName);
  const { mutate, isPending } = useNodeWorkerUpdate(onClose);
  const onSubmit = (e) => {
    e.preventDefault();
    mutate({
      id: id,
      device_name: name
    });
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
              <Button type="submit" disabled={!name || isPending} style={{ marginTop: 20 }}>
                Change name
              </Button>
              <p className="popup-form__note">
                <span onClick={() => onClose()} tabIndex={5}>
                  Cancel
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
