import React, { RefObject } from 'react'

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
import { Form, redirect } from 'react-router-dom'
import { removeTokens } from '@/utils/tokenUtils'


type Props = {
    triggerRef: RefObject<HTMLButtonElement>
}

function Logout({ triggerRef }: Props) {
    return (
        < AlertDialog >
            <AlertDialogTrigger ref={triggerRef} className='hidden'></AlertDialogTrigger>
            <AlertDialogContent className='rounded-lg'>

                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
                    <AlertDialogDescription>
                        You would be logged out of this session and would not be able to access your tasks without signing in again.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>

                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <Form className='' method='POST'>
                        <input type="hidden" name="formType" value="logout" />
                        <AlertDialogAction type='submit' className='bg-red-500 text-white w-full md:w-fit'>Logout</AlertDialogAction>
                    </Form>
                </AlertDialogFooter>

            </AlertDialogContent>
        </AlertDialog >
    )
}

export default Logout