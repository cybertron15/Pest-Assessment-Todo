import TodoList from "../components/TodoList"

function Todo() {
  return (
    <div className="flex justify-center items-center h-svh w-full">
      <div className="w-full h-full lg:py-10 lg:px-[12%] xl:px-[20%]">
        <TodoList />
      </div>
    </div>
  )
}

export default Todo