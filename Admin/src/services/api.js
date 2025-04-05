import axios from 'axios';
import { dummyUsers, dummyBlogs, dummyTestimonials, dummyHeroSettings } from '../data/dummyData';

const API_URL = 'http://localhost:8000/api';

// Konfigurasi axios default
axios.defaults.timeout = 10000; // 10 detik timeout
axios.defaults.retry = 3; // 3x retry

// Interceptor untuk retry
axios.interceptors.response.use(null, async (error) => {
  const { config } = error;
  if (!config || !config.retry) {
    return Promise.reject(error);
  }
  config.retryCount = config.retryCount || 0;
  if (config.retryCount >= config.retry) {
    return Promise.reject(error);
  }
  config.retryCount += 1;
  const backoff = new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, config.retryCount * 1000);
  });
  await backoff;
  return axios(config);
});

// User endpoints
export const getUsers = async () => {
  // Simulasi delay network
  await new Promise(resolve => setTimeout(resolve, 500));
  return dummyUsers;
};

export const createUser = async (userData) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const newUser = {
    id: dummyUsers.length + 1,
    ...userData,
    createdAt: new Date().toISOString().split('T')[0]
  };
  dummyUsers.push(newUser);
  return newUser;
};

export const updateUser = async (id, userData) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const index = dummyUsers.findIndex(user => user.id === id);
  if (index !== -1) {
    dummyUsers[index] = { ...dummyUsers[index], ...userData };
    return dummyUsers[index];
  }
  throw new Error('User not found');
};

export const deleteUser = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const index = dummyUsers.findIndex(user => user.id === id);
  if (index !== -1) {
    dummyUsers.splice(index, 1);
    return { success: true };
  }
  throw new Error('User not found');
};

// Blog endpoints
export const getBlogPosts = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return dummyBlogs;
};

export const createBlogPost = async (postData) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const newPost = {
    id: dummyBlogs.length + 1,
    ...postData,
    createdAt: new Date().toISOString().split('T')[0]
  };
  dummyBlogs.push(newPost);
  return newPost;
};

export const updateBlogPost = async (id, postData) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const index = dummyBlogs.findIndex(post => post.id === id);
  if (index !== -1) {
    dummyBlogs[index] = { ...dummyBlogs[index], ...postData };
    return dummyBlogs[index];
  }
  throw new Error('Blog post not found');
};

export const deleteBlogPost = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const index = dummyBlogs.findIndex(post => post.id === id);
  if (index !== -1) {
    dummyBlogs.splice(index, 1);
    return { success: true };
  }
  throw new Error('Blog post not found');
};

// Testimonial endpoints
export const getTestimonials = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return dummyTestimonials;
};

export const createTestimonial = async (testimonialData) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const newTestimonial = {
    id: dummyTestimonials.length + 1,
    ...testimonialData
  };
  dummyTestimonials.push(newTestimonial);
  return newTestimonial;
};

export const updateTestimonial = async (id, testimonialData) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const index = dummyTestimonials.findIndex(testimonial => testimonial.id === id);
  if (index !== -1) {
    dummyTestimonials[index] = { ...dummyTestimonials[index], ...testimonialData };
    return dummyTestimonials[index];
  }
  throw new Error('Testimonial not found');
};

export const deleteTestimonial = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const index = dummyTestimonials.findIndex(testimonial => testimonial.id === id);
  if (index !== -1) {
    dummyTestimonials.splice(index, 1);
    return { success: true };
  }
  throw new Error('Testimonial not found');
};

// Hero settings endpoints
export const getHeroSettings = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return dummyHeroSettings;
};

export const updateHeroSettings = async (settingsData) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  Object.assign(dummyHeroSettings, settingsData);
  return dummyHeroSettings;
}; 