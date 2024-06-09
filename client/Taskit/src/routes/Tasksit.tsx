import { redirect } from "react-router-dom";
import TasksList from "../components/TasksList"
import { removeTokens } from "@/utils/tokenUtils";
import axiosInstance from "@/utils/axiosInstance";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";


export async function action({ params, request }: { params: any, request: Request }) {
	const formData = await request.formData();
	const formType = formData.get("formType");
	const id = formData.get("id");
	const task = formData.get("task");
	const description = formData.get("description");
	const due = formData.get("due");

	if (formType === "logout") {
		removeTokens();
		return redirect('/login');
	}

	if (formType === "create") {
		try {
			await axiosInstance.post('/tasks/', { task, description, due });
			toast('Task added')
			return 'success'

		} catch (error) {
			toast('Failed to Create task')
			console.error('Error Creating task', error);
			return 'fail'
		}
	}

	if (formType === "edit") {
		try {
			await axiosInstance.put(`/tasks/${id}`, { task, description, due });
			toast('Task Edited')
			return 'success'

		} catch (error) {
			toast('Failed to Edit Task')
			console.error('Error Editing Task', error);
			return 'fail'
		}
	}

	if (formType === "delete") {
		try {
			const res = await axiosInstance.delete(`/tasks/${id}`);
			console.log(res);
			
			toast('Task Deleted')
			return 'success'

		} catch (error) {
			toast('Failed to Delete Task')
			console.error('Error Deleting Task', error);
			return 'fail'
		}
	}
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