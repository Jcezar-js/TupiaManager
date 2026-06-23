import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockResetIcon from '@mui/icons-material/LockReset';
import { useAuth } from '../../contexts/AuthContext';
import { adminColors } from '../../theme';

interface AdminTopbarProps {
  title: string;
}

export function AdminTopbar({ title }: AdminTopbarProps) {
  const { logout } = useAuth();

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        height: adminColors.topbarHeight,
        backgroundColor: adminColors.topbarBg,
        left: adminColors.sidebarWidth,
        width: `calc(100% - ${adminColors.sidebarWidth}px)`,
      }}
    >
      <Toolbar variant="dense" sx={{ height: '100%', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <IconButton size="small" sx={{ color: '#fff' }} aria-label="Toggle sidebar">
            <MenuIcon />
          </IconButton>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            {title}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <NotificationsIcon fontSize="small" sx={{ color: 'rgba(255,255,255,0.6)' }} />
          <AccountCircleIcon sx={{ color: '#fff' }} />
          <Button
            component={Link}
            to="/admin/change-password"
            size="small"
            variant="outlined"
            color="inherit"
            startIcon={<LockResetIcon />}
          >
            Trocar senha
          </Button>
          <Button size="small" variant="outlined" color="inherit" onClick={logout}>
            Sair
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
