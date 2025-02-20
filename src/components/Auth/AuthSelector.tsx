// components/Auth/AuthSelector.tsx
import { FC } from "react";
import GoogleAuth from "./GoogleAuth";
import EmailAuth from "./EmailAuth";

const AuthSelector: FC<{
	onGoogleSuccess: (user: any) => void;
	onEmailSuccess: (data: { name: string; email: string }) => void;
}> = ({ onGoogleSuccess, onEmailSuccess }) => {
	return (
		<div className="space-y-4">
			<GoogleAuth onAuthSuccess={onGoogleSuccess} />
			<div className="flex items-center gap-4">
				<div className="flex-1 h-px bg-gray-200"></div>
				<span className="text-gray-500 text-sm">o</span>
				<div className="flex-1 h-px bg-gray-200"></div>
			</div>
			<EmailAuth onEmailSubmit={onEmailSuccess} />
		</div>
	);
};

export default AuthSelector;
