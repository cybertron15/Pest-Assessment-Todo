
import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"

function Login() {
	const [showpass, setshowpass] = useState(false)
	const [loginSignupToggle, setloginSignupToggle] = useState(false)

	return (
		<div className="flex h-svh items-center justify-center">
			<div className="relative flex flex-col bg-green-700 md:rounded-lg sm:rounded-lg sm:w-[90%] h-[100%] w-[100%] sm:h-[95%] lg:rounded-lg md:w-[80%] md:h-[90%] lg:w-[50%] lg:h-[90%]">
				<div className="absolute h-full w-full flex flex-col items-center justify-center">
					<div className="flex flex-col justify-center items-center gap-3 mb-8">
						<div className="text-white text-7xl text-center">
							{loginSignupToggle ? "Login" : "Signup"}
						</div>
						<div className="text-white text-xl text-center">
							Decide. Plan. Taskit.
						</div>
					</div>
					{
						loginSignupToggle ?
							<form className="flex flex-col gap-3 w-72">
								<input type="email" placeholder="Email" className="bg-none rounded-lg text-lg px-2 py-1 text-gray-400" required />
								<div className='flex items-center rounded-lg focus-within:border-black bg-white pe-2 border-2'>
									<input type={`${showpass ? 'text' : 'password'}`} placeholder="Password" className="border-none rounded-lg text-lg px-2 py-1 text-gray-500 w-full focus-within:border-none focus-within:outline-none" required />
									<div onClick={() => { setshowpass(!showpass) }} className='text-gray-500 cursor-pointer'>{showpass ? <Eye /> : <EyeOff />}</div>
								</div>
								<input type="submit" value="Login" className="bg-green-600 rounded-lg text-lg px-2 py-1 text-white cursor-pointer" />
								<input type="button" onClick={()=>{setloginSignupToggle(!loginSignupToggle)}} value="Signup" className="border-green-600 border-2 rounded-lg text-lg px-2 py-1 text-white cursor-pointer" />
							</form>
							:
							<form className="flex flex-col gap-3 w-72">
								<input type="text" placeholder="Full Name" className="bg-none rounded-lg text-lg px-2 py-1 text-gray-400" required />
								<input type="text" placeholder="Username" className="bg-none rounded-lg text-lg px-2 py-1 text-gray-400" required />
								<input type="email" placeholder="Email" className="bg-none rounded-lg text-lg px-2 py-1 text-gray-400" required />
								<div className='flex items-center rounded-lg focus-within:border-black bg-white pe-2 border-2'>
									<input type={`${showpass ? 'text' : 'password'}`} placeholder="Password" className="border-none rounded-lg text-lg px-2 py-1 text-gray-500 w-full focus-within:border-none focus-within:outline-none" required />
									<div onClick={() => { setshowpass(!showpass) }} className='text-gray-500 cursor-pointer'>{showpass ? <Eye /> : <EyeOff />}</div>
								</div>
								<div className='flex items-center rounded-lg focus-within:border-black bg-white pe-2 border-2'>
									<input type={`${showpass ? 'text' : 'password'}`} placeholder="re-Password" className="border-none rounded-lg text-lg px-2 py-1 text-gray-500 w-full focus-within:border-none focus-within:outline-none" required />
									<div onClick={() => { setshowpass(!showpass) }} className='text-gray-500 cursor-pointer'>{showpass ? <Eye /> : <EyeOff />}</div>
								</div>
								<input type="submit" value="Signup" className="bg-green-600 rounded-lg text-lg px-2 py-1 text-white cursor-pointer" />
								<input type="button" onClick={()=>{setloginSignupToggle(!loginSignupToggle)}} value="Login" className="border-green-600 border-2 rounded-lg text-lg px-2 py-1 text-white cursor-pointer" />
							</form>
					}

				</div>
				<div className="flex justify-between items-center py-2 px-4">
					<div className="text-white text-4xl">
						Taskit
					</div>
				</div>
			</div>
		</div>
	)
}

export default Login