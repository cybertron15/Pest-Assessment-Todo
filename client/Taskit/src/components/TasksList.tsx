import { ArrowDownUp, ArrowDownWideNarrow, ArrowDownZA, ArrowUpAZ, ArrowUpWideNarrow, Plus, Filter } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import Tasks from "./Tasks"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
	DropdownMenuCheckboxItem,
	DropdownMenuShortcut
} from "@/components/ui/dropdown-menu"

import { useEffect, useRef, useState } from "react"
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"
import { Input } from "./ui/input"
import parseDate from "@/utils/dateParseUtil"

import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "./ui/button"
import Setting from "./Setting"
import { Badge } from "./ui/badge"
import { Form, useActionData, useLoaderData, useNavigate, useNavigation } from "react-router-dom"
import { ScaleLoader } from "react-spinners"


type Task = {
	id: string,
	task: string,
	due: string,
	status: string,
	description: string

}
type Checked = DropdownMenuCheckboxItemProps["checked"]
type TaskStatusMap = { [key: string]: string }
function TaskList() {
	const [filter, setfilter] = useState<string | null>(null)
	const [filterAll, setfilterAll] = useState<Checked>(true)
	const [filterInProgress, setfilterInProgress] = useState<Checked>(false)
	const [filterTodo, setfilterTodo] = useState<Checked>(false)
	const [filterDone, setfilterDone] = useState<Checked>(false)

	const [sortCriteria, setsortCriteria] = useState<string>("date-asc")
	const [alphaAsc, setalphaAsc] = useState(true)
	const [alphaDesc, setalphaDesc] = useState(false)
	const [dateAsc, setdateAsc] = useState(false)
	const [dateDesc, setdateDesc] = useState(false)

	const [search, setSearch] = useState<string | null>(null)
	// const [quote, setquote] = useState({quote:"", author:""})

	const [tasks, settasks] = useState<Task[] | null>(useLoaderData() as Task[])
	const [preparedTasks, setpreparedTasks] = useState<Task[] | null>(null)

	const data: Task[] = useLoaderData() as Task[]

	useEffect(() => {
		if (data) {
			settasks(data)
		}
	}, [data])

	const taskStatusMap: TaskStatusMap = {
		"1": "Todo",
		"2": "In Progress",
		"3": "Done"
	}


	useEffect(() => {
		function sortTasks() {
			// Sorting function
			const sortingFunctions = {
				'alphabetic-asc': (a, b) => a.task.localeCompare(b.task),
				'alphabetic-desc': (a, b) => b.task.localeCompare(a.task),
				'date-asc': (a, b) => new Date(a.due) - new Date(b.due),
				'date-desc': (a, b) => new Date(b.due) - new Date(a.due)
			};
		
			// Get the sorting function based on sortCriteria
			const sortingFunction = sortingFunctions[sortCriteria];
		
			if (tasks && sortingFunction) {
				// Set sort states based on sortCriteria
				setalphaAsc(sortCriteria === 'alphabetic-asc');
				setalphaDesc(sortCriteria === 'alphabetic-desc');
				setdateAsc(sortCriteria === 'date-asc');
				setdateDesc(sortCriteria === 'date-desc');
		
				// Sort tasks
				const sortedTasks = [...tasks].sort(sortingFunction);
				settasks(sortedTasks);
			}
		}
		sortTasks()
	}, [sortCriteria])


	useEffect(() => {
		// handles tasks filtering
		function filterTasks() {
			// setting filter states on dropdown
			switch (filter) {
				case "Todo":
					setfilterAll(false)
					setfilterTodo(true)
					setfilterInProgress(false)
					setfilterDone(false)
					break;

				case "In Progress":
					setfilterAll(false)
					setfilterTodo(false)
					setfilterInProgress(true)
					setfilterDone(false)
					break;

				case "Done":
					setfilterAll(false)
					setfilterTodo(false)
					setfilterInProgress(false)
					setfilterDone(true)
					break;
				default:
					setfilterAll(true)
					setfilterTodo(false)
					setfilterInProgress(false)
					setfilterDone(false)
					break;
			}
			if (filter !== null) {
				const preparedTasks = tasks?.filter(item => taskStatusMap[item.status].toLowerCase() === filter.toLowerCase());
				if (preparedTasks) { setpreparedTasks(preparedTasks) }
				return preparedTasks
			}
			else {
				setpreparedTasks(tasks)
				return tasks
			}
		}

		// handles search
		function searchTasks() {

			const preparedTasks = filterTasks()
			if (search !== null) {
				const updatedTasks = preparedTasks?.filter(item => item.task.toLowerCase().includes(search.toLocaleLowerCase()));
				if (updatedTasks)
					setpreparedTasks(updatedTasks)
			}
			if (search === null || search === "") {
				if (preparedTasks) {
					setpreparedTasks(preparedTasks)
				}
			}
		}
		filterTasks()
		searchTasks()
	}, [search, filter, tasks])


	// handles and updates tasks status change
	const handleTaskStatusChange = (id: string, status: string) => {
		const updatedTasks = tasks?.map((task) => {
			return task.id === id ?
				{ ...task, status: status } : task
		})
		if (updatedTasks) {
			settasks(updatedTasks)
		}
	}
	const drawerRef = useRef<HTMLButtonElement>(null);
	const actionData = useActionData()
	const navigation = useNavigation()

	if (actionData === "success") {
		drawerRef.current?.click()
	}
	return (
		<div className="h-full w-full bg-white lg:rounded-lg flex shadow-xl">
			<div className="relative lg:flex flex-col basis-1/2 bg-green-700 lg:rounded-s-lg px-4 py-2 h-full hidden">
				{
					navigation.state !== "idle" &&
					<div className='absolute top-0 left-0 rounded-lg h-full w-full bg-black opacity-70 flex items-center justify-center'>
						<ScaleLoader color="white" />
					</div>
				}
				<div className="flex justify-between items-center">
					<div className="text-white text-4xl">
						Taskit
					</div>
					<Setting />
				</div>
				<div className="flex flex-col h-full mt-[35%] items-center">

					{/* <div className="text-white text-lg mt-[10%]">
						Hey Palash! You have {tasks.filter(task => task.status !== "Done").length} tasks to conquer.
					</div> */}
					<div className="">
						<h2 className="text-white text-2xl mb-2">
							Create Tasks
						</h2>
						<Form className="flex flex-col gap-2 w-72" method="post">
							<input type="hidden" name="formType" value="create" />
							<input type="text" placeholder="Task" name="task" className="bg-none rounded-lg text-lg px-2 py-1 text-gray-400" required />
							<input type="text" placeholder="Description" name="description" className="bg-none rounded-lg text-lg px-2 py-1 text-gray-400" required />
							<input type="datetime-local" placeholder="" name="due" className="bg-none rounded-lg text-lg px-2 py-1 text-gray-400" required />
							<input type="submit" value="Add Task" disabled={navigation.state !== "idle"} className="bg-green-600 rounded-lg text-lg px-2 py-1 text-white cursor-pointer" />
						</Form>
					</div>

				</div>
			</div>
			<div className="relative flex-1 ">
				<div className="fixed lg:hidden bottom-1 right-2">

				</div>
				<div className="px-4 py-2 h-full w-full ">
					<div className="flex w-full gap-8 justify-between items-center">
						<div className="text-4xl text-green-600">
							<div className="hidden lg:block">Tasks</div>
							<div className="lg:hidden flex gap-3 items-center">
								<div className="text-black">Taskit</div>

								<Drawer>
									<DrawerTrigger className="bg-green-600 rounded-md mt-1 shadow-xl p-1"><Plus className="text-white" size={22} /></DrawerTrigger>
									<DrawerContent className="bg-green-700 flex flex-col items-center border-none">
										{
											navigation.state !== "idle" &&
											<div className='absolute top-0 left-0 rounded-lg h-full w-full bg-black opacity-70 flex items-center justify-center'>
												<ScaleLoader color="white" />
											</div>
										}
										<DrawerHeader>
											<DrawerTitle>
												<h2 className="text-white text-2xl mb-2">
													Create Tasks
												</h2>
											</DrawerTitle>
										</DrawerHeader>
										<Form className="flex flex-col gap-2 w-72" method="post">
											<input type="hidden" name="formType" value="create" />
											<input type="text" placeholder="Task" name="task" className="bg-none rounded-lg text-lg px-2 py-1 text-gray-400" required />
											<input type="text" placeholder="Description" name="description" className="bg-none rounded-lg text-lg px-2 py-1 text-gray-400" required />
											<input type="datetime-local" name="due" className="w-full bg-none rounded-lg text-lg px-2 py-1 text-gray-400" required />
											<DrawerFooter className="px-0">
												<input type="submit" disabled={navigation.state !== "idle"} value="Add Task" className="bg-green-600 rounded-lg text-lg py-1 text-white cursor-pointer" required />
												<DrawerClose ref={drawerRef}>
													<Button className="bg-green-700 w-full border-2 border-green-600">Cancel</Button>
												</DrawerClose>
											</DrawerFooter>
										</Form>
									</DrawerContent>
								</Drawer>
								<div className="mt-[2px]">
									<Setting />
								</div>
							</div>
						</div>
						<div className="flex gap-2 border-2 rounded-lg pe-2">
							<Input placeholder="Search" className="border-none outline-none" onChange={(event) => {
								setSearch(event.target.value)
							}}></Input>
							<DropdownMenu>
								<DropdownMenuTrigger asChild className="cursor-pointer">
									<ArrowDownUp className="mt-2 text-slate-400" />
								</DropdownMenuTrigger>
								<DropdownMenuContent className="w-40">
									<DropdownMenuCheckboxItem checked={alphaAsc} onClick={() => {
										setsortCriteria('alphabetic-asc')
									}}>Alpha Asc
										<DropdownMenuShortcut><ArrowUpAZ /></DropdownMenuShortcut>
									</DropdownMenuCheckboxItem>
									<DropdownMenuCheckboxItem checked={alphaDesc} onClick={() => {
										setsortCriteria('alphabetic-desc')
									}}>Alpha Desc
										<DropdownMenuShortcut><ArrowDownZA /></DropdownMenuShortcut>
									</DropdownMenuCheckboxItem>
									<DropdownMenuCheckboxItem checked={dateAsc} onClick={() => {
										setsortCriteria('date-asc')
									}}>
										Date Asc
										<DropdownMenuShortcut><ArrowUpWideNarrow /></DropdownMenuShortcut>
									</DropdownMenuCheckboxItem>
									<DropdownMenuCheckboxItem checked={dateDesc} onClick={() => {
										setsortCriteria('date-desc')
									}}>
										Date desc
										<DropdownMenuShortcut><ArrowDownWideNarrow /></DropdownMenuShortcut>
									</DropdownMenuCheckboxItem>
								</DropdownMenuContent>
							</DropdownMenu>
							<DropdownMenu>
								<DropdownMenuTrigger asChild className="cursor-pointer">
									<Filter className={`mt-2 ${filterAll ? "text-slate-400" : "text-green-600"}`} />
								</DropdownMenuTrigger>
								<DropdownMenuContent>
									<DropdownMenuCheckboxItem checked={filterAll} onClick={() => {
										setfilter(null)
									}}>All</DropdownMenuCheckboxItem>
									<DropdownMenuCheckboxItem checked={filterTodo} onClick={() => {
										setfilter("Todo")
									}}>Todo</DropdownMenuCheckboxItem>
									<DropdownMenuCheckboxItem checked={filterInProgress} onClick={() => {
										setfilter("In Progress")
									}}>In Progress</DropdownMenuCheckboxItem>
									<DropdownMenuCheckboxItem checked={filterDone} onClick={() => {
										setfilter("Done")
									}}>Done</DropdownMenuCheckboxItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
					</div>
					<hr className="border-t-2 my-2" />
					<ScrollArea className="h-[90%] w-full md:px-1">
						{
							preparedTasks !== null ?
								preparedTasks.length === 0 ?
									<div className="pt-20 text-lg text-center text-slate-500">
										No tasks
									</div> :
									(preparedTasks.map((task,index) => {
										return <Accordion type="single" key={task.id+index} collapsible className="border-b-2 px-2 mb-2">
											<AccordionItem value={"test"}>
												<AccordionTrigger className="relative">
													{
														(parseDate(task.due) < new Date() && taskStatusMap[task.status]!=="Done") && <Badge key={task.id} className="absolute z-30 -top-2 -left-2 text-xs bg-red-500 text-white rounded-s-none opacity-85 shadow-md">Due!!!</Badge>
													}
													<Tasks task={task.task} time={task.due} status={taskStatusMap[task.status]} id={task.id} desciption={task.description} onStatusChange={handleTaskStatusChange} />
												</AccordionTrigger>
												<AccordionContent className="px-1">
													<div className="font-medium">
														Task: {task.task}
													</div>
													<div className="font-medium">
														Description
													</div>
													<div className="text-slate-600">
														{task.description}
													</div>
												</AccordionContent>
											</AccordionItem>
										</Accordion>
									}))
								:
								<div className="h-full fl mt-[20%] flex justify-center">
									<ScaleLoader color="green" />
								</div>
						}
					</ScrollArea>
				</div>
			</div>
		</div>

	)
}

export default TaskList