import React, { RefObject, useState } from 'react'
import { Eye, EyeOff, Pencil } from "lucide-react";
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
    dialogRef: RefObject<HTMLButtonElement>
    drawerRef: RefObject<HTMLButtonElement>
}
function Profile({ dialogRef, drawerRef }: Props) {
    const [showpass, setshowpass] = useState(false)
    return (
        <>
            <Dialog>
                <DialogTrigger ref={dialogRef} onClick={(event) => {
                    event.stopPropagation() // stopping event propagation to prevent accordion trigger
                }} className="hidden">
                </DialogTrigger>
                <DialogContent onClick={(event) => {
                    event.stopPropagation()
                }} className="border-none rounded-lg">
                    <DialogHeader>
                        <DialogTitle className="text-green-700 text-xl mb-3">Edit Profile</DialogTitle>
                    </DialogHeader>

                    <form className="flex flex-col gap-2 w-full mb-2">
                    <input placeholder="Name" className="bg-none rounded-lg text-lg px-2 py-1 text-gray-500 bg-white border-2" required />
                        <input placeholder="Email" className="bg-none rounded-lg text-lg px-2 py-1 text-gray-500 bg-white border-2" type='email'/>
                        <div className='flex items-center rounded-lg focus-within:border-black bg-white pe-2 border-2'>
                            <input type={`${showpass?'text':'password'}`} placeholder="Password" className="border-none rounded-lg text-lg px-2 py-1 text-gray-500 w-full focus-within:border-none focus-within:outline-none" required />
                            <div onClick={()=>{setshowpass(!showpass)}} className='text-gray-500 cursor-pointer'>{showpass?<Eye />:<EyeOff />}</div>
                        </div>
                        <DialogFooter >
                            <input type="submit" value="Edit" className="bg-green-700 rounded-lg text-lg px-2 py-1 text-white cursor-pointer w-20" />
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
            <Drawer>
                <DrawerTrigger ref={drawerRef} onClick={(event) => {
                    event.stopPropagation() // stopping event propagation to prevent accordion trigger
                }} className="lg:hidden hidden">
                </DrawerTrigger>
                <DrawerContent className="bg-green-700 flex flex-col items-center border-none lg:hidden">
                    <DrawerHeader>
                        <DrawerTitle>
                            <h2 className="text-white text-2xl mb-2">
                                Edit Profile
                            </h2>
                        </DrawerTitle>
                    </DrawerHeader>
                    <form className="flex flex-col gap-2 w-72" onSubmit={(event)=>{
                        event.preventDefault()
                    }}>
                        <input placeholder="Name" className="bg-none rounded-lg text-lg px-2 py-1 text-gray-500 bg-white border-2" required />
                        <input placeholder="Email" className="bg-none rounded-lg text-lg px-2 py-1 text-gray-500 bg-white border-2" type='email'/>
                        <div className='flex items-center rounded-lg focus-within:border-black bg-white pe-2'>
                            <input type={`${showpass?'text':'password'}`} placeholder="Password" className="border-none rounded-lg text-lg px-2 py-1 text-gray-500 w-full focus-within:border-none focus-within:outline-none" required />
                            <div onClick={()=>{setshowpass(!showpass)}} className='text-gray-500 cursor-pointer'>{showpass?<Eye />:<EyeOff />}</div>
                        </div>
                        <DrawerFooter className="px-0">
                            <input type="button" value="Edit" className="bg-green-600 rounded-lg text-lg py-1 text-white cursor-pointer" required />
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

export default Profile