import React, { useEffect, useState } from 'react';
import { Scroll } from './Scroll';
import { holiday } from '../apis/holiday';
import { formStore } from '../stores/form-store';
import { observer } from 'mobx-react-lite';
import { TabulationItem } from './TabulationItem';
import { FlowStatus } from '../enum/FlowStatus';

export interface TabulationProps {
  //每页数据的个数
  pageSize: number;
  //表单类型：
  flow_status: FlowStatus | boolean;
}

//查看表单的列表
const Tabulation = observer((props: TabulationProps) => {
  //控制页
  const [page, setPage] = useState({
    //每页的个数
    size: props.pageSize,
    //当前页（加载到的最新页）
    endPoint: 0,
    //是否有更新内容
    more: true,
  });

  //加载列表
  const fetchMoreData = () => {
    // holiday.get({
    //   page: page.endPoint,
    //   page_size: page.size,
    //   //应该为props.flow_status，但是无法控制apifox返回的status
    //   //TODO: 调整
    //   flow_status: 0,
    // });
    setPage({
      endPoint: page.endPoint++,
      more: true,
      size: page.size,
    });
  };

  //初始加载
  useEffect(() => {
    //TODO： 待调整
    //由于接口返回的数组长度不确定，为了满足加载满屏幕,请求了多次
    fetchMoreData();
    fetchMoreData();
    fetchMoreData();
  }, []);

  //Scroll包装，传入一个列表项组件和props，返回一个滚动加载的列表组件
  const ScrollWrapped = Scroll(TabulationItem, {
    fetchMoreData: fetchMoreData,
    dataLength: formStore.length,
    hasMore: page.more,
    loader: <h4>Loading</h4>,
    data: formStore.flowList,
    otherProps: {
      status: props.flow_status,
    },
  });

  return (
    <>
      <ScrollWrapped />
    </>
  );
});

export { Tabulation };
