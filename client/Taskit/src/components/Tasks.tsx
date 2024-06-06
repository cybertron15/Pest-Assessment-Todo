import { Pencil } from "lucide-react";
import React, { useEffect, useState } from "react";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "./ui/tooltip";

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
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuCheckboxItem
} from "@/components/ui/dropdown-menu"
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";

import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "./ui/input";
import parseDate from "@/utils/dateParseUtil";
import { Button } from "./ui/button";
import formatDate from "@/utils/dateFortmatUtil";

type Props = {
    id: string;
    task: string;
    time: string;
    desciption: string;
    status: string;
    onStatusChange: (id: string, newStatus: string) => void
};
type Checked = DropdownMenuCheckboxItemProps["checked"]

function Tasks({
    id,
    task,
    time,
    status,
    desciption,
    onStatusChange
}: Props) {
    const [Todo, setTodo] = useState<Checked>(false)
    const [InProgress, setInProgress] = useState<Checked>(false)
    const [Done, setDone] = useState<Checked>(false)
    const [Taskstatus, setTaskstatus] = useState(status)
    useEffect(() => {
        switch (Taskstatus) {
            case "Todo":
                setTodo(true)
                setInProgress(false)
                setDone(false)
                break;
            case "In Progress":
                setTodo(false)
                setInProgress(true)
                setDone(false)
                break;
            case "Done":
                setTodo(false)
                setInProgress(false)
                setDone(true)
                break
        }
    }, [Taskstatus])

    return (
        <div
            className="flex justify-between items-center p-1 w-full"
        >
            <div className="flex flex-col ">
                <TooltipProvider >
                    <Tooltip>
                        <div className="flex items-center gap-1.5">
                            <TooltipTrigger className="text-lg md:text-xl font-Inter truncate ... max-w-36 md:max-w-48 text-start">
                                {task}
                            </TooltipTrigger>
                            <Dialog>
                                <DialogTrigger onClick={(event) => {
                                    event.stopPropagation() // stopping event propagation to prevent accordion trigger
                                }} className="hidden lg:block">
                                    <Pencil size={16} className="text-slate-500 cursor-pointer" />
                                </DialogTrigger>
                                <DialogContent onClick={(event) => {
                                    event.stopPropagation()
                                }} className="border-none hidden lg:block">
                                    <DialogHeader>
                                        <DialogTitle className="text-green-700 text-xl mb-3">Edit Task</DialogTitle>
                                    </DialogHeader>

                                    <form className="flex flex-col gap-2 w-full mb-2">
                                        <input placeholder="Task" defaultValue={task} className="bg-none rounded-lg text-lg px-2 py-1 text-gray-500 bg-white border-2" required />
                                        <textarea placeholder="Description" defaultValue={desciption} className="bg-none rounded-lg text-lg px-2 py-1 text-gray-500 bg-white border-2" />
                                        <input type="datetime-local" defaultValue={formatDate(time)} placeholder="Description" className="border-2 rounded-lg text-lg px-2 py-1 text-gray-500" required />

                                        <DialogFooter >
                                            <input type="button" value="Delete" className="bg-red-500 rounded-lg text-lg px-2 py-1 text-white cursor-pointer w-20" />
                                            <input type="submit" value="Edit" className="bg-green-700 rounded-lg text-lg px-2 py-1 text-white cursor-pointer w-20" />
                                        </DialogFooter>
                                    </form>
                                </DialogContent>
                            </Dialog>
                            <Drawer>
                                <DrawerTrigger onClick={(event) => {
                                    event.stopPropagation() // stopping event propagation to prevent accordion trigger
                                }} className="lg:hidden">
                                    <Pencil size={16} className="text-slate-500 cursor-pointer" />
                                </DrawerTrigger>
                                <DrawerContent className="bg-green-700 flex flex-col items-center border-none lg:hidden">
                                    <DrawerHeader>
                                        <DrawerTitle>
                                            <h2 className="text-white text-2xl mb-2">
                                                Edit Task
                                            </h2>
                                        </DrawerTitle>
                                    </DrawerHeader>
                                    <form className="flex flex-col gap-2 w-72">
                                        <input placeholder="Task" defaultValue={task} className="bg-none rounded-lg text-lg px-2 py-1 text-gray-500 bg-white border-2" required />
                                        <textarea placeholder="Description" defaultValue={desciption} className="bg-none rounded-lg text-lg px-2 py-1 text-gray-500 bg-white border-2" />
                                        <input type="datetime-local" defaultValue={formatDate(time)} placeholder="Description" className="border-2 rounded-lg text-lg px-2 py-1 text-gray-500 w-full" required />
                                        <DrawerFooter className="px-0">
                                            <input type="submit" value="Edit Task" className="bg-green-600 rounded-lg text-lg py-1 text-white cursor-pointer" required />
                                            <DrawerClose>
                                                <Button className="bg-green-700 w-full border-2 border-green-600">Cancel</Button>
                                            </DrawerClose>
                                        </DrawerFooter>
                                    </form>
                                </DrawerContent>
                            </Drawer>
                            {
                                (parseDate(time) < new Date()) && !Done && <div className="text-red-500 font-mono mt-1">due!!! </div>
                            }
                        </div>
                        <TooltipContent className="bg-slate-600">{task}</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <div className="text-xs text-slate-400 text-start">
                    {time}
                </div>
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild className="cursor-pointer">
                    <button type="button" className={`${Taskstatus === "Done" && "bg-green-500"} ${Taskstatus === "In Progress" && "border border-green-500 animate-pulse"} ${Taskstatus === "Todo" && "border border-green-500"} w-24 p-1 rounded-lg`}>
                        {Taskstatus}
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuCheckboxItem checked={Todo} onClick={(event) => {
                        onStatusChange(id, "Todo")
                        setTaskstatus("Todo")
                        event.stopPropagation() // stopping event propagation to prevent accordion trigger
                    }}>Todo</DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem checked={InProgress} onClick={(event) => {
                        onStatusChange(id, "In Progress")
                        setTaskstatus("In Progress")
                        event.stopPropagation()
                    }}>In Progress</DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem checked={Done} onClick={(event) => {
                        onStatusChange(id, "Done")
                        setTaskstatus("Done")
                        event.stopPropagation()
                    }}>Done</DropdownMenuCheckboxItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}

export default Tasks;
