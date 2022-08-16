import Image from 'next/image';
import {useTranslation} from 'next-i18next';
import React from 'react';

import {IAuthor} from '@/types';
import {getImageURL} from '@/utils/misc';

import styles from './styles.module.scss';

interface IProps {
  data: IAuthor;
}

const Author: React.FC<IProps> = ({data}) => {
  const {t} = useTranslation('common');
  if (data?.avatar) return null;

  const avatarAttrs = data?.avatar.data.attributes;

  return (
    <div className={styles.author}>
      <Image
        src={getImageURL(avatarAttrs.formats.thumbnail.url)}
        alt={avatarAttrs.caption}
        blurDataURL={avatarAttrs.placeholder}
        width={110}
        height={110}
        placeholder="blur"
      />
      <div className="info">
        <p>{t('author')}</p>
        <p className="name">{data?.fullName}</p>
      </div>
    </div>
  );
};

export default Author;
