import type { ReactNode } from 'react';
import Box from '@mui/material/Box';
import { AdminSidebar } from './AdminSidebar';
import { AdminTopbar } from './AdminTopbar';
import { adminColors } from '../../theme';

interface AdminLayoutProps {
  children: ReactNode;
  title: string;
}

export function AdminLayout({ children, title }: AdminLayoutProps) {
  return (
    <Box sx={{ display: 'flex' }}>
      <AdminSidebar />
      <Box sx={{ flexGrow: 1, minWidth: 0 }}>
        <AdminTopbar title={title} />
        <Box
          component="main"
          sx={{
            mt: `${adminColors.topbarHeight}px`,
            minHeight: `calc(100vh - ${adminColors.topbarHeight}px)`,
            backgroundColor: 'background.default',
            p: 3,
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
