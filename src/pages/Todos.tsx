import useAuthenticationQuery from "../hooks/useAuthenticationQuery";
import TodoSkeleton from "../components/TodoSkeleton";
import Button from "../components/ui/Button";
import axiosInstance from "../config/axios.config";
import { faker } from "@faker-js/faker";
import Paginator from "../components/ui/Paginator";
import { useState } from "react";



const Todos = () => {
  const [page, setPage] = useState<number>(1);
  const storageKey = "loggedInUser";
  const userDataString = localStorage.getItem(storageKey)
  const userData = userDataString ? JSON.parse(userDataString) : null;
  const { isPending, data } = useAuthenticationQuery({
    queryKey: ["Todo",`${page}`],
    url: "todos",
    config: {
      headers: {
        Authorization: `Bearer ${userData.jwt}`,
      }
    }
  })
  const GenerateFakeData = async () => {
    for (let i = 0; i < 100; i++) {

      try {
        await axiosInstance.post(`/todos`, { data: { title :faker.word.words(5), description:faker.lorem.paragraph(3), user: [userData.user.id] } }, {
          headers: {
            Authorization: `Bearer ${userData.jwt}`
          }
        })

      } catch (error) {
        console.log(error)
      }

    }
  }
  console.log(data)
  if (isPending) return <div className="mt-24">{Array.from({ length: 3 }, (_, idx) => <TodoSkeleton key={idx} />)}</div>
      /** Handlers */
      const handlerOnClickPrev = () => {
        setPage(prev => prev -1)
      }  
      const handlerOnClickNext = () => {
        setPage(prev => prev +1)
      }  
  
  return (

    <div className="flex flex-col justify-center items-center  mx-auto my-10 space-y-4 ">
      <div className=" flex justify-center items-center">
      <Button variant="outline" size={"sm"} onClick={GenerateFakeData} className="w-52 ">
        Generate todos
      </Button>
      </div>
      {
        data.data.map(({ attributes, id }: { id: number; attributes: { title: string } }) => (
          <>
            <div key={id} className=" space-x-4 flex  w-1/2 hover:bg-gray-100 duration-300 p-3 rounded-md even:bg-gray-100">
              
              <p className=" font-semibold">
                {id} - {attributes.title}
              </p>

            </div>
          </>
        ))
      }
      <Paginator page={page} pageCount={3} setPrev={handlerOnClickPrev} setNext={handlerOnClickNext}/>
      </div>
  )

}

export default Todos;
