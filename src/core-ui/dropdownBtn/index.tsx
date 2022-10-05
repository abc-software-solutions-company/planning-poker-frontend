import {MenuItem, Select, SelectProps} from '@mui/material';
import {FC, forwardRef} from 'react';

interface IDropdownBtnProps extends SelectProps {
  className?: string;
  items: string[];
}

const DropdownBtn: FC<IDropdownBtnProps> = forwardRef(({items, ...rest}, ref) => {
  return (
    <Select ref={ref} {...rest}>
      {items.map((value, idx) => {
        return (
          <MenuItem key={idx} value={value}>
            {value}
          </MenuItem>
        );
      })}
    </Select>
  );
});
DropdownBtn.displayName = 'DropdownBtn';

export default DropdownBtn;
