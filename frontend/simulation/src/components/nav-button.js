export const NavButton = ({ label, onClick }) => {
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white min-w-32 font-bold py-2 px-4 rounded"
      onClick={onClick}
    >
      {label}
    </button>
  );
};
