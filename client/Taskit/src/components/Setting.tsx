import { Power, Settings, User } from 'lucide-react'
import { useRef } from 'react'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
	DropdownMenuShortcut,
	DropdownMenuItem
} from "@/components/ui/dropdown-menu"
import Logout from './Logout';
import Profile from './Profile';


function Setting() {
	const logoutTriggerRef = useRef<HTMLButtonElement>(null);
	const profileDialogrRef = useRef<HTMLButtonElement>(null);
	const profileDrawerRef = useRef<HTMLButtonElement>(null);
	const windowWidth = window.innerWidth
	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild className="cursor-pointer">
					<Settings size={30} className="cursor-pointer lg text-gray-400 lg:text-green-400 hover:rotate-180 transition duration-100" />
				</DropdownMenuTrigger>
				<DropdownMenuContent className="w-40">
					<DropdownMenuItem onClick={() => {
						
						
						if (profileDialogrRef.current &&  windowWidth >= 1024) {
							profileDialogrRef.current.click();
						}
						if (profileDrawerRef.current &&  windowWidth <= 1024) {
							profileDrawerRef.current.click();
						}
					}
					}>Profile
						<DropdownMenuShortcut><User size={20} className='' /></DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem className='group' onClick={() => {
						if (logoutTriggerRef.current) {
							logoutTriggerRef.current.click();
						}
					}
					}>
						Logout
						<DropdownMenuShortcut><Power size={20} className='group-hover:text-red-700' /></DropdownMenuShortcut>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu >

			{/* logout trigger */}
			<Logout triggerRef={logoutTriggerRef}/>
			<Profile dialogRef={profileDialogrRef} drawerRef={profileDrawerRef}/>
			
		</>
	)
}

export default Setting