import React, { useEffect, useState } from "react";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "./ui/tooltip";


import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuCheckboxItem
} from "@/components/ui/dropdown-menu"
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";

import parseDate from "@/utils/dateParseUtil";
import Edit from "./Edit";

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
                           <Edit task={task} desciption={desciption} time={time} />
                            {
                                (parseDate(time) < new Date()) && !Done && <div className="text-red-500 font-mono mt-1">due!!!</div>
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
