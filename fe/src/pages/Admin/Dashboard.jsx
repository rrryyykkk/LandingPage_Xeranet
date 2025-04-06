import { useQuery } from "@tanstack/react-query";
import { getBlogPosts, getUsers, getTestimonials } from "../../services/api";
import Loading from "../../components/Admin/common/loading";
import Error from "../../components/Admin/common/error";

const Dashboard = () => {
  const {
    data: blogs,
    isLoading: blogsLoading,
    error: blogsError,
  } = useQuery({ queryKey: ["blogs"], queryFn: getBlogPosts });

  const {
    data: users,
    isLoading: usersLoading,
    error: usersError,
  } = useQuery({ queryKey: ["users"], queryFn: getUsers });

  const {
    data: testimonials,
    isLoading: testimonialsLoading,
    error: testimonialsError,
  } = useQuery({ queryKey: ["testimonials"], queryFn: getTestimonials });

  const isLoading = blogsLoading || usersLoading || testimonialsLoading;
  const error = blogsError || usersError || testimonialsError;

  if (isLoading) {
    return <Loading message="Memuat data dashboard..." />;
  }

  if (error) {
    return (
      <Error
        message="Gagal memuat data dashboard"
        onRetry={() => window.location.reload()}
      />
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6 text-primary">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card bg-base-100 border border-base-300 shadow-md">
          <div className="card-body">
            <h2 className="card-title text-base-content/80">
              Total Blog Posts
            </h2>
            <p className="text-3xl font-bold text-primary">
              {blogs?.length || 0}
            </p>
          </div>
        </div>

        <div className="card bg-base-100 border border-base-300 shadow-md">
          <div className="card-body">
            <h2 className="card-title text-base-content/80">Total Users</h2>
            <p className="text-3xl font-bold text-primary">
              {users?.length || 0}
            </p>
          </div>
        </div>

        <div className="card bg-base-100 border border-base-300 shadow-md">
          <div className="card-body">
            <h2 className="card-title text-base-content/80">
              Total Testimonials
            </h2>
            <p className="text-3xl font-bold text-primary">
              {testimonials?.length || 0}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
