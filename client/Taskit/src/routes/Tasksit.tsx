import { redirect } from "react-router-dom";
import TasksList from "../components/TasksList"
import { removeTokens } from "@/utils/tokenUtils";
import axiosInstance from "@/utils/axiosInstance";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";


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
  if (token === null) { return redirect('/login') }

  try {
    const response = await axiosInstance.get('/tasks/');
    return response.data
  } catch (error) {
    toast('Error fetching data')
    console.error('Error fetching data', error);
    return null
  }
}

function Taskit() {
  return (
    <div className="flex justify-center items-center h-svh w-full">

      <div className="w-full h-full lg:py-10 lg:px-[12%] xl:px-[20%]">
        <TasksList />
      </div>

      <Toaster />
    </div>
  )
}

export default Taskit