import {FC} from 'react';

import Button from '@/core-ui/button';
import Heading from '@/core-ui/heading';
import Icon from '@/core-ui/icon';
import Input from '@/core-ui/input';
import useToast from '@/core-ui/toast';

import styles from './style.module.scss';

interface Iprops {
  linkValue?: string;
}

const InviteLink: FC<Iprops> = ({linkValue}) => {
  const toast = useToast();
  const onClickCopy = () => {
    navigator.clipboard.writeText(linkValue || '');
    toast.show({
      type: 'success',
      title: 'Success!',
      content: 'Copy success'
    });
  };
  return (
    <div className={styles['invite-link']}>
      <Heading as="h6">Invite a teammate</Heading>
      <div className="form-link">
        <Input className="input-link" value={linkValue} readOnly />
        <Button className="copy-btn" variant="contained" color="primary" onClick={onClickCopy}>
          <Icon name="ico-copy" />
        </Button>
      </div>
    </div>
  );
};

export default InviteLink;
