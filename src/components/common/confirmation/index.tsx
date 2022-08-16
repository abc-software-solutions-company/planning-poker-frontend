import cn from 'classnames';

import AbcIconFailure from '@/components/icons/abc-confirm-failure';
import AbcIconSuccess from '@/components/icons/abc-confirm-success';

import styles from './styles.module.scss';

interface IProps {
  title: string;
  message: string;
  icon: string;
  btnText?: string;
  buttonVisible?: boolean;
  onBtnClick?: () => void;
}
const Confirmation: React.FC<IProps> = ({title, message, icon, btnText, buttonVisible, onBtnClick}) => {
  const renderIcon = (type = 'success') => {
    let output = null;

    switch (type) {
      case 'success':
        output = <AbcIconSuccess />;
        break;
      case 'failure':
        output = <AbcIconFailure />;
        break;
    }

    return output;
  };

  return (
    <div className={cn('confirmation', styles.confirmation)}>
      <>
        {renderIcon(icon)}
        <h4 className={icon}>{title}</h4>
        <div dangerouslySetInnerHTML={{__html: message}} />
        {buttonVisible && (
          <button className="btn btn-fill" type="button" onClick={onBtnClick}>
            {btnText}
          </button>
        )}
      </>
    </div>
  );
};

Confirmation.defaultProps = {
  buttonVisible: true
};

export default Confirmation;
