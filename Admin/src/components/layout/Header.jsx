import { 
  AppBar, 
  Toolbar, 
  Typography, 
  IconButton, 
  Box,
  Badge,
  Avatar,
  Menu,
  MenuItem,
  Tooltip
} from '@mui/material';
import { 
  Notifications as NotificationsIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  Menu as MenuIcon
} from '@mui/icons-material';
import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

const Header = ({ onSidebarToggle }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { mode, toggleColorMode } = useTheme();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        zIndex: (theme) => theme.zIndex.drawer + 1,
        bgcolor: 'background.paper',
        color: 'text.primary',
        boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
      }}
    >
      <Toolbar sx={{ minHeight: '64px' }}>
        <IconButton
          color="inherit"
          onClick={onSidebarToggle}
          edge="start"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>

        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ 
            flexGrow: 1,
            fontWeight: 600,
            fontSize: '1.25rem'
          }}
        >
          Admin Xeranet
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Tooltip title={mode === 'dark' ? 'Light Mode' : 'Dark Mode'}>
            <IconButton onClick={toggleColorMode} color="inherit">
              {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Tooltip>

          <IconButton color="inherit">
            <Badge badgeContent={4} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          
          <IconButton
            onClick={handleMenu}
            sx={{ ml: 1 }}
          >
            <Avatar 
              sx={{ 
                width: 32, 
                height: 32,
                bgcolor: 'primary.main'
              }}
            >
              A
            </Avatar>
          </IconButton>
          
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>Settings</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header; 