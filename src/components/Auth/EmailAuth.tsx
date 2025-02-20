// components/Auth/EmailAuth.tsx
import { FC, useState } from "react";

interface EmailAuthProps {
	onEmailSubmit: (data: { name: string; email: string }) => void;
}

const EmailAuth: FC<EmailAuthProps> = ({ onEmailSubmit }) => {
	const [showForm, setShowForm] = useState(false);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!name.trim() || !email.trim()) return;
		onEmailSubmit({ name, email });
	};

	return (
		<div className="space-y-4">
			{!showForm ? (
				<button
					onClick={() => setShowForm(true)}
					className="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 rounded-xl p-3.5 hover:bg-gray-50 transition-all"
				>
					<svg
						className="w-5 h-5 text-gray-600"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
						/>
					</svg>
					<span className="text-gray-700 font-medium">
						Continuar con Correo
					</span>
				</button>
			) : (
				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Tu Nombre
						</label>
						<input
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
							className="w-full px-4 text-black py-2.5 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
							placeholder="Ej: Juan Pérez"
							required
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Correo Electrónico
						</label>
						<input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="w-full px-4 py-2.5 text-black border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
							placeholder="tucorreo@ejemplo.com"
							required
						/>
					</div>
					<button
						type="submit"
						className="w-full bg-pink-600 text-white py-2.5 rounded-lg hover:bg-pink-700 transition-colors"
					>
						Continuar
					</button>
				</form>
			)}
		</div>
	);
};

export default EmailAuth;
