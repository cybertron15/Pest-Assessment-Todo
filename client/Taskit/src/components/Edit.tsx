import React, { useRef } from 'react'
import { Pencil, Trash } from "lucide-react";
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
import { ScaleLoader } from "react-spinners"

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
import { Form, useNavigate, useNavigation } from 'react-router-dom';

type Props = {
    task: string;
    desciption: string;
    time: string;
    id: string
}

function Edit({ task, desciption, time, id }: Props) {
    const navigation = useNavigation()
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
                    {
                        navigation.state !== "idle" &&
                        <div className='absolute top-0 left-0 rounded-lg h-full w-full bg-black opacity-70 flex items-center justify-center'>
                            <ScaleLoader color="white" />
                        </div>
                    }
                    <DialogHeader className='flex-row'>
                        <DialogTitle className="text-green-700 text-xl mb-3">Edit Task</DialogTitle>

                    </DialogHeader>

                    <Form className="flex flex-col gap-2 w-full mb-2" method="post" onClick={(event) => { event.stopPropagation() }}>
                        <input type="hidden" name="formType" value="edit" />
                        <input type="hidden" name="id" value={id} />
                        <input placeholder="Task" name="task" defaultValue={task} className="bg-none rounded-lg text-lg px-2 py-1 text-gray-500 bg-white border-2" required />
                        <textarea placeholder="Description" name="description" defaultValue={desciption} className="bg-none rounded-lg text-lg px-2 py-1 text-gray-500 bg-white border-2" required />
                        <input type="datetime-local" name="due" defaultValue={formatDate(time)} placeholder="Description" className="border-2 rounded-lg text-lg px-2 py-1 text-gray-500" required />


                        <input type="submit" disabled={navigation.state !== "idle"} value="Edit" className="bg-green-700 rounded-lg text-lg px-2 py-1 mt-2 text-white cursor-pointer w-full" />
                    </Form>
                    <Form method="post" onClick={(event) => { event.stopPropagation() }}>
                        <input type="hidden" name="formType" value="delete" />
                        <input type="hidden" name="id" value={id} />
                        <input type="submit" disabled={navigation.state !== "idle"} value="delete" className="bg-red-500 rounded-lg text-lg px-2 py-1 text-white cursor-pointer w-full" />
                    </Form>
                </DialogContent>
            </Dialog>
            <Drawer>
                <DrawerTrigger onClick={(event) => {
                    event.stopPropagation() // stopping event propagation to prevent accordion trigger
                }} className="lg:hidden">
                    <Pencil size={16} className="text-slate-500 cursor-pointer" />
                </DrawerTrigger>
                <DrawerContent className="bg-green-700 flex flex-col items-center border-none lg:hidden">
                    {
                        navigation.state !== "idle" &&
                        <div className='absolute top-0 left-0 rounded-lg h-full w-full bg-black opacity-70 flex items-center justify-center'>
                            <ScaleLoader color="white" />
                        </div>
                    }
                    <Form className='absolute top-2 right-2' method='post' onClick={(event) => { event.stopPropagation() }}>
                        <input type="hidden" name="formType" value="delete" />
                        <input type="hidden" name="id" value={id} />
                        <button type='submit' disabled={navigation.state !== "idle"}>
                            <Trash className='text-red-500' />
                        </button>
                    </Form>
                    <DrawerHeader>
                        <DrawerTitle >
                            <h2 className="text-white text-2xl mb-2">
                                Edit Task
                            </h2>
                        </DrawerTitle>
                    </DrawerHeader>
                    <Form className="flex flex-col gap-2 w-72" method="post" onClick={(event) => { event.stopPropagation() }}>
                        <input type="hidden" name="formType" value="edit" />
                        <input type="hidden" name="id" value={id} />
                        <input placeholder="Task" name="task" defaultValue={task} className="bg-none rounded-lg text-lg px-2 py-1 text-gray-500 bg-white border-2" required />
                        <textarea placeholder="Description" name="description" defaultValue={desciption} className="bg-none rounded-lg text-lg px-2 py-1 text-gray-500 bg-white border-2" required />
                        <input type="datetime-local" name="due" defaultValue={formatDate(time)} placeholder="Description" className="border-2 rounded-lg text-lg px-2 py-1 text-gray-500 w-full" required />
                        <DrawerFooter className="px-0">
                            <input type="submit" disabled={navigation.state !== "idle"} value="Edit Task" className="bg-green-600 rounded-lg text-lg py-1 text-white cursor-pointer" required />
                            <DrawerClose>
                                <Button className="bg-green-700 w-full border-2 border-green-600">Cancel</Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </Form>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default Edit