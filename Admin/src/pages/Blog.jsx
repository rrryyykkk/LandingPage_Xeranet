import { useState } from 'react';
import { 
  Box, 
  Button, 
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getBlogs, deleteBlog } from '../services/blogService';
import BlogForm from '../components/blog/BlogForm';

const Blog = () => {
  const [openForm, setOpenForm] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const queryClient = useQueryClient();

  const { data: blogs, isLoading } = useQuery('blogs', getBlogs);

  const deleteMutation = useMutation(deleteBlog, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs');
    },
  });

  const handleEdit = (blog) => {
    setSelectedBlog(blog);
    setOpenForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus blog ini?')) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Kelola Blog</Typography>
        <Button 
          variant="contained" 
          onClick={() => {
            setSelectedBlog(null);
            setOpenForm(true);
          }}
        >
          Tambah Blog
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Judul</TableCell>
              <TableCell>Tanggal</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {blogs?.map((blog) => (
              <TableRow key={blog.id}>
                <TableCell>{blog.title}</TableCell>
                <TableCell>
                  {new Date(blog.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell>{blog.status}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(blog)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(blog.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <BlogForm 
        open={openForm} 
        onClose={() => setOpenForm(false)}
        blog={selectedBlog}
      />
    </Box>
  );
};

export default Blog; 