/* eslint-disable no-unused-vars */
import React, { useEffect, useMemo, useState } from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { FaCheck } from 'react-icons/fa';
import { useUser } from '../../context/AuthContext';
import withAuth from '../../context/withAuth';
import { useUserTaskCompletion, useUserTasks } from '../../services/userService';
import { toImageUrl } from '../../utils/file';
import LoadingIcon from '../Ui/LoadingIcon';

import moment from 'moment';
const TasksTele = () => {
  const { user } = useUser();
  const { data } = useUserTasks({
    page_size: 50,
    page_index: 1
  });
  const dataList = useMemo(() => {
    const list = {};
    const orderCategory = {};
    data?.data?.records?.forEach((item) => {
      list[item.category] = data?.data?.records.filter((e) => e.category === item.category);
    });
    if (list['Heaven World AI']) {
      orderCategory['Heaven World AI'] = list['Heaven World AI'];
    }
    return { ...orderCategory, ...list };
  }, [data?.data?.records]);
  return (
    <div className="p-content m-l setting">
      <div className="p-content__wrap">
        <h3 className="sec-big" style={{ textAlign: 'center', marginBottom: 5 }}>
          Tasks
        </h3>
        <p className="description-social" style={{ textAlign: 'center', marginBottom: 5 }}>
          Complete tasks to earn point
        </p>
        <div className="box-link-social">
          <div className="box-link-social-item">
            {Object.entries(dataList).map(([category, items]) => (
              <div key={category}>
                <h5 style={{ paddingBottom: 5, fontSize: 14 }}>{category}</h5>
                {items.map((item) => (
                  <TaskItem item={item} key={item?.id} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(TasksTele);
export const TaskItem = ({ item }) => {
  const { mutate, isPending } = useUserTaskCompletion();

  const [checking, setChecking] = useState(false);
  useEffect(() => {
    if (!item.user_progress) {
      return;
    }
    const second = moment.utc(item.user_progress?.created_at).add(20, 'second');

    if (!moment.utc().isAfter(second)) {
      setChecking(true);
    }

    const clear = setInterval(() => {
      if (moment().isAfter(second)) {
        clearInterval(clear);
        setChecking(false);
      }
    }, 1000);
    return () => {
      clearInterval(clear);
    };
  }, [item.user_progress]);

  return (
    <div className="child-box-social" style={{ marginBottom: 15 }}>
      <div className="child-box-social-top">
        <div
          className="social-top-icon"
          style={{ padding: 0, width: 45, aspectRatio: 1, background: '#000' }}
        >
          <img
            src={toImageUrl(item?.task_image)}
            alt={item?.task_name}
            style={{ width: '100%', height: '100%', borderRadius: 99 }}
          />
        </div>
        <div style={{}}>
          <div className="social-top-title" style={{ textAlign: 'start' }}>
            {item?.task_name}
          </div>{' '}
          <div>
            <small>+{item.reward_amount} POINT</small>
          </div>
        </div>
      </div>
      {!item.user_progress && (
        <button
          className="btn-social-top"
          style={{ width: 60,flexShrink:0 }}
          onClick={() => {
            mutate({
              task_id: item?.id,
              disable_toast: true
            });
            window.open(item?.task_link, '_blank');
          }}
        >
          {isPending ? <LoadingIcon color="black" /> : <FaExternalLinkAlt />}
        </button>
      )}

      {item?.user_progress?.status === 'IN_PROGRESS' && (
        <>
          {checking ? (
            <button
              disabled={checking}
              className="btn-social-top"
              style={{
                width: 60,
                backgroundColor: checking ? '#808080' : '#01c7cc',
                color: '#FFF',
                flexShrink: 0
              }}
            >
              {checking ? <LoadingIcon /> : 'CLAIM'}
            </button>
          ) : (
            <button
              disabled={isPending}
              className="btn-social-top"
              style={{
                width: 60,
                backgroundColor: '#01c7cc',
                color: '#FFF',
                flexShrink: 0
              }}
              onClick={() => {
                mutate({
                  task_id: item?.id
                });
              }}
            >
              {isPending ? <LoadingIcon /> : 'CLAIM'}
            </button>
          )}
        </>
      )}
      {item?.user_progress?.status === 'COMPLETED' && <FaCheck color="#01c7cc" />}
    </div>
  );
};
