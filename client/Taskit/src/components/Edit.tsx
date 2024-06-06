import React from 'react'
import { Pencil } from "lucide-react";
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
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import formatDate from '@/utils/dateFortmatUtil';
import { Button } from './ui/button';

type Props = {
    task: string;
    desciption: string;
    time: string;
}

function Edit({task,desciption,time}:Props) {
    return (
        <>
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
                        <textarea placeholder="Description" defaultValue={desciption} className="bg-none rounded-lg text-lg px-2 py-1 text-gray-500 bg-white border-2" required/>
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
                        <textarea placeholder="Description" defaultValue={desciption} className="bg-none rounded-lg text-lg px-2 py-1 text-gray-500 bg-white border-2" required/>
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
        </>
    )
}

export default Edit