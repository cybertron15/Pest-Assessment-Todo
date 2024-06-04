import { ShieldAlert } from "lucide-react";
import { useRouteError } from "react-router-dom";
type RouterError = {
	statusText: string
	message: string
	status: number
}
export default function ErrorPage() {
	const error = useRouteError() as RouterError;
	return (
		<div id="error-page" className="flex flex-col items-center mt-40">
			<div className="text-6xl flex gap-4 text-red-500">
				Taskit <ShieldAlert size={60} />
			</div>
			<div className="mt-2">
				<h2 className="text-3xl">Ohh no!</h2>
			</div>
			<div className="text-center mt-1">
				<p>Sorry, an unexpected error has occurred.</p>
				<p>
					<i>{error.status} { error.statusText || error.message}</i>
				</p>
			</div>
		</div>
	);
}