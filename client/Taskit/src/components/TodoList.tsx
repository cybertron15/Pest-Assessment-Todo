import { Filter, Power } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import Tasks from "./Tasks"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
	DropdownMenuCheckboxItem
} from "@/components/ui/dropdown-menu"
import { useState } from "react"
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"

function TodoList() {
	type Checked = DropdownMenuCheckboxItemProps["checked"]
	const [filterAll, setfilterAll] = useState<Checked>(true)
	const [filterInProgress, setfilterInProgress] = useState<Checked>(false)
	const [filterDone, setfilterDone] = useState<Checked>(false)
	return (

		<div className="h-full w-full bg-white rounded-lg flex shadow-xl">
			<div className="flex flex-col basis-1/2 bg-green-700 rounded-s-lg px-4 py-2 h-full">
				<div className="flex justify-between items-center">
					<div className="text-white text-4xl">
						Taskit
					</div>
					<Power className="hover:text-red-400 cursor-pointer text-green-400" />
				</div>
				<div className="flex flex-col h-full pt-[30%] items-center">
					<div>
						<h2 className="text-white text-2xl mb-2">
							Create Tasks
						</h2>
						<form className="flex flex-col gap-2 w-72">
							<input type="text" placeholder="Task" className="bg-none rounded-lg text-lg px-2 py-1 text-gray-400" required />
							<input type="text" placeholder="Description" className="bg-none rounded-lg text-lg px-2 py-1 text-gray-400" required />
							<input type="datetime-local" placeholder="Description" className="bg-none rounded-lg text-lg px-2 py-1 text-gray-400" required />
							<input type="submit" value="Add Task" className="bg-green-600 rounded-lg text-lg px-2 py-1 text-white cursor-pointer" required />
						</form>
					</div>
				</div>
			</div>
			<div className="flex-1">
				<div className="px-4 py-2 h-full w-full">
					<div className="flex w-full justify-between items-center">

						<div className="text-4xl text-green-600">
							Tasks
						</div>
						<DropdownMenu>
							<DropdownMenuTrigger asChild className="cursor-pointer">
								<Filter className="mt-2 text-slate-400" />
								</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuCheckboxItem checked={filterAll} onClick={()=>{
									setfilterAll(true)
									setfilterInProgress(false)
									setfilterDone(false)
								}}>All</DropdownMenuCheckboxItem>
								<DropdownMenuCheckboxItem checked={filterInProgress}  onClick={()=>{
									setfilterAll(false)
									setfilterInProgress(true)
									setfilterDone(false)
								}}>In Progress</DropdownMenuCheckboxItem>
								<DropdownMenuCheckboxItem checked={filterDone}  onClick={()=>{
									setfilterAll(false)
									setfilterInProgress(false)
									setfilterDone(true)
								}}>Done</DropdownMenuCheckboxItem>
							</DropdownMenuContent>
						</DropdownMenu>

						
					</div>
					<hr className="border-t-2 my-2" />
					<ScrollArea className="h-[90%] w-full px-2">
						{
							[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15].map((item, index) => {
								return <Accordion type="single" key={1} collapsible className="border-b-2 px-2 mb-2">
									<AccordionItem value={"test"}>
										<AccordionTrigger>
											<Tasks task={"Test "} time={"Mon, Jul 15 2024 at 2:34 AM"} status={"pending"} />
										</AccordionTrigger>
										<AccordionContent className="px-1">
											<div className="font-medium">
												Description
											</div>
											<div className="text-slate-600">
												{"kuch to"}
											</div>
										</AccordionContent>
									</AccordionItem>
								</Accordion>
							})
						}
					</ScrollArea>

				</div>
			</div>

		</div>

	)
}

export default TodoList