export default function EditProfile({ user, isOpen, toggleDialog }) {
  const closeDialog = () => {
    toggleDialog();
  };
  return (
    <div
      onClick={closeDialog}
      className="z-50 fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center"
    >
      <div
        className="bg-white rounded-lg shadow-lg w-3/4 md:w-1/2 lg:w-1/3 p-4 relative h-1/4 flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()} // Prevent click event from bubbling up to the parent div
      >
        Edit Profile
      </div>
    </div>
  );
}
