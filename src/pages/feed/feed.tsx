import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  getFeed,
  feedErrorSelector,
  feedOrdersSelector
} from '../../slices/feedSlice';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(feedOrdersSelector);
  const error = useSelector(feedErrorSelector);

  useEffect(() => {
    dispatch(getFeed());
  }, []);

  const handleGetFeeds = () => {
    dispatch(getFeed());
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
