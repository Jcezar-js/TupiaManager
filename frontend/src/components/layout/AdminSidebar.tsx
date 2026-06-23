import { NavLink } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import GridViewIcon from '@mui/icons-material/GridView';
import { adminColors } from '../../theme';

const NAV_ITEMS = [
  { to: '/admin/materials', label: 'Materiais', icon: <Inventory2Icon fontSize="small" /> },
  { to: '/admin/products', label: 'Produtos', icon: <GridViewIcon fontSize="small" /> },
];

export function AdminSidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: adminColors.sidebarWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: adminColors.sidebarWidth,
          boxSizing: 'border-box',
          backgroundColor: adminColors.sidebarBg,
          color: '#fff',
          border: 'none',
        },
      }}
    >
      <Box sx={{ px: 2, py: 2.5, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          TupiaManager
        </Typography>
      </Box>

      <List component="nav" sx={{ mt: 1, px: 1 }}>
        {NAV_ITEMS.map((item) => (
          <ListItemButton
            key={item.to}
            component={NavLink}
            to={item.to}
            sx={{
              borderRadius: 1,
              mb: 0.5,
              color: 'rgba(255,255,255,0.6)',
              '&.active': {
                backgroundColor: 'primary.main',
                color: '#fff',
                fontWeight: 600,
              },
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.08)',
              },
            }}
          >
            <ListItemIcon sx={{ color: 'inherit', minWidth: 36 }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
}
