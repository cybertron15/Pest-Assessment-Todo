import React, { FormEventHandler, RefObject, useEffect, useRef, useState } from 'react'
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
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import formatDate from '@/utils/dateFortmatUtil';
import { Button } from './ui/button';
import { Form, useNavigation, useSubmit } from 'react-router-dom';
import axiosInstance from '@/utils/axiosInstance';
import { toast } from 'sonner';
import { ScaleLoader } from 'react-spinners';


type Props = {
    dialogRef: RefObject<HTMLButtonElement>
    drawerRef: RefObject<HTMLButtonElement>
}
function Profile({ dialogRef, drawerRef }: Props) {
    const [showpass, setshowpass] = useState(false)
    const [userDetail, setuserDetail] = useState({ full_name: null, email: null, username:null })
    const [isLoading, setisLoading] = useState(true)
    const initial =  {"new_full_name": "", "new_email": "", "new_password": "", "current_password": "","new_username":"" }
    const [formdata, setformdata] = useState(initial)
    const alertRef = useRef<HTMLButtonElement>(null)
    const navigation = useNavigation()
    const submit = useSubmit();

    // clear state values before submitting so only one value is submitted at a time
    const clearExcept = (key: keyof typeof initial) => {
        setformdata(prevState => {
          return Object.keys(prevState).reduce((acc, curr) => {
            acc[curr as keyof typeof initial] = curr === key ? prevState[curr as keyof typeof initial] : "";
            return acc;
          }, {} as typeof initial);
        });
      };
      
    const handleEdit = (event: React.MouseEvent<HTMLInputElement>)=>{
        alertRef.current?.click()
        const target = event.currentTarget.getAttribute('data-target') as keyof typeof initial;
        clearExcept(target);
    }
    const handleSubmit : FormEventHandler<HTMLFormElement> = (event:  React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault(); // Prevent the default form submission
    
        // Create a new FormData object
        const formData = new FormData();
        formData.append('formType', 'profile');
        formData.append('new_full_name', formdata.new_full_name);
        formData.append('new_username', formdata.new_username);
        formData.append('new_email', formdata.new_email);
        formData.append('new_password', formdata.new_password);
        formData.append('current_password', formdata.current_password);
    
        // Submit the form data using the useSubmit hook
        submit(formData, { method: 'post' });
        setformdata(initial)
      };
      
    const handleFormDataChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        const { name, value } = event.target;
        setformdata({ ...formdata, [name]: value })
    }

    useEffect(() => {
        async function getUserDetails() {
            setisLoading(true)
            try {
                const res = await axiosInstance.get("/current-user/");
                setuserDetail(res.data)
                setisLoading(false)
            } catch (error) {
                toast('Failed to get user details')
                console.error('Error getting user details', error);
                return 'fail'
            }
        }
        getUserDetails()
    }, [navigation.state])

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
                    {
                        (isLoading || navigation.state !== "idle") &&
                        <div className='absolute top-0 left-0 rounded-lg h-full w-full bg-black opacity-70 flex items-center justify-center'>
                            <ScaleLoader color="white" />
                        </div>
                    }
                    <DialogHeader>
                        <DialogTitle className="text-green-700 text-xl mb-3">Edit Profile</DialogTitle>
                    </DialogHeader>

                    <div className="flex flex-col gap-2 w-full mb-2" >
                        <div className='flex gap-2'>
                            <input placeholder={userDetail.full_name ? userDetail.full_name : "Full Name"} onChange={handleFormDataChange} value={formdata.new_full_name} type='text' name='new_full_name' className="bg-none rounded-lg text-lg px-2 py-1 text-gray-500 bg-white border-2 w-full" />
                            <input type="button" data-target="new_full_name" onClick={handleEdit} disabled={formdata.new_full_name.length ===0} value="Edit" className={`${formdata.new_full_name.length ===0 ? "bg-green-900 rounded-lg": "bg-green-700 rounded-lg"} rounded-lg text-lg px-2 py-1 text-white cursor-pointer w-20`} />
                        </div>
                        <div className='flex gap-2'>
                            <input placeholder={userDetail.username ? userDetail.username : "Username"} onChange={handleFormDataChange} type='text' value={formdata.new_username} name='new_username' className="bg-none rounded-lg text-lg px-2 py-1 text-gray-500 bg-white border-2 w-full" />
                            <input type="button" data-target="new_username" onClick={handleEdit} disabled={formdata.new_username.length ===0} value="Edit" className={`${formdata.new_username.length ===0 ? "bg-green-900 rounded-lg": "bg-green-700 rounded-lg"} rounded-lg text-lg px-2 py-1 text-white cursor-pointer w-20`} />
                        </div>
                        <div className='flex gap-2'>
                            <input placeholder={userDetail.email ? userDetail.email : "Email"} onChange={handleFormDataChange} type='email' name='new_email' value={formdata.new_email} className="bg-none rounded-lg text-lg px-2 py-1 text-gray-500 bg-white border-2 w-full" />
                            <input type="button" onClick={handleEdit}  disabled={formdata.new_email.length ===0} data-target="new_email" value="Edit" className={`${formdata.new_email.length ===0 ? "bg-green-900 rounded-lg": "bg-green-700 rounded-lg"} rounded-lg text-lg px-2 py-1 text-white cursor-pointer w-20`} />
                        </div>
                        <div className='flex gap-2'>
                            <div className='flex items-center rounded-lg focus-within:border-black bg-white pe-2 border-2 w-full'>
                                <input type={`${showpass ? 'text' : 'password'}`} onChange={handleFormDataChange} name='new_password'  value={formdata.new_password} placeholder="**********" className="border-none rounded-lg text-lg px-2 py-1 text-gray-500 w-full focus-within:border-none focus-within:outline-none" />
                                <div onClick={() => { setshowpass(!showpass) }} className='text-gray-500 cursor-pointer'>{showpass ? <Eye /> : <EyeOff />}</div>
                            </div>
                            <input type="button" onClick={handleEdit} value="Edit" data-target="new_password" className={`${formdata.new_password.length ===0 ? "bg-green-900 rounded-lg": "bg-green-700 rounded-lg"} rounded-lg text-lg px-2 py-1 text-white cursor-pointer w-20`} />
                        </div>
                    </div>

            </DialogContent>
        </Dialog >
            <Drawer>
                <DrawerTrigger ref={drawerRef} onClick={(event) => {
                    event.stopPropagation() // stopping event propagation to prevent accordion trigger
                }} className="lg:hidden hidden">
                </DrawerTrigger>
                <DrawerContent className="bg-green-700 flex flex-col items-center border-none lg:hidden">
                {
                        (isLoading || navigation.state !== "idle") &&
                        <div className='absolute top-0 left-0 rounded-lg h-full w-full bg-black opacity-70 flex items-center justify-center'>
                            <ScaleLoader color="white" />
                        </div>
                    }
                    <DrawerHeader>
                        <DrawerTitle>
                            <h2 className="text-white text-2xl mb-2">
                                Edit Profile
                            </h2>
                        </DrawerTitle>
                    </DrawerHeader>
                    <div className="flex flex-col gap-2 w-72">
                        <div className='flex gap-2'>
                            <input placeholder={userDetail.full_name ? userDetail.full_name : "Full Name"} value={formdata.new_full_name} onChange={handleFormDataChange} type='text' name='new_full_name' className="bg-none rounded-lg text-lg px-2 py-1 text-gray-500 bg-white border-2 w-full" />
                            <input type="button" onClick={handleEdit} disabled={formdata.new_full_name.length ===0} value="Edit" data-target='new_full_name' className={`${formdata.new_full_name.length ===0 ? "bg-green-900 rounded-lg": "bg-green-600 rounded-lg"} rounded-lg text-lg px-2 py-1 text-white cursor-pointer w-20`} />
                        </div>
                        <div className='flex gap-2'>
                            <input placeholder={userDetail.username ? userDetail.username : "Username"} value={formdata.new_username} onChange={handleFormDataChange} type='text' name='new_username' className="bg-none rounded-lg text-lg px-2 py-1 text-gray-500 bg-white border-2 w-full" />
                            <input type="button" onClick={handleEdit} disabled={formdata.new_username.length ===0} value="Edit" data-target='new_username' className={`${formdata.new_username.length ===0 ? "bg-green-900 rounded-lg": "bg-green-600 rounded-lg"} rounded-lg text-lg px-2 py-1 text-white cursor-pointer w-20`} />
                        </div>
                        <div className='flex gap-2'>
                            <input placeholder={userDetail.email ? userDetail.email : "Email"} value={formdata.new_email} onChange={handleFormDataChange} type='email' name='new_email' className="bg-none rounded-lg text-lg px-2 py-1 text-gray-500 bg-white border-2 w-full" />
                            <input type="button" onClick={handleEdit}  disabled={formdata.new_email.length ===0} value="Edit" data-target='new_email' className={`${formdata.new_email.length ===0 ? "bg-green-900 rounded-lg": "bg-green-600 rounded-lg"} rounded-lg text-lg px-2 py-1 text-white cursor-pointer w-20`} />
                        </div>
                        <div className='flex gap-2'>
                            <div className='flex items-center rounded-lg focus-within:border-black bg-white pe-2 border-2 w-full'>
                                <input type={`${showpass ? 'text' : 'password'}`} onChange={handleFormDataChange} name='new_password' value={formdata.new_password} placeholder="**********" className="border-none rounded-lg text-lg px-2 py-1 text-gray-500 w-full focus-within:border-none focus-within:outline-none" />
                                <div onClick={() => { setshowpass(!showpass) }} className='text-gray-500 cursor-pointer'>{showpass ? <Eye /> : <EyeOff />}</div>
                            </div>
                            <input type="button" onClick={handleEdit} value="Edit" data-target='new_password' className={`${formdata.new_password.length ===0 ? "bg-green-900 rounded-lg": "bg-green-600 rounded-lg"} rounded-lg text-lg px-2 py-1 text-white cursor-pointer w-20`} />
                        </div>
                    </div>
                        <DrawerFooter className="px-0">
                            <DrawerClose>
                                <Button className="bg-green-700 w-full border-2 border-green-600">Cancel</Button>
                            </DrawerClose>
                        </DrawerFooter>
                </DrawerContent>
            </Drawer>
            <AlertDialog>
                        <AlertDialogTrigger className='hidden' ref={alertRef}></AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Please Verify your passoward?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be done. Till you verify your password.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <div className='flex items-center rounded-lg focus-within:border-black bg-white pe-2 border-2 w-full'>
                                <input type={`${showpass ? 'text' : 'password'}`} onChange={handleFormDataChange} name='current_password' placeholder="Password" className="border-none rounded-lg text-lg px-2 py-1 text-gray-500 w-full focus-within:border-none focus-within:outline-none" required />
                                <div onClick={() => { setshowpass(!showpass) }} className='text-gray-500 cursor-pointer'>{showpass ? <Eye /> : <EyeOff />}</div>
                            </div>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction className='bg-red-500'>
                                    <Form method='post' onSubmit={handleSubmit}>
                                    <button type='submit'>
                                        Verify
                                    </button>
                                    </Form>
                                </AlertDialogAction>
                            </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
        </>
    )
}

export default Profile