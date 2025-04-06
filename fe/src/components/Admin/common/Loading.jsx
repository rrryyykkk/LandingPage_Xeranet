const Loading = ({ mesage = "Loading..." }) => {
  return (
    <div className=" flex flex-col items-center justify-center min-h-[200px] gap-4 text-center">
      <span className="loading loading-spinner loading-lg text-primary" />
      <p className=" text-base-content/70">{mesage}</p>
    </div>
  );
};

export default Loading;
