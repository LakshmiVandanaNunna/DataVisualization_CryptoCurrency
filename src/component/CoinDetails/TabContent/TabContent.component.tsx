import { Box } from '@mui/material';

interface TabContentProps {
  children: React.ReactNode;
}

function TabContent({ children }: TabContentProps) {
  return (
    <Box sx={{ p: 2 }}>{children}</Box>
  );
}

export default TabContent;
