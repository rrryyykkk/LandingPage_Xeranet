import { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Avatar
} from '@mui/material';
import { 
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import TestimonialForm from '../components/testimonials/TestimonialForm';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getTestimonials, deleteTestimonial } from '../services/api';

const Testimonials = () => {
  const [openForm, setOpenForm] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const queryClient = useQueryClient();

  const { data: testimonials, isLoading } = useQuery('testimonials', getTestimonials);

  const deleteMutation = useMutation(deleteTestimonial, {
    onSuccess: () => {
      queryClient.invalidateQueries('testimonials');
    },
  });

  const handleEdit = (testimonial) => {
    setSelectedTestimonial(testimonial);
    setOpenForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus testimonial ini?')) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Testimonials</Typography>
        <Button 
          variant="contained" 
          onClick={() => {
            setSelectedTestimonial(null);
            setOpenForm(true);
          }}
        >
          Tambah Testimonial
        </Button>
      </Box>

      <Grid container spacing={3}>
        {testimonials?.map((testimonial) => (
          <Grid item xs={12} sm={6} md={4} key={testimonial.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar 
                    src={testimonial.avatar}
                    sx={{ width: 56, height: 56, mr: 2 }}
                  />
                  <Box>
                    <Typography variant="h6">{testimonial.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {testimonial.position}
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {testimonial.content}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Rating: {testimonial.rating}/5
                </Typography>
              </CardContent>
              <CardActions>
                <IconButton onClick={() => handleEdit(testimonial)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(testimonial.id)}>
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <TestimonialForm 
        open={openForm} 
        onClose={() => setOpenForm(false)}
        testimonial={selectedTestimonial}
      />
    </Box>
  );
};

export default Testimonials; 