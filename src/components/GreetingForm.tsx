// components/GreetingForm.tsx
import { FC, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../services/firebase";

interface GreetingFormProps {
	user: { name: string; email: string; photo?: string };
	authMethod: "google" | "email";
	onBack: () => void; // Nueva prop para manejar el retroceso
	onSuccess: () => void; // Nueva prop para manejar el éxito
}

const GreetingForm: FC<GreetingFormProps> = ({ user, authMethod, onBack }) => {
	const [message, setMessage] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [showSuccess, setShowSuccess] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);

		try {
			if (!user.name || !user.email) {
				throw new Error("No se encontró información del usuario");
			}

			await addDoc(collection(db, "greetings"), {
				message,
				from: user.name,
				to: "Fer",
				email: user.email,
				date: new Date(),
				photo:
					user.photo ||
					"https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png",
				status: "pending",
			});

			setMessage("");
			setShowSuccess(true);
			setTimeout(() => setShowSuccess(false), 3000);
		} catch (error) {
			console.error("Error al enviar saludo:", error);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="bg-white rounded-xl shadow-sm p-6">
			<div className="flex items-start gap-4 mb-6">
				<div className="flex-1">
					<div className="flex justify-between items-start">
						<div>
							<p className="font-medium text-gray-900 flex items-center gap-2">
								De: {user.name}
								{authMethod === "google" && (
									<span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
										<svg
											className="w-4 h-4 inline-block mr-1"
											viewBox="0 0 24 24"
										>
											<path
												fill="#4285F4"
												d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
											/>
											<path
												fill="#34A853"
												d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
											/>
											<path
												fill="#FBBC05"
												d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
											/>
											<path
												fill="#EA4335"
												d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
											/>
										</svg>
										Google
									</span>
								)}
							</p>
							<p className="text-sm text-gray-500 break-all">{user.email}</p>
						</div>
						<button
							onClick={onBack}
							className="text-pink-600 hover:text-pink-700 text-sm flex items-center gap-1"
							type="button"
						>
							<svg
								className="w-4 h-4"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M10 19l-7-7m0 0l7-7m-7 7h18"
								/>
							</svg>
							Cambiar cuenta
						</button>
					</div>
				</div>
			</div>

			<form onSubmit={handleSubmit} className="space-y-4">
				<textarea
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					placeholder="Escribe tu mensaje especial aquí..."
					className="w-full px-4 text-black py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 h-32"
					required
				/>

				<button
					type="submit"
					disabled={isSubmitting}
					className="w-full bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 disabled:bg-pink-400 transition-colors flex items-center justify-center"
				>
					{isSubmitting ? (
						<>
							<svg
								className="animate-spin h-5 w-5 mr-3 text-white"
								viewBox="0 0 24 24"
							>
								<circle
									className="opacity-25"
									cx="12"
									cy="12"
									r="10"
									stroke="currentColor"
									strokeWidth="4"
									fill="none"
								/>
								<path
									className="opacity-75"
									fill="currentColor"
									d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
								/>
							</svg>
							Enviando...
						</>
					) : (
						"Enviar Saludo"
					)}
				</button>

				{showSuccess && (
					<div className="mt-4 p-3 bg-green-100 text-green-700 rounded-lg">
						¡Saludo enviado exitosamente! 🎉
					</div>
				)}
			</form>
		</div>
	);
};

export default GreetingForm;
