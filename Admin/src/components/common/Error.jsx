import { Box, Typography, Button } from '@mui/material';
import { Error as ErrorIcon } from '@mui/icons-material';

const Error = ({ message = 'Terjadi kesalahan', onRetry }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '200px',
        gap: 2
      }}
    >
      <ErrorIcon color="error" sx={{ fontSize: 48 }} />
      <Typography color="error" align="center">
        {message}
      </Typography>
      {onRetry && (
        <Button 
          variant="outlined" 
          color="error"
          onClick={onRetry}
        >
          Coba Lagi
        </Button>
      )}
    </Box>
  );
};

export default Error; 