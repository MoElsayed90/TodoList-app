import Button from "../components/ui/Button";

const Todos = () => {
  return (
    <>
      <div className="flex items-center justify-center space-x-2">
        <Button className="bg-indigo-500 hover:bg-indigo-700 capitalize w-1/6">
          Generate todos
        </Button>
        <div className="flex items-center justify-between space-x-2 text-md">
          <select className="border-2 border-indigo-600 rounded-md p-2"
          >
            <option disabled>Sort by</option>
            <option value="ASC">Oldest</option>
            <option value="DESC">Latest</option>
          </select>
          <select className="border-2 border-indigo-600 rounded-md p-2" >
            <option disabled>Page Size</option>
            <option value={10}>10</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
      </div>
      <div className="my-20 space-y-6">
        <div className="flex items-center justify-between hover:bg-gray-100 duration-300 p-3 rounded-md even:bg-gray-100">
          <h3 className="w-full font-semibold">1-title</h3>
        </div>
      </div>
      <div className="my-20 space-y-6">
        <div className="flex items-center justify-between hover:bg-gray-100 duration-300 p-3 rounded-md even:bg-gray-100">
          <h3 className="w-full font-semibold">1-title</h3>
        </div>
      </div>
      <div className="my-20 space-y-6">
        <div className="flex items-center justify-between hover:bg-gray-100 duration-300 p-3 rounded-md even:bg-gray-100">
          <h3 className="w-full font-semibold">1-title</h3>
        </div>
      </div>
    </>
  );
};

export default Todos;
