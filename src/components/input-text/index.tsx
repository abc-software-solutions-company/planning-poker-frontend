interface IProps {
  className?: string;
  value?: string;
  placeholder?: string;
  ref?: any;
}

const InputText: React.FC<IProps> = ({className, value, ref, placeholder}) => {
  return <input className={className} value={value} ref={ref} placeholder={placeholder}></input>;
};

export default InputText;
