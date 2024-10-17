export default function ViewProfile({ user, isOpen, toggleDialog }) {
  const closeDialog = () => {
    toggleDialog();
  };
  console.log(user);
  return (
    <div
      onClick={closeDialog}
      className="z-50 fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center"
    >
      <div
        className="bg-white rounded-lg shadow-lg w-3/4 md:w-1/2 lg:w-1/3 p-4 relative min-h-[50%] justify-between flex flex-col space-y-4"
        onClick={(e) => e.stopPropagation()} // Prevent click event from bubbling up to the parent div
      >
        <div className="font-medium  text-2xl ">View Profile</div>

        {/* Dialog Content  */}
        <div className="space-y-2 flex-1">
          <div className="flex space-x-4 items-center">
            <p className="w-1/4">Full Name</p>
            <p className="">
              {user.basicInformation.firstName} {user.basicInformation.lastName}
            </p>
          </div>
          <div className="flex space-x-4 items-center ">
            <p className="w-1/4">Email</p>
            <p className="">{user.basicInformation.email}</p>
          </div>
          <div className="flex space-x-4 items-center ">
            <p className="w-1/4">Address</p>
            <p className="">{user.contactInformation.address ?? "N/A"}</p>
          </div>
          <div className="flex space-x-4 items-center ">
            <p className="w-1/4">Contact</p>
            <p className="">{user.contactInformation.phoneNumber}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
