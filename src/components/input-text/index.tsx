interface IProps {
  className?: string;
  value?: string;
  placeholder?: string;
}

const InputText: React.FC<IProps> = ({className, value, placeholder}) => {
  return <input className={className} value={value} placeholder={placeholder}></input>;
};

export default InputText;
