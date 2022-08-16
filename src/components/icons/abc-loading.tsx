const AbcIconLoading: React.FC<React.SVGAttributes<Record<string, unknown>>> = ({className, fill}) => {
  return (
    <svg className={className} width="24" height="24" fill="none" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" stroke="#fff" strokeWidth="4" opacity="1"></circle>
      <path
        fill={fill}
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
};

AbcIconLoading.defaultProps = {
  fill: '#EF7622'
};

export default AbcIconLoading;
