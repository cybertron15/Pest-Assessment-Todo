import TodoList from "../components/TodoList"

function Todo() {
  return (
    <div className="flex justify-center items-center h-svh w-full">
      <div className="w-full h-full py-10 px-72">
        <TodoList />
      </div>
    </div>
  )
}

export default Todo