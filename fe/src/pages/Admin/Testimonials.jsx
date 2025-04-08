import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getTestimonials, deleteTestimonial } from "../../services/api";
import TestimonialForm from "../../components/Admin/common/TestimonialsForm";

const Testimonials = () => {
  const [openForm, setOpenForm] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const queryClient = useQueryClient();

  const { data: testimonials, isPending } = useQuery({
    queryKey: ["testimonials"],
    queryFn: getTestimonials,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTestimonial,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
    },
  });

  const handleEdit = (testimonial) => {
    setSelectedTestimonial(testimonial);
    setOpenForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus testimonial ini?")) {
      deleteMutation.mutate(id);
    }
  };

  if (isPending) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Testimonials</h1>
        <button
          className="btn btn-primary"
          onClick={() => {
            setSelectedTestimonial(null);
            setOpenForm(true);
          }}
        >
          Tambah Testimonial
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {testimonials?.map((testimonial) => (
          <div key={testimonial.id} className="card bg-base-100 shadow-md">
            <div className="card-body">
              <div className="flex items-center gap-4 mb-4">
                <div className="avatar">
                  <div className="w-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img src={testimonial.avatar} alt={testimonial.name} />
                  </div>
                </div>
                <div>
                  <h2 className="card-title text-lg">{testimonial.name}</h2>
                  <p className="text-sm text-gray-500">
                    {testimonial.position}
                  </p>
                </div>
              </div>
              <p className="text-gray-800 mb-2">{testimonial.content}</p>
              <p className="text-sm text-gray-500">
                Rating: {testimonial.rating}/5
              </p>
              <div className="card-actions justify-end mt-4">
                <button
                  className="btn btn-sm btn-outline btn-primary"
                  onClick={() => handleEdit(testimonial)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-outline btn-error"
                  onClick={() => handleDelete(testimonial.id)}
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <TestimonialForm
        open={openForm}
        onClose={() => setOpenForm(false)}
        testimonial={selectedTestimonial}
      />
    </div>
  );
};

export default Testimonials;
