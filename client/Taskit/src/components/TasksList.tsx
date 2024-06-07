import { ArrowDownUp, ArrowDownWideNarrow, ArrowDownZA, ArrowUpAZ, ArrowUpWideNarrow, Plus, Filter, Power } from "lucide-react"
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

import { useEffect, useState } from "react"
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"
import { Input } from "./ui/input"
import parseDate from "@/utils/dateParseUtil"

import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "./ui/button"
import Setting from "./Setting"
import loadInspirationalQuote from "@/utils/quoteLoadingUtil"
import { Badge } from "./ui/badge"


type Task = {
	id: string,
	task: string,
	time: string,
	status: string,
	description: string

}
type Checked = DropdownMenuCheckboxItemProps["checked"]

function TodoList() {
	const [filter, setfilter] = useState<string | null>(null)
	const [filterAll, setfilterAll] = useState<Checked>(true)
	const [filterInProgress, setfilterInProgress] = useState<Checked>(false)
	const [filterTodo, setfilterTodo] = useState<Checked>(false)
	const [filterDone, setfilterDone] = useState<Checked>(false)

	const [sortCriteria, setsortCriteria] = useState<string>("alphabetic-asc")
	const [alphaAsc, setalphaAsc] = useState(true)
	const [alphaDesc, setalphaDesc] = useState(false)
	const [dateAsc, setdateAsc] = useState(false)
	const [dateDesc, setdateDesc] = useState(false)

	const [search, setSearch] = useState<string | null>(null)
	// const [quote, setquote] = useState({quote:"", author:""})

	const [tasks, settasks] = useState<Task[]>([
		{
			id: "1",
			task: 'Submit Project Report',
			time: 'Mon, Jun 10 2024 at 9:00 AM',
			status: 'In Progress',
			description: 'Complete the final project report and submit it to the project manager.'
		},
		{
			id: "2",
			task: 'Team Meeting',
			time: 'Tue, Jun 11 2024 at 11:00 AM',
			status: 'Done',
			description: 'Discuss project milestones and next steps with the team.'
		},
		{
			id: "3",
			task: 'Code Review',
			time: 'Wed, Jun 12 2024 at 2:00 PM',
			status: 'Todo',
			description: 'Review the latest code commits and provide feedback to the developers.'
		},
		{
			id: "4",
			task: 'Client Presentation',
			time: 'Thu, Jun 13 2024 at 4:00 PM',
			status: 'In Progress',
			description: 'Prepare and present the project progress to the client.'
		},
		{
			id: "5",
			task: 'Design Mockups',
			time: 'Fri, Jun 14 2024 at 1:00 PM',
			status: 'Done',
			description: 'Create design mockups for the new feature and share them with the team.'
		},
		{
			id: "6",
			task: 'Update Documentation',
			time: 'Sat, Jun 15 2024 at 3:00 PM',
			status: 'Todo',
			description: 'Update the project documentation to reflect recent changes.'
		},
		{
			id: "7",
			task: 'Sprint Planningsss',
			time: 'Sun, Jun 5 2024 at 10:00 AM',
			status: 'In Progress',
			description: 'Plan the tasks and goals for the upcoming sprint with the team.'
		},
		{
			id: "8",
			task: 'Bug Fixes',
			time: 'Mon, Jun 17 2024 at 5:00 PM',
			status: 'Done',
			description: 'Fix critical bugs reported by the QA team.'
		},
		{
			id: "9",
			task: 'Performance Testing',
			time: 'Tue, Jun 18 2024 at 3:00 PM',
			status: 'Todo',
			description: 'Conduct performance testing on the new release and document the results.'
		},
		{
			id: "10",
			task: 'Code Deployment',
			time: 'Wed, Jun 19 2024 at 12:00 PM',
			status: 'Todo',
			description: 'Deploy the latest version of the code to the production environment.'
		},
		{
			id: "11",
			task: 'Submit Project Report',
			time: 'Mon, Jun 10 2024 at 9:00 AM',
			status: 'In Progress',
			description: 'Complete the final project report and submit it to the project manager.'
		},
		{
			id: "12",
			task: 'Team Meeting',
			time: 'Tue, Jun 11 2024 at 11:00 AM',
			status: 'Done',
			description: 'Discuss project milestones and next steps with the team.'
		},
		{
			id: "13",
			task: 'Code Review',
			time: 'Wed, Jun 12 2024 at 2:00 PM',
			status: 'Todo',
			description: 'Review the latest code commits and provide feedback to the developers.'
		},
		{
			id: "14",
			task: 'Client Presentation',
			time: 'Thu, Jun 13 2024 at 4:00 PM',
			status: 'In Progress',
			description: 'Prepare and present the project progress to the client.'
		},
	])
	const [preparedTasks, setpreparedTasks] = useState<Task[] | null>(null)
	useEffect(() => {
		function sortTasks() {
			// setting sort states on dropdown
			switch (sortCriteria) {
				case "alphabetic-asc":
					setalphaAsc(true)
					setalphaDesc(false)
					setdateAsc(false)
					setdateDesc(false)
					break;

				case "alphabetic-desc":
					setalphaAsc(false)
					setalphaDesc(true)
					setdateAsc(false)
					setdateDesc(false)
					break;

				case "date-asc":
					setalphaAsc(false)
					setalphaDesc(false)
					setdateAsc(true)
					setdateDesc(false)
					break;
				case "date-desc":
					setalphaAsc(false)
					setalphaDesc(false)
					setdateAsc(false)
					setdateDesc(true)
					break;

			}
			const sortedTasks = [...tasks].sort((a, b): number => {
				if (sortCriteria === 'date-asc') {
					return parseDate(a.time).getTime() - parseDate(b.time).getTime();
				} else if (sortCriteria === 'date-desc') {
					return parseDate(b.time).getTime() - parseDate(a.time).getTime();
				} else if (sortCriteria === 'alphabetic-asc') {
					return a.task.localeCompare(b.task);
				} else if (sortCriteria === 'alphabetic-desc') {
					return b.task.localeCompare(a.task);
				}
				return 0;
			});
			settasks(sortedTasks);
		};
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
				const preparedTasks = tasks.filter(item => item.status.toLowerCase() === filter.toLowerCase());
				setpreparedTasks(preparedTasks)
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
				const updatedTasks = preparedTasks.filter(item => item.task.toLowerCase().includes(search.toLocaleLowerCase()));
				setpreparedTasks(updatedTasks)
			}
			if (search === null || search === "") {
				setpreparedTasks(preparedTasks)
			}
		}
		filterTasks()
		searchTasks()
	}, [search, filter, tasks])


	// handles and updates tasks status change
	const handleTaskStatusChange = (id: string, status: string) => {
		const updatedTasks = tasks.map((task) => {
			return task.id === id ?
				{ ...task, status: status } : task
		})
		settasks(updatedTasks)
	}


	return (
		<div className="h-full w-full bg-white lg:rounded-lg flex shadow-xl">
			<div className="lg:flex flex-col basis-1/2 bg-green-700 lg:rounded-s-lg px-4 py-2 h-full hidden">
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
						<form className="flex flex-col gap-2 w-72">
							<input type="text" placeholder="Task" className="bg-none rounded-lg text-lg px-2 py-1 text-gray-400" required />
							<input type="text" placeholder="Description" className="bg-none rounded-lg text-lg px-2 py-1 text-gray-400" required />
							<input type="datetime-local" placeholder="" className="bg-none rounded-lg text-lg px-2 py-1 text-gray-400" required />
							<input type="submit" value="Add Task" className="bg-green-600 rounded-lg text-lg px-2 py-1 text-white cursor-pointer" required />
						</form>
					</div>
					{

					}
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
										<DrawerHeader>
											<DrawerTitle>
												<h2 className="text-white text-2xl mb-2">
													Create Tasks
												</h2>
											</DrawerTitle>
										</DrawerHeader>
										<form className="flex flex-col gap-2 w-72">
											<input type="text" placeholder="Task" className="bg-none rounded-lg text-lg px-2 py-1 text-gray-400" required />
											<input type="text" placeholder="Description" className="bg-none rounded-lg text-lg px-2 py-1 text-gray-400" required />
											<input type="datetime-local" className="w-full bg-none rounded-lg text-lg px-2 py-1 text-gray-400" required />
											<DrawerFooter className="px-0">
												<input type="submit" value="Add Task" className="bg-green-600 rounded-lg text-lg py-1 text-white cursor-pointer" required />
												<DrawerClose>
													<Button className="bg-green-700 w-full border-2 border-green-600">Cancel</Button>
												</DrawerClose>
											</DrawerFooter>
										</form>
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
									(preparedTasks.map((task) => {
										return <Accordion type="single" key={task.id} collapsible className="border-b-2 px-2 mb-2">
											<AccordionItem value={"test"}>
												<AccordionTrigger className="relative">
													{
														(parseDate(task.time) < new Date()) && <Badge className="absolute z-30 -top-2 -left-2 text-xs bg-red-500 text-white rounded-s-none opacity-85 shadow-md">Due!!!</Badge>
													}
													<Tasks task={task.task} time={task.time} status={task.status} id={task.id} desciption={task.description} onStatusChange={handleTaskStatusChange} />
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
								<div>
									spinner
								</div>
						}
					</ScrollArea>

				</div>
			</div>

		</div>

	)
}

export default TodoList