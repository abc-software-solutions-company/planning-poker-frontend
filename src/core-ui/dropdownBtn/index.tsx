import {MenuItem, Select, SelectProps} from '@mui/material';
import {FC, forwardRef} from 'react';

interface IDropdownBtnProps extends SelectProps {
  className?: string;
  items: string[];
}

const DropdownBtn: FC<IDropdownBtnProps> = forwardRef(({items, ...rest}, ref) => {
  return (
    <Select ref={ref} {...rest} sx={{fontFamily: 'inherit', color: '#334155'}}>
      {items.map((value, idx) => {
        return (
          <MenuItem key={idx} value={value} sx={{fontFamily: 'inherit', color: '#334155'}}>
            {value}
          </MenuItem>
        );
      })}
    </Select>
  );
});
DropdownBtn.displayName = 'DropdownBtn';

export default DropdownBtn;
