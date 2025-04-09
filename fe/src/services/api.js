import axios from "axios";
import {
  dummyUsers,
  dummyBlogs,
  dummyTestimonials,
} from "../data/dummyData.js";

const API_URL = "http://localhost:8000/api";

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
  await new Promise((resolve) => setTimeout(resolve, 500));
  return dummyUsers;
};

export const createUser = async (userData) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const newUser = {
    id: dummyUsers.length + 1,
    ...userData,
    createdAt: new Date().toISOString().split("T")[0],
  };
  dummyUsers.push(newUser);
  return newUser;
};

export const updateUser = async (id, userData) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const index = dummyUsers.findIndex((user) => user.id === id);
  if (index !== -1) {
    dummyUsers[index] = { ...dummyUsers[index], ...userData };
    return dummyUsers[index];
  }
  throw new Error("User not found");
};

export const deleteUser = async (id) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const index = dummyUsers.findIndex((user) => user.id === id);
  if (index !== -1) {
    dummyUsers.splice(index, 1);
    return { success: true };
  }
  throw new Error("User not found");
};

// Blog endpoints
export const getBlogPosts = async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return dummyBlogs;
};

export const createBlogPost = async (postData) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const newPost = {
    id: dummyBlogs.length + 1,
    ...postData,
    createdAt: new Date().toISOString().split("T")[0],
  };
  dummyBlogs.push(newPost);
  return newPost;
};

export const updateBlogPost = async (id, postData) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const index = dummyBlogs.findIndex((post) => post.id === id);
  if (index !== -1) {
    dummyBlogs[index] = { ...dummyBlogs[index], ...postData };
    return dummyBlogs[index];
  }
  throw new Error("Blog post not found");
};

export const deleteBlogPost = async (id) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const index = dummyBlogs.findIndex((post) => post.id === id);
  if (index !== -1) {
    dummyBlogs.splice(index, 1);
    return { success: true };
  }
  throw new Error("Blog post not found");
};

// Testimonial endpoints
export const getTestimonials = async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return dummyTestimonials;
};

export const createTestimonial = async (testimonialData) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const newTestimonial = {
    id: dummyTestimonials.length + 1,
    ...testimonialData,
  };
  dummyTestimonials.push(newTestimonial);
  return newTestimonial;
};

export const updateTestimonial = async (id, testimonialData) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const index = dummyTestimonials.findIndex(
    (testimonial) => testimonial.id === id
  );
  if (index !== -1) {
    dummyTestimonials[index] = {
      ...dummyTestimonials[index],
      ...testimonialData,
    };
    return dummyTestimonials[index];
  }
  throw new Error("Testimonial not found");
};

export const deleteTestimonial = async (id) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const index = dummyTestimonials.findIndex(
    (testimonial) => testimonial.id === id
  );
  if (index !== -1) {
    dummyTestimonials.splice(index, 1);
    return { success: true };
  }
  throw new Error("Testimonial not found");
};

// Hero settings endpoints
let dummyHeroList = [
  {
    _id: "1",
    title: "Selamat Datang di Admin Dashboard",
    subtitle: "Kelola konten website Anda dengan mudah",
    background: "https://source.unsplash.com/random/1920x1080/?nature",
  },
];

export const getHeroes = async () => {
  return dummyHeroList;
};

export const createHero = async (formData) => {
  const newHero = {
    _id: Date.now().toString(),
    ...formData,
  };
  dummyHeroList.push(newHero);
  return newHero;
};

export const updateHero = async (id, formData) => {
  const index = dummyHeroList.findIndex((h) => h._id === id);
  if (index !== -1) {
    dummyHeroList[index] = { _id: id, ...formData };
    return dummyHeroList[index];
  }
  throw new Error("Hero not found (dummy)");
};

export const deleteHero = async (id) => {
  const index = dummyHeroList.findIndex((h) => h._id === id);
  if (index !== -1) {
    const deleted = dummyHeroList.splice(index, 1);
    return deleted[0];
  }
  throw new Error("Hero not found (dummy)");
};

// Dummy data LogoPT
let dummyLogoPT = [
  {
    _id: "1",
    name: "Logo Perusahaan A",
    logoUrl: "https://via.placeholder.com/150",
    isActive: true,
  },
  {
    _id: "2",
    name: "Logo Perusahaan B",
    logoUrl: "https://via.placeholder.com/150",
    isActive: false,
  },
];

// Get all LogoPT
export const getLogoPTs = async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return { logos: dummyLogoPT };
};

// Create LogoPT
export const createLogoPT = async (formData) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const newLogo = {
    _id: Date.now().toString(),
    ...formData,
  };
  dummyLogoPT.push(newLogo);
  return newLogo;
};

// Update LogoPT
export const updateLogoPT = async (id, formData) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const index = dummyLogoPT.findIndex((l) => l._id === id);
  if (index !== -1) {
    dummyLogoPT[index] = { _id: id, ...formData };
    return dummyLogoPT[index];
  }
  throw new Error("LogoPT not found (dummy)");
};

// Delete LogoPT
export const deleteLogoPT = async (id) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const index = dummyLogoPT.findIndex((l) => l._id === id);
  if (index !== -1) {
    const deleted = dummyLogoPT.splice(index, 1);
    return deleted[0];
  }
  throw new Error("LogoPT not found (dummy)");
};
