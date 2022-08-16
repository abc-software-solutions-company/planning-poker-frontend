const AbcIconFailure: React.FC<React.SVGAttributes<Record<string, unknown>>> = ({fill, width}) => {
  return (
    <svg width={width} viewBox="0 0 50 50">
      <circle cx="25" cy="25" fill={fill} r="25" />
      <g fill="none" stroke="#fff" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2">
        <path d="m16 34 9-9 9-9" />
        <path d="m16 16 9 9 9 9" />
      </g>
    </svg>
  );
};

AbcIconFailure.defaultProps = {
  fill: '#DB5136',
  width: 60
};

export default AbcIconFailure;
