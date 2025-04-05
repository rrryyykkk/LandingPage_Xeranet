import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Rating,
  Typography,
  IconButton
} from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import { useMutation, useQueryClient } from 'react-query';
import { createTestimonial, updateTestimonial } from '../../services/api';

const TestimonialForm = ({ open, onClose, testimonial }) => {
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    content: '',
    rating: 5,
    avatar: null
  });
  const [preview, setPreview] = useState(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (testimonial) {
      setFormData({
        name: testimonial.name,
        position: testimonial.position,
        content: testimonial.content,
        rating: testimonial.rating,
        avatar: null
      });
      setPreview(testimonial.avatar);
    }
  }, [testimonial]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, avatar: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const mutation = useMutation(
    (data) => testimonial ? updateTestimonial(testimonial.id, data) : createTestimonial(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('testimonials');
        onClose();
      }
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    Object.keys(formData).forEach(key => {
      if (formData[key] !== null) {
        formDataToSend.append(key, formData[key]);
      }
    });
    mutation.mutate(formDataToSend);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {testimonial ? 'Edit Testimonial' : 'Tambah Testimonial Baru'}
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box
                sx={{
                  width: 100,
                  height: 100,
                  borderRadius: '50%',
                  overflow: 'hidden',
                  bgcolor: 'grey.200',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {preview ? (
                  <img 
                    src={preview} 
                    alt="Preview" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <PhotoCamera sx={{ color: 'grey.400' }} />
                )}
              </Box>
              <Button
                component="label"
                variant="outlined"
                startIcon={<PhotoCamera />}
              >
                Upload Foto
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </Button>
            </Box>

            <TextField
              label="Nama"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <TextField
              label="Posisi"
              value={formData.position}
              onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              required
            />
            <TextField
              label="Testimonial"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              multiline
              rows={4}
              required
            />
            <Box>
              <Typography component="legend">Rating</Typography>
              <Rating
                value={formData.rating}
                onChange={(e, newValue) => {
                  setFormData({ ...formData, rating: newValue });
                }}
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Batal</Button>
          <Button type="submit" variant="contained">
            {testimonial ? 'Update' : 'Simpan'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default TestimonialForm; 