/* eslint-disable @typescript-eslint/no-explicit-any */

import Button from "./ui/Button";
import useAuthenticationQuery from "../hooks/useAuthenticationQuery";
import { ChangeEvent, FormEvent, useState } from "react";
import { ITodo } from "@/interface";
import Modal from "./ui/Modal";
import Input from "./ui/Input";
import Textarea from "./ui/Textarea";
import { Form } from "react-router-dom";
import axiosInstance from "../config/axios.config";
import TodoSkeleton from "./TodoSkeleton";
import { faker } from '@faker-js/faker';

const TodoList = () => {
  const [isEditModelOpen, setIsEditModelOpen] = useState(false)
  const [queryVersion, setQueryVersion] = useState(1)
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)
  const [isOpenAddModal, setIsOpenAddModal] = useState(false)
  const [isUpdate, setIsUpdate] = useState(false)
  const [todoAdd, setTodoAdd] = useState({
    title: "",
    description: ""
  })
  const [todoToEdit, setTodoTodEdit] = useState<ITodo>({
    id: 0,
    title: "",
    description: ""
  })
  const storageKey = "loggedInUser";
  const userDataString = localStorage.getItem(storageKey)
  const userData = userDataString ? JSON.parse(userDataString) : null;
  const { isPending, data } = useAuthenticationQuery({
    queryKey: ["TodoList", `${queryVersion}`],
    url: "users/me?populate=todos",
    config: {
      headers: {
        Authorization: `Bearer ${userData.jwt}`,
      }
    }
  })
  /** Handler */
  const openAddModal = () => {
    setTodoAdd({
      title: "",
      description: ""
    })
    setIsOpenAddModal(true);
  }
  const openConfirmModal = (todo: ITodo) => {
    setTodoTodEdit(todo)
    setIsOpenConfirmModal(true);
  }
  const closeConfirmModal = () => {
    setTodoTodEdit({
      id: 0,
      title: "",
      description: ""
    })
    setIsOpenConfirmModal(false);
  }
  const onRemove = async () => {
    try {
      const { status } = await axiosInstance.delete(`todos/${todoToEdit.id}`, {
        headers: {
          Authorization: `Bearer ${userData.jwt}`
        }
      })
      if (status) {
        closeConfirmModal();
        setQueryVersion(prev => prev + 1)
      }
    } catch (error) {
      console.log(error)
    }

  }
  const onCloseEditModel = () => {
    setTodoTodEdit({
      id: 0,
      title: "",
      description: ""
    })
    setIsEditModelOpen(false)

  }
  const onCloseAddModel = () => {
    setIsOpenAddModal(false)

  }
  const onOpenEditModel = (todo: ITodo) => {
    setTodoTodEdit(todo)
    setIsEditModelOpen(true);

  }


  const onChangeAddHandler = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setTodoAdd(
      {
        ...todoAdd,
        [name]: value
      }
    )
  }
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setTodoTodEdit(
      {
        ...todoToEdit,
        [name]: value
      }
    )
  }
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
  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUpdate(true)
    try {
      const { title, description } = todoToEdit
      const { status } = await axiosInstance.put(`/todos/${todoToEdit.id}`, { data: { title, description } }, {
        headers: {
          Authorization: `Bearer ${userData.jwt}`
        }
      })
      if (status === 200) {
        onCloseEditModel()
        setQueryVersion(prev => prev + 1)
      }

    } catch (error) {
      console.log(error)
    } finally {
      setIsUpdate(false)
    }

  }
  const onSubmitAddHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUpdate(true)
    try {
      const { title, description } = todoAdd
      const { status } = await axiosInstance.post(`/todos`, { data: { title, description, user: [userData.user.id] } }, {
        headers: {
          Authorization: `Bearer ${userData.jwt}`
        }
      })
      if (status === 200) {
        onCloseAddModel()
        setQueryVersion(prev => prev + 1)
      }

    } catch (error) {
      console.log(error)
    } finally {
      setIsUpdate(false)
    }

  }
  if (isPending) return <div className="mt-24">{Array.from({ length: 3 }, (_, idx) => <TodoSkeleton key={idx} />)}</div>
  return (
    <>
      <div className="space-y-1 ">
        <div className="flex w-fit mx-auto my-10 gap-x-2">
          <Button variant="default" size={"sm"} onClick={openAddModal}>
            Post new todo
          </Button>
          <Button variant="outline" size={"sm"} onClick={GenerateFakeData}>
            Generate todos
          </Button>
        </div>
        {
          data.todos.map((todo: ITodo) => (
              <div key={todo.id} className=" space-x-4 flex items-center justify-between hover:bg-gray-100 duration-300 p-3 rounded-md even:bg-gray-100">
                <p className="w-full font-semibold">
                   {todo.title}
                </p>

                <Button variant={"default"} size={"sm"} className="w-1/3" onClick={() => onOpenEditModel(todo)}>Edit </Button>
                <Button variant={"danger"} size={"sm"} className="w-1/3" onClick={() => openConfirmModal(todo)}>Remove </Button>
              </div>
          ))
        }
        {/* Add Model  */}
        <Modal isOpen={isOpenAddModal} closeModal={onCloseAddModel} title="Edit this Todo">
          <Form className="space-y-3" onSubmit={onSubmitAddHandler}>
            <Input name="title" value={todoAdd.title} onChange={onChangeAddHandler} className={""} />
            <Textarea name="description" value={todoAdd.description} onChange={onChangeAddHandler} className={""} />
            <div className="flex items-center space-x-3 mt-4">
              <Button className="bg-indigo-700 hover:bg-indigo-800 w-3/5" isLoading={isUpdate}>Add Todo</Button>
              <Button type="button" variant={"cancel"} onClick={onCloseAddModel} className="w-2/5">cancel</Button>
            </div>
          </Form>
        </Modal>
        {/* Edit Model  */}
        <Modal isOpen={isEditModelOpen} closeModal={onCloseEditModel} title="Edit this Todo">
          <Form className="space-y-3" onSubmit={onSubmitHandler}>
            <Input name="title" value={todoToEdit.title} onChange={onChangeHandler} className={""} />
            <Textarea name="description" value={todoToEdit.description} onChange={onChangeHandler} className={""} />
            <div className="flex items-center space-x-3 mt-4">
              <Button className="bg-indigo-700 hover:bg-indigo-800 w-3/5" isLoading={isUpdate}>Update</Button>
              <Button type="button" variant={"cancel"} onClick={onCloseEditModel} className="w-2/5">cancel</Button>
            </div>
          </Form>
        </Modal>
        {/* Remove Model */}
        <Modal
          isOpen={isOpenConfirmModal}
          closeModal={closeConfirmModal}
          title="Are you sure you want to remove this todo from your store ?"
          description="Deleting this todo will remove it permenantly from your inventory. Any associated data, sales history, and other related information will also be deleted. Please make sure this is the intended action."
        >
          <div className="flex items-center space-x-3 mt-4">
            <Button variant="danger" size={"sm"} onClick={onRemove} className="w-3/5 py-3">
              Yes , Remove
            </Button>
            <Button variant="cancel" type="button" size={"sm"} onClick={closeConfirmModal} className="w-2/5 py-3">
              Cancel
            </Button>
          </div>
        </Modal>
      </div>



    </>
  )

}

export default TodoList;