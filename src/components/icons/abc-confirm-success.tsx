const AbcIconSuccess: React.FC<React.SVGAttributes<Record<string, unknown>>> = ({fill, width}) => {
  return (
    <svg width={width} viewBox="0 0 50 50">
      <circle cx="25" cy="25" fill={fill} r="25" />
      <g fill="none" stroke="#fff" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2">
        <path d="m38 15-16 18-10-8" />
      </g>
    </svg>
  );
};

AbcIconSuccess.defaultProps = {
  fill: '#25ae88',
  width: 60
};

export default AbcIconSuccess;
