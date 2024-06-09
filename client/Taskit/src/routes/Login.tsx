import { Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { Form, useActionData, useNavigation } from "react-router-dom";
import { redirect } from 'react-router-dom';
import { PropagateLoader } from 'react-spinners'
import { toast } from "sonner"
import { Toaster } from "@/components/ui/sonner";
import axiosAuth from "@/utils/axiosAuth";

export async function action({ params, request }: { params: any, request: Request }) {
	const formData = await request.formData();
	const response = await axiosAuth(formData)
	if (response?.success === true) {
		return redirect('/tasks');
	}
	return response

}
type ActionData = {
	errorMessage: string
}
function Login() {
	const [showpass, setshowpass] = useState(false);
	const [loginSignupToggle, setloginSignupToggle] = useState(false);
	const navigation = useNavigation()
	const actionData = useActionData() as ActionData

	useEffect(() => {
		// Display the error message in a toast if it exists
		if (actionData?.errorMessage) {
			toast(actionData.errorMessage);
		}
	}, [actionData]);

	// State for login form
	const [loginForm, setLoginForm] = useState({
		loginEmail: "palashdhavle15@gmail.com",
		loginPassword: "tron@123",
	});

	// State for signup form
	const [signupForm, setSignupForm] = useState({
		signupFullName: "Palash Dhavle",
		signupUsername: "palashdhavle15",
		signupEmail: "palashdhavle15@gmail.com",
		signupPassword: "123",
		signupRePassword: "1233",
	});

	const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setLoginForm({
			...loginForm,
			[e.target.name]: e.target.value,
		});
	};

	const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSignupForm({
			...signupForm,
			[e.target.name]: e.target.value,
		});
	};

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
					{loginSignupToggle ? (
						<Form className="flex flex-col gap-3 w-72" method="POST">
							<input type="hidden" name="formType" value="login" />
							<input
								type="email"
								name="loginEmail"
								placeholder="Email"
								className="bg-none rounded-lg text-lg px-2 py-1 text-gray-400"
								value={loginForm.loginEmail}
								onChange={handleLoginChange}
								required
							/>
							<div className="flex items-center rounded-lg focus-within:border-black bg-white pe-2 border-2">
								<input
									type={showpass ? "text" : "password"}
									name="loginPassword"
									placeholder="Password"
									className="border-none rounded-lg text-lg px-2 py-1 text-gray-500 w-full focus-within:border-none focus-within:outline-none"
									value={loginForm.loginPassword}
									onChange={handleLoginChange}
									required
								/>
								<div
									onClick={() => {
										setshowpass(!showpass);
									}}
									className="text-gray-500 cursor-pointer"
								>
									{showpass ? <Eye /> : <EyeOff />}
								</div>
							</div>
							<button type="submit" value="Login" disabled={navigation.state === "idle" ? false : true} className="bg-green-600 rounded-lg text-lg px-2 py-1 text-white cursor-pointer" >
								{navigation.state === "idle"
									? "Login" :
									<div className="bg-green-600 rounded cursor-pointer flex items-center justify-center h-[1.8rem]">
										<PropagateLoader color="white" className="p-0 m-0" size={5} />
									</div>
								}
							</button>
							<input
								type="button"
								onClick={() => {
									setloginSignupToggle(!loginSignupToggle);
								}}
								value="Signup"
								disabled={navigation.state === "idle" ? false : true}
								className="border-green-600 border-2 rounded-lg text-lg px-2 py-1 text-white cursor-pointer"
							/>
						</Form>
					) : (
						<Form className="flex flex-col gap-3 w-72" method="POST">
							<input type="hidden" name="formType" value="signup" />
							<input
								type="text"
								name="signupFullName"
								placeholder="Full Name"
								className="bg-none rounded-lg text-lg px-2 py-1 text-gray-400"
								value={signupForm.signupFullName}
								onChange={handleSignupChange}
								required
							/>
							<input
								type="text"
								name="signupUsername"
								placeholder="Username"
								className="bg-none rounded-lg text-lg px-2 py-1 text-gray-400"
								value={signupForm.signupUsername}
								onChange={handleSignupChange}
								required
							/>
							<input
								type="email"
								name="signupEmail"
								placeholder="Email"
								className="bg-none rounded-lg text-lg px-2 py-1 text-gray-400"
								value={signupForm.signupEmail}
								onChange={handleSignupChange}
								required
							/>
							<div className="flex items-center rounded-lg focus-within:border-black bg-white pe-2 border-2">
								<input
									type={showpass ? "text" : "password"}
									name="signupPassword"
									placeholder="Password"
									className="border-none rounded-lg text-lg px-2 py-1 text-gray-500 w-full focus-within:border-none focus-within:outline-none"
									value={signupForm.signupPassword}
									onChange={handleSignupChange}
									required
								/>
								<div
									onClick={() => {
										setshowpass(!showpass);
									}}
									className="text-gray-500 cursor-pointer"
								>
									{showpass ? <Eye /> : <EyeOff />}
								</div>
							</div>
							<div className="flex items-center rounded-lg focus-within:border-black bg-white pe-2 border-2">
								<input
									type={showpass ? "text" : "password"}
									name="signupRePassword"
									placeholder="re-Password"
									className="border-none rounded-lg text-lg px-2 py-1 text-gray-500 w-full focus-within:border-none focus-within:outline-none"
									value={signupForm.signupRePassword}
									onChange={handleSignupChange}
									required
								/>
								<div
									onClick={() => {
										setshowpass(!showpass);
									}}
									className="text-gray-500 cursor-pointer"
								>
									{showpass ? <Eye /> : <EyeOff />}
								</div>
							</div>
							<button type="submit" value="Signup" disabled={navigation.state === "idle" ? false : true} className="bg-green-600 rounded-lg text-lg px-2 py-1 text-white cursor-pointer" >
								{navigation.state === "idle"
									? "Signup" :
									<div className="bg-green-600 rounded cursor-pointer flex items-center justify-center h-[1.8rem]">
										<PropagateLoader color="white" className="p-0 m-0" size={5} />
									</div>
								}
							</button>
							<input
								type="button"
								onClick={() => {
									setloginSignupToggle(!loginSignupToggle);
								}}
								value="Login"
								className="border-green-600 border-2 rounded-lg text-lg px-2 py-1 text-white cursor-pointer"
							/>
						</Form>
					)}
				</div>
				<div className="flex justify-between items-center py-2 px-4">
					<div className="text-white text-4xl">Taskit</div>
				</div>
			</div>
			<Toaster />
		</div>

	);
}

export default Login;
