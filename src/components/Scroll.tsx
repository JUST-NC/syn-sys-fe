import React, { ReactNode } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

export interface ScrollProps {
  data: any[];
  //列表长度
  dataLength: number;
  //下拉加载事件
  fetchMoreData: any;
  //是否有更多数据
  hasMore: boolean;
  //下拉加载的过渡组件
  loader?: ReactNode;
  //其他
  otherProps?: any;
}

type ItemComponent<P = any> =
  | (new (props: P) => React.Component)
  | ((props: P & { children?: React.ReactNode }) => React.ReactElement<any> | null);

//高阶组件：滚动加载
const Scroll = (
  ScrollItem:
    | React.FC<{ props: any }>
    | React.FunctionComponent<{ props: any }>
    | React.ComponentType<{ props: any }>,
  props: ScrollProps,
) => {
  const ScrollInfinite = () => {
    return (
      <div>
        <InfiniteScroll
          dataLength={props.dataLength}
          next={props.fetchMoreData}
          hasMore={props.hasMore}
          loader={props.loader}
        >
          {props.data.map((index, key) => {
            return <ScrollItem key={key} props={index} {...props.otherProps} />;
          })}
        </InfiniteScroll>
      </div>
    );
  };
  return ScrollInfinite;
};

export { Scroll };
