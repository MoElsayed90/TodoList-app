const TodoSkeleton = () => {
  return (
    <div className="flex items-center justify-between space-y-1  space-x-2 ">
      <div className="w-full py-3 bg-gray-200 rounded-full dark:bg-gray-700"></div>
      <div className="flex items-center space-x-2">
        <div className="h-9 bg-gray-300 rounded-md dark:bg-gray-700 w-20 "></div>
        <div className=" h-9 bg-gray-300 rounded-md dark:bg-gray-700 w-20 "></div>
      </div>
    </div>
  );
};

export default TodoSkeleton;