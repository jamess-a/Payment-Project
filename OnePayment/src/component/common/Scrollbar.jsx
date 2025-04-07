import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

// สไตล์ให้ scroll bar
const Scrollbar = styled(Box)({
  width: '100%', // หรือระบุขนาดที่ต้องการ
  height: '300px', // ขนาดของ scrollable area
  overflowY: 'auto', // ตั้งค่าให้สามารถ scroll แนวตั้ง
  '&::-webkit-scrollbar': {
    width: '8px', // กำหนดความกว้างของ scrollbar
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // สีของ thumb
    borderRadius: '10px',
  },
  '&::-webkit-scrollbar-track': {
    background: '#f1f1f1', // สีของ track
  },
});

export default Scrollbar;

