import React, { useRef } from 'react';
import Link from 'next/link';
import clsx from 'clsx';

// styles
import css from './style.module.scss';

// components
import Button from 'antd/lib/button';

// redux
import { useSelector } from 'react-redux';
import { RootState } from '@redux/stores/configure-store';

import InputNumberSpinner from '../../input-number-spinner';

interface IProps {
  className?: string;
  onChangeAmount?: (amount: number) => Promise<any>;
  onDelete?: () => void;
  data: any;
}

const CartItem: React.FC<IProps> = (props) => {
  const { data, className, onChangeAmount, onDelete } = props;
  const isMobile = useSelector((store: RootState) => store.appState.isMobile);
  const inputRef = useRef<InputNumberSpinner>(null);
  const onChange = async (amount: number) => {
    if (onChangeAmount) {
      try {
        await onChangeAmount(amount);
      } catch {
        inputRef.current?.setValue(data.quantity);
      }
    }
  };
  return (
    <div className={clsx(className, isMobile ? css.rootMobile : css.rootDesktop)}>
      <div className={css.divThumbnail}>
        <img className={css.thumbnail} src={data.product.thumbnail} alt={data.product.name} />
      </div>
      <div className={css.grow}>
        <Link href={'/shop/[...slug]'} as={`/shop/${data.product.slug}/${data.product.id}`}>
          <a className={css.title}>{data.product.name}</a>
        </Link>
        <div className={css.price}>{data.product.currentPrice?.toLocaleString('vi-VN')} đ</div>
        <InputNumberSpinner
          ref={inputRef}
          value={data.quantity}
          min={1}
          max={100}
          onChange={onChange}
        />
      </div>
      <Button className={css.btnDelete} shape="circle" onClick={onDelete} />
    </div>
  );
};

export default CartItem;
