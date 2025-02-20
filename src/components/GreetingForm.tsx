// components/GreetingForm.tsx
import { FC, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../services/firebase";

interface GreetingFormProps {
	user: { name: string; email: string; photo?: string };
	authMethod: "google" | "email";
}

const GreetingForm: FC<GreetingFormProps> = ({ user, authMethod }) => {
	const [message, setMessage] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [showSuccess, setShowSuccess] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);

		try {
			console.log("Enviando saludo...");
			console.log("user", user);

			await addDoc(collection(db, "greetings"), {
				message,
				from: user.name,
				to: "Fer",
				email: user.email,
				date: new Date(),
				photo: user.photo,
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
				{authMethod === "google" && user.photo && (
					<img
						src={user.photo}
						alt="Foto"
						className="w-12 h-12 rounded-full border-2 border-pink-200"
					/>
				)}
				<div>
					<p className="font-medium text-gray-900">De: {user.name}</p>
					<p className="text-sm text-gray-500">Para: Fer</p>
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
