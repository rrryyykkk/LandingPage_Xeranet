import { 
  Box, 
  Grid, 
  Paper, 
  Typography 
} from '@mui/material';
import { useQuery } from 'react-query';
import { 
  getBlogPosts, 
  getUsers, 
  getTestimonials 
} from '../services/api';
import Loading from '../components/common/Loading';
import Error from '../components/common/Error';

const Dashboard = () => {
  const { data: blogs, isLoading: blogsLoading, error: blogsError } = useQuery('blogs', getBlogPosts);
  const { data: users, isLoading: usersLoading, error: usersError } = useQuery('users', getUsers);
  const { data: testimonials, isLoading: testimonialsLoading, error: testimonialsError } = useQuery('testimonials', getTestimonials);

  const isLoading = blogsLoading || usersLoading || testimonialsLoading;
  const error = blogsError || usersError || testimonialsError;

  if (isLoading) {
    return <Loading message="Memuat data dashboard..." />;
  }

  if (error) {
    return <Error message="Gagal memuat data dashboard" onRetry={() => window.location.reload()} />;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Total Blog Posts</Typography>
            <Typography variant="h3">{blogs?.length || 0}</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Total Users</Typography>
            <Typography variant="h3">{users?.length || 0}</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Total Testimonials</Typography>
            <Typography variant="h3">{testimonials?.length || 0}</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard; 