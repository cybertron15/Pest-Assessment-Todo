import axios from 'axios';

export default async function axiosAuth(formData: FormData){
	const formType = formData.get("formType");
    try {
		if (formType === "login") {
			const email = formData.get("loginEmail");
			const password = formData.get("loginPassword");
			// Handle login form submission
			const response = await axios.post('http://localhost:8000/token/', { email, password });
			localStorage.setItem('accessToken', response.data.access);
			localStorage.setItem('refreshToken', response.data.refresh);
			return {
                success:true
            }
		} else if (formType === "signup") {
			const full_name = formData.get("signupFullName");
			const username = formData.get("signupUsername");
			const email = formData.get("signupEmail");
			const password = formData.get("signupPassword");
			const re_password = formData.get("signupRePassword");
			// Handle signup form submission
			await axios.post('http://localhost:8000/signup/', { full_name, username, email, password, re_password });
			// After successful signup, log in to get tokens
			const response = await axios.post('http://localhost:8000/token/', { email, password });
			localStorage.setItem('accessToken', response.data.access);
			localStorage.setItem('refreshToken', response.data.refresh);
			return {
                success:true
            }
		}
	} catch (error) {
		console.error("Error during form submission:", error);
		if (axios.isAxiosError(error) && error.response) {
			const data = error.response.data
			const status = error.response.status
			
			
			if (status === 401) {
				return {
                    success:false,
					errorMessage: error.response.data.detail || 'An error occurred during the submission.',
					status: status
				};
			}
			if (status === 400) {
				if (data.email) {
					return {
                        success:false,
						errorMessage: error.response.data.email || 'An Account with this email already exist',
						status: status
					}
				}
				if (data.username) {
					return {
                        success:false,
						errorMessage: error.response.data.username || 'An Account with this username already exist',
						status: status
					}
				}
				if (data.non_field_errors) {
					let errorArray = data.non_field_errors
					let errors = ""
					for (let i = 0; i < errorArray.length; i++) {
						errors += errorArray[i] + '\n';
					}
					return {
                        success:false,
						errorMessage: errors || 'please input a stronger password',
						status: status
					}
				}
			}
			return {
                success:false,
				errorMessage: 'An unexpected error occurred.'
			};
		}

		return { errorMessage: error.message || "Unknown form submission" };
	}
}