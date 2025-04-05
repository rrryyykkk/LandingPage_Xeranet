import React, { useState } from 'react';
import { Grid, TextField, Paper, Box, Button, Typography } from '@mui/material';
import { useMutation } from 'react-query';
import { useHeroSettings } from '../contexts/HeroSettingsContext';
import { updateHeroSettings } from '../services/heroService';

const Hero = () => {
  const [formData, setFormData] = useState({});
  const { settings } = useHeroSettings();

  const mutation = useMutation(updateHeroSettings);

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, background: file });
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom>
          Update Hero Background
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Judul"
                value={formData.title || settings?.title || ''}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Subtitle"
                value={formData.subtitle || settings?.subtitle || ''}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                multiline
                rows={3}
                required
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12}>
              <input
                type="file"
                accept="image/*,video/*"
                onChange={handleFileChange}
                required
                style={{ marginTop: '16px' }}
              />
            </Grid>

            <Grid item xs={12}>
              <Button 
                type="submit" 
                variant="contained"
                color="primary"
                disabled={mutation.isLoading}
                sx={{ marginTop: 2 }}
              >
                {mutation.isLoading ? 'Menyimpan...' : 'Simpan Perubahan'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default Hero; 