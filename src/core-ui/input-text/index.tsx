import cn from 'classnames';

interface IProps {
  className?: string;
  value?: string;
  placeholder?: string;
}

const InputText: React.FC<IProps> = ({className, value, placeholder}) => {
  return <input className={cn('form-input', className)} value={value} placeholder={placeholder}></input>;
};

export default InputText;
