
import Button from "./ui/Button";
import axiosInstance from "../config/axios.config";
import { useQuery } from "@tanstack/react-query";

const TodoList = () => {
  const storageKey = "loggedInUser";
  const userDataString = localStorage.getItem(storageKey)
  const userData = userDataString ? JSON.parse(userDataString) : null;
  // useEffect(() => {
  //   try {
  //     axiosInstance.get("users/me?populate=todos",
  //       {
  //         headers: {
  //           Authorization: `Bearer ${userData.jwt}`
  //         }
  //       }
  //     ).then(res => setTodos(res.data.todos)).catch(err => console.log("The Error", err))
  //   } catch (error) {
  //     console.log(error)
  //   }
  // },[userData.jwt,setTodos])
  const { isPending, error, data } = useQuery({
    queryKey: ['todos'],
    queryFn: async () => {
      const { data } = await axiosInstance.get("users/me?populate=todos",
        {
          headers: {
            Authorization: `Bearer ${userData.jwt}`
          }
        }
      )
      return data
    }

  })
  if (isPending) return <h2>Loading ...</h2>;
  if (error) return 'An error has occurred: ' + error.message;
  console.log(data.todos)
  return (
    <>
      <div className="space-y-1 ">
        <div className="flex w-fit mx-auto my-10 gap-x-2">
          <Button variant="default" size={"sm"}>
            Post new todo
          </Button>
          <Button variant="outline" size={"sm"}>
            Generate todos
          </Button>
        </div>
        {
          data.todos.map(todo => (
            <div key={todo.id} className="flex items-center justify-between hover:bg-gray-100 duration-300 p-3 rounded-md even:bg-gray-100">
              <p className="w-full font-semibold">
                {todo.title}
              </p>
              <div className="flex items-center justify-end w-full space-x-3">
                <Button
                  variant={"default"}
                  size={"sm"}
                >
                  Edit
                </Button>
                <Button
                  variant={"danger"}
                  size={"sm"}>
                  Remove
                </Button>
              </div>
            </div>
          ))
        }

      </div>


    </>
  )

}

export default TodoList;