import { 
  Drawer, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText,
  ListItemButton,
  useTheme
} from '@mui/material';
import { 
  Dashboard as DashboardIcon,
  Article as BlogIcon,
  People as UsersIcon,
  Star as TestimonialsIcon,
  Image as HeroIcon
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 240;

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
  { text: 'Blog', icon: <BlogIcon />, path: '/blog' },
  { text: 'Users', icon: <UsersIcon />, path: '/users' },
  { text: 'Testimonials', icon: <TestimonialsIcon />, path: '/testimonials' },
  { text: 'Hero Background', icon: <HeroIcon />, path: '/hero' }
];

const Sidebar = ({ open }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={open}
      sx={{
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
          backgroundColor: theme.palette.background.paper,
          borderRight: `1px solid ${theme.palette.divider}`,
          transition: 'transform 0.2s ease-in-out',
          transform: open ? 'translateX(0)' : `translateX(-${drawerWidth}px)`,
          position: 'fixed',
          height: '100%',
          zIndex: theme.zIndex.drawer,
          width: open ? drawerWidth : 0,
        },
      }}
    >
      <List sx={{ mt: '64px' }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => navigate(item.path)}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: theme.palette.action.selected,
                  '&:hover': {
                    backgroundColor: theme.palette.action.selected,
                  },
                },
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar; 