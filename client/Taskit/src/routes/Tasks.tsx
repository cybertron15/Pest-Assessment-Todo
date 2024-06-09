import { redirect } from "react-router-dom";
import TasksList from "../components/TasksList"
import { removeTokens } from "@/utils/tokenUtils";


export async function action({ params, request }: { params: any, request: Request }) {
  const formData = await request.formData();
  const formType = formData.get("formType");

  if (formType === "logout") {
      removeTokens();
      return redirect('/login');
  }

  return null;
}

export async function loader() {
  const token = localStorage.getItem('accessToken');
  if (token === null){return redirect('/login')}
  return null
}

function Todo() {
  return (
    <div className="flex justify-center items-center h-svh w-full">
      
      <div className="w-full h-full lg:py-10 lg:px-[12%] xl:px-[20%]">
        <TasksList />
      </div>
    </div>
  )
}

export default Todo