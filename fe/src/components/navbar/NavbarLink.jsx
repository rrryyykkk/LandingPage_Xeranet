import clsx from "clsx";

const NavLink = ({ href, isActive, onClick, children, mobile = false }) => {
  return (
    <a
      href={href}
      onClick={onClick}
      className={clsx(
        "block transition-colors duration-300",
        mobile ? "w-full text-center text-xl py-4" : "px-2 text-base",
        isActive
          ? "text-red-500 font-bold"
          : "text-white font-normal hover:text-red-400"
      )}
    >
      {children}
    </a>
  );
};

export default NavLink;
