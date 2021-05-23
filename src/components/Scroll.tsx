import React, { Component, useState } from 'react';

interface MyProps {
  show: boolean;
  className?: string;
}

const FooSpan: React.FC<MyProps> = (props, Component?: React.FC) => {
  if (!props.show) {
    return null;
  }

  return (
    <div className={props.className} tw={'w-full'}>
      {Component ? <Component /> : ''}
    </div>
  );
};

const Scroll: React.FC<{}> = (
  props,
  ListComponent: React.FC,
  topWrapper: boolean = true,
  bottomWrapper: boolean = false,
) => {
  //控制刷新过程中的显示
  const [refresh, setRefresh] = useState({
    beforeRefresh: true,
    isRefreshing: false,
    afterRefreshed: false,
  });
  //控制加载过程中的显示
  const [load, setLoad] = useState({
    beforeLoad: true,
    isLoading: false,
    afterLoaded: false,
  });

  return (
    <>
      <FooSpan show={topWrapper} className={'topWrapper'}>
        <FooSpan show={refresh.beforeRefresh}>
          <div>松开准备刷新页面</div>
        </FooSpan>
        <FooSpan show={refresh.isRefreshing}>
          <div>正在刷新网页</div>
        </FooSpan>
        <FooSpan show={refresh.afterRefreshed}>
          <div>刷新完成</div>
        </FooSpan>
      </FooSpan>
      <ListComponent />
      <FooSpan show={bottomWrapper} className={'bottomWrapper'}>
        <FooSpan show={load.beforeLoad}>
          <div>松开准备加载</div>
        </FooSpan>
        <FooSpan show={load.isLoading}>
          <div>加载中</div>
        </FooSpan>
        <FooSpan show={load.afterLoaded}>
          <div>加载完成</div>
        </FooSpan>
      </FooSpan>
    </>
  );
};

export { Scroll };
