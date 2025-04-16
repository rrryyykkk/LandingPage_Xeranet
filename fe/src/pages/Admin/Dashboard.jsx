/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Admin/common/loading";
import Error from "../../components/Admin/common/error";
import { useEffect } from "react";
import { fecthDataDashboard } from "../../app/data/dashboardSlice";
import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const Dashboard = () => {
  const dispatch = useDispatch();

  const { blogs, testimonials, heroes, logoPTs, iklan, isLoading, error } =
    useSelector((state) => state.dashboard);

  console.log("blogs:", blogs);
  console.log("testimonials:", testimonials);
  console.log("heroes:", heroes);
  console.log("logoPTs:", logoPTs);
  console.log("iklan:", iklan);

  useEffect(() => {
    dispatch(fecthDataDashboard());
  }, [dispatch]);

  if (isLoading) {
    return <Loading message="Memuat data dashboard..." />;
  }

  if (error) {
    return (
      <Error
        message="Gagal memuat data dashboard"
        onRetry={() => dispatch(fecthDataDashboard())}
      />
    );
  }

  const card = [
    { title: "Total Blog Posts", value: blogs?.length || 0 },
    { title: "Total Testimonials", value: testimonials?.length || 0 },
    { title: "Total Heroes", value: heroes?.length || 0 },
    { title: "Total Logo PTs", value: logoPTs?.length || 0 },
    { title: "Total Iklan", value: iklan?.length || 0 },
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.15 },
        },
      }}
      className="p-4"
    >
      <h1 className="text-2xl font-bold mb-6 text-primary">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {card.map((item, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            className="card bg-base-100 shadow-md hover:shadow-lg transition duration-300"
          >
            <div className="card-body">
              <h2 className="card-title">{item.title}</h2>
              <p className="text-3xl font-bold text-primary">{item.value}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Dashboard;
