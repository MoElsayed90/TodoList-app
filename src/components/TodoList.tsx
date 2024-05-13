/* eslint-disable @typescript-eslint/no-explicit-any */

import Button from "./ui/Button";
import useAuthenticationQuery from "../hooks/useAuthenticationQuery";
// import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "./ui/dialog";
// import { DialogFooter, DialogHeader } from "./ui/dialog";
// import Input from "./ui/Input";
// import Textarea from "./ui/Textarea";
import { ChangeEvent, FormEvent, useState } from "react";
import { ITodo } from "@/interface";
import Modal from "./ui/Modal";
import Input from "./ui/Input";
import Textarea from "./ui/Textarea";
import { Form } from "react-router-dom";
import axiosInstance from "../config/axios.config";
// import { useState } from "react";

const TodoList = () => {
  const [isEditModelOpen, setIsEditModelOpen] = useState(false)
  const [isUpdate, setIsUpdate] = useState(false)
  const [todoToEdit, setTodoTodEdit] = useState<ITodo>({
    id: 0,
    title: "",
    description: ""
  })
  const storageKey = "loggedInUser";
  const userDataString = localStorage.getItem(storageKey)
  const userData = userDataString ? JSON.parse(userDataString) : null;
  const { isPending, data } = useAuthenticationQuery({
    queryKey: ["TodoList",`${todoToEdit.id}`],
    url: "users/me?populate=todos",
    config: {
      headers: {
        Authorization: `Bearer ${userData.jwt}`,
      }
    }
  })
  /** Handler */
  const onCloseEditModel = () => {
    setTodoTodEdit({
      id: 0,
      title: "",
      description: ""
    })
    setIsEditModelOpen(false)

  }
  const onOpenEditModel = (todo: ITodo) => {
    setTodoTodEdit(todo)
    setIsEditModelOpen(true);

  }

  if (isPending) return <h2>Loading ...</h2>;
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setTodoTodEdit(
      {
        ...todoToEdit,
        [name]: value
      }
    )
  }
  const onSubmitHandler = async(e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUpdate(true)
    try {
      const {title,description} = todoToEdit
     const {status} = await axiosInstance.put(`/todos/${todoToEdit.id}`,{data:{title,description}},{
      headers:{
        Authorization:`Bearer ${userData.jwt}`
      }
     })
     if(status === 200){
      onCloseEditModel()
     }

    } catch (error) {
      console.log(error)
    }finally{
      setIsUpdate(false)
    }

  }
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
          data.todos.map((todo: any) => (
            <>
              <div key={todo.id} className=" space-x-4 flex items-center justify-between hover:bg-gray-100 duration-300 p-3 rounded-md even:bg-gray-100">
                <p className="w-full font-semibold">
                  {todo.id} - {todo.title}
                </p>

                <Button variant={"default"} size={"sm"} className="w-1/3" onClick={() => onOpenEditModel(todo)}>Edit </Button>
                <Button variant={"danger"} size={"sm"} className="w-1/3">Remove </Button>
              </div>
            </>
          ))
        }
        {/*  */}
        <Modal isOpen={isEditModelOpen} closeModal={onCloseEditModel} title="Edit this Todo">
          <Form className="space-y-3" onSubmit={onSubmitHandler}>
            <Input name="title" value={todoToEdit.title} onChange={onChangeHandler} className={""} />
            <Textarea name="description" value={todoToEdit.description} onChange={onChangeHandler} className={""} />
            <div className="flex items-center space-x-3 mt-4">
              <Button className="bg-indigo-700 hover:bg-indigo-800 w-3/5" isLoading={isUpdate}>Update</Button>
              <Button variant={"cancel"} onClick={onCloseEditModel} className="w-2/5">cancel</Button>
            </div>

          </Form>
        </Modal>


      </div>



    </>
  )

}

export default TodoList;