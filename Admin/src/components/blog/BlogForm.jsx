import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box
} from '@mui/material';
import { useMutation, useQueryClient } from 'react-query';
import { createBlog, updateBlog } from '../../services/blogService';

const BlogForm = ({ open, onClose, blog }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    status: 'draft'
  });
  const queryClient = useQueryClient();

  useEffect(() => {
    if (blog) {
      setFormData({
        title: blog.title,
        content: blog.content,
        status: blog.status
      });
    }
  }, [blog]);

  const mutation = useMutation(
    (data) => blog ? updateBlog(blog.id, data) : createBlog(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('blogs');
        onClose();
      }
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {blog ? 'Edit Blog' : 'Tambah Blog Baru'}
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Judul"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
            <TextField
              label="Konten"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              multiline
              rows={4}
              required
            />
            <FormControl>
              <InputLabel>Status</InputLabel>
              <Select
                value={formData.status}
                label="Status"
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <MenuItem value="draft">Draft</MenuItem>
                <MenuItem value="published">Published</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Batal</Button>
          <Button type="submit" variant="contained">
            {blog ? 'Update' : 'Simpan'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default BlogForm; 