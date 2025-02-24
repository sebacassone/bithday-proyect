// pages/InvitationPage.tsx
import { FC, useState } from "react";
import AuthSelector from "../components/Auth/AuthSelector";
import GreetingForm from "../components/GreetingForm";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebase";

const InvitationPage: FC = () => {
	const [user, setUser] = useState<{
		name: string;
		email: string;
		photo?: string;
	} | null>(null);
	const [authMethod, setAuthMethod] = useState<"google" | "email" | null>(null);

	function setShowSuccess(arg0: boolean) {
		throw new Error("Function not implemented.");
	}

	return (
		<div className="min-h-screen bg-pink-50 py-8 px-4">
			<div className="max-w-md mx-auto">
				<div className="text-center mb-8">
					<h1 className="text-3xl font-bold text-pink-600 mb-4">
						🎉 ¡Celebremos el cumple de Fer!
					</h1>
					<p className="text-gray-600">
						Deja tu mensaje especial para que Fer lo vea en su día
					</p>
				</div>

				{!user ? (
					<div className="bg-white rounded-xl shadow-sm p-6">
						<h2 className="text-xl font-semibold text-gray-900 mb-6">
							Primero, dinos quién eres:
						</h2>
						<AuthSelector
							onGoogleSuccess={(userData) => {
								setUser(userData);
								setAuthMethod("google");
							}}
							onEmailSuccess={(userData) => {
								setUser(userData);
								setAuthMethod("email");
							}}
						/>
					</div>
				) : (
					<GreetingForm
						user={user}
						authMethod={authMethod!}
						onBack={() => {
							// Limpiar estado de autenticación
							setUser(null);
							setAuthMethod(null);
							// Opcional: cerrar sesión de Firebase
							signOut(auth);
						}}
						onSuccess={() => setShowSuccess(true)}
					/>
				)}

				<div className="mt-6 text-center text-sm text-gray-500">
					<p>Los mensajes se mostrarán el 25 de Febrero</p>
					<p className="mt-1">¡Gracias por participar! 💖</p>
				</div>
			</div>
		</div>
	);
};

export default InvitationPage;
