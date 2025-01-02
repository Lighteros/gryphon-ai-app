import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import LoadingText from "../Loading/LoadingText";

const InfinityScrollPage = ({
  length,
  fetchData,
  hasMore = true,
  children,
  className,
  scrollableTarget,
  useEndMessage = true,
  useLoading = true,
  Loader = null,
}) => {
  return (
    <InfiniteScroll
      // style={{ textAlign: 'start' }}
      dataLength={length}
      next={fetchData}
      hasMore={hasMore}
      loader={useLoading ? Loader ? <Loader /> : <LoadingText /> : undefined}
      className={className}
      scrollableTarget={scrollableTarget}
      endMessage={
        useEndMessage ? (
          <>
            <p
              style={{
                textAlign: "center",
                color: "white",
                width: "100%",
                marginTop: 10,
              }}
            >
              <b>Yay! You have seen it all</b>
            </p>
          </>
        ) : undefined
      }
      // pullDownToRefresh
      pullDownToRefreshThreshold={50}
      //   pullDownToRefreshContent={
      //     <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
      //   }
      //   releaseToRefreshContent={<h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>}
    >
      {children}
    </InfiniteScroll>
  );
};

export default InfinityScrollPage;
