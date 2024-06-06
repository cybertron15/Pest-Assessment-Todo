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


function Setting() {
	const triggerRef = useRef<HTMLButtonElement>(null);
	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild className="cursor-pointer">
					<Settings className="cursor-pointer text-green-400 hover:rotate-180 transition duration-100" />
				</DropdownMenuTrigger>
				<DropdownMenuContent className="w-40">
					<DropdownMenuItem >Profile
						<DropdownMenuShortcut><User size={20} className='' /></DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem className='group' onClick={() => {
						if (triggerRef.current) {
							triggerRef.current.click();
						}
					}
					}>
						Logout
						<DropdownMenuShortcut><Power size={20} className='group-hover:text-red-700' /></DropdownMenuShortcut>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu >

			{/* logout trigger */}
			<Logout triggerRef={triggerRef}/>
			
			
		</>
	)
}

export default Setting