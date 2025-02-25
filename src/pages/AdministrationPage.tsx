import { FC, useEffect, useState } from "react";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "../services/firebase";
import { AnimatePresence } from "framer-motion";
import { X, Sparkles, CheckCircle, Clock } from "lucide-react";
import Footer from "../components/Footer";

interface Message {
	id: string;
	date: Date;
	email: string;
	from: string;
	message: string;
	photo: string;
	to: string;
	status: "pending" | "approved"; // Nuevo campo de estado
}

const AdminMessagesPage: FC = () => {
	const [messages, setMessages] = useState<Message[]>([]);
	const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
	const [loading, setLoading] = useState(true);
	const [filter, setFilter] = useState<"all" | "approved" | "pending">("all");

	useEffect(() => {
		const fetchMessages = async () => {
			const querySnapshot = await getDocs(collection(db, "greetings"));
			const messagesData = querySnapshot.docs.map((doc) => ({
				id: doc.id,
				date: doc.data().date.toDate(),
				status: doc.data().status || "pending", // Valor por defecto
				...doc.data(),
			})) as Message[];

			setMessages(messagesData);
			setLoading(false);
		};

		fetchMessages();
	}, []);

	const handleStatusChange = async (
		messageId: string,
		newStatus: "approved" | "pending"
	) => {
		try {
			await updateDoc(doc(db, "greetings", messageId), {
				status: newStatus,
			});

			setMessages((prev) =>
				prev.map((msg) =>
					msg.id === messageId ? { ...msg, status: newStatus } : msg
				)
			);
		} catch (error) {
			console.error("Error updating status:", error);
		}
	};

	const filteredMessages = messages.filter((msg) => {
		if (filter === "all") return true;
		return msg.status === filter;
	});

	return (
		<div className="min-h-screen bg-[#F5A6E6] relative overflow-hidden">
			<div className="relative z-10 flex flex-col items-center min-h-screen p-4 md:p-8">
				{/* Header de administración */}
				<div className="w-full max-w-6xl text-center mb-8">
					<h1 className="text-4xl md:text-5xl font-bold text-[#BA1212] mb-4 font-[DancingScript] drop-shadow">
						Administrar Mensajes
					</h1>

					{/* Filtros */}
					<div className="flex gap-4 justify-center mb-6">
						<button
							onClick={() => setFilter("all")}
							className={`px-4 py-2 rounded-lg transition-colors ${
								filter === "all"
									? "bg-[#BA1212] text-white"
									: "bg-white/90 text-[#787878] hover:bg-white"
							}`}
						>
							Todos ({messages.length})
						</button>
						<button
							onClick={() => setFilter("approved")}
							className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
								filter === "approved"
									? "bg-[#4AFF09] text-[BA1212]"
									: "bg-white/90 text-[#787878] hover:bg-white"
							}`}
						>
							<CheckCircle size={18} />
							Aprobados (
							{messages.filter((m) => m.status === "approved").length})
						</button>
						<button
							onClick={() => setFilter("pending")}
							className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
								filter === "pending"
									? "bg-[#FFD700] text-[#BA1212]"
									: "bg-white/90 text-[#787878] hover:bg-white"
							}`}
						>
							<Clock size={18} />
							Pendientes (
							{messages.filter((m) => m.status === "pending").length})
						</button>
					</div>
				</div>

				{/* Lista de mensajes */}
				{loading ? (
					<div className="flex flex-col items-center animate-pulse">
						<div className="w-12 h-12 border-4 border-[#4AFF09] border-t-transparent rounded-full mb-4" />
						<span className="text-[#787878]">Cargando mensajes...</span>
					</div>
				) : (
					<div className="w-full max-w-6xl mx-auto">
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
							{filteredMessages.map((msg) => (
								<div
									key={msg.id}
									className="relative bg-white/95 backdrop-blur-lg rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-[#4AFF09]"
								>
									{/* Switch de estado */}
									<div className="absolute top-2 right-2">
										<label className="switch">
											<input
												type="checkbox"
												checked={msg.status === "approved"}
												onChange={(e) =>
													handleStatusChange(
														msg.id,
														e.target.checked ? "approved" : "pending"
													)
												}
											/>
											<span className="slider round" />
										</label>
									</div>

									{/* Contenido del mensaje */}
									<div className="h-full flex flex-col items-center justify-center">
										<div className="relative mb-3">
											<img
												src={msg.photo}
												alt={msg.from}
												className="w-14 h-14 rounded-full border-[3px] border-[#BA1212] shadow-md object-cover"
												onError={(e) => {
													(e.target as HTMLImageElement).src =
														"/default-avatar.png";
												}}
											/>
											<div
												className={`absolute -right-2 -bottom-2 rounded-full px-2 py-1 text-xs font-bold shadow ${
													msg.status === "approved"
														? "bg-[#4AFF09]"
														: "bg-[#FFD700]"
												}`}
											>
												{msg.status === "approved" ? "✓" : "⌛"}
											</div>
										</div>
										<div className="flex-1 overflow-y-auto w-full text-center">
											<p className="text-sm text-[#000000] font-medium mb-2 px-2 italic">
												"{msg.message}"
											</p>
										</div>
										<span className="text-xs text-[#787878] font-semibold mt-1">
											~ {msg.from}
										</span>
									</div>
								</div>
							))}
						</div>
					</div>
				)}

				{/* Modal de vista previa */}
				<AnimatePresence>
					{selectedMessage && (
						<div className="fixed inset-0 bg-[#000000]/70 backdrop-blur-sm flex items-center justify-center p-4">
							<div className="bg-white rounded-xl shadow-2xl max-w-md w-full relative overflow-hidden border-4 border-[#BA1212] animate-pop-in">
								<button
									className="absolute top-3 right-3 text-[#787878] hover:text-[#BA1212] transition-colors"
									onClick={() => setSelectedMessage(null)}
								>
									<X className="w-7 h-7" strokeWidth={2.5} />
								</button>

								<div className="p-6 text-center">
									<div className="relative inline-block mb-4">
										<img
											src={selectedMessage.photo}
											alt={selectedMessage.from}
											className="w-20 h-20 rounded-full border-[3px] border-[#4AFF09] object-cover mx-auto"
										/>
										<Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-[#BA1212] fill-current animate-pulse" />
									</div>

									<div className="space-y-4">
										<div className="bg-[#F5A6E6]/20 rounded-lg p-4 max-h-[50vh] overflow-y-auto">
											<p className="text-[#000000] text-lg leading-relaxed italic">
												"{selectedMessage.message}"
											</p>
										</div>

										<div className="text-left space-y-2">
											<p className="text-sm text-[#787878]">
												<span className="font-semibold text-[#BA1212]">
													De:
												</span>{" "}
												{selectedMessage.from}
											</p>
											<p className="text-sm text-[#787878]">
												<span className="font-semibold text-[#BA1212]">
													Estado:
												</span>{" "}
												{selectedMessage.status === "approved"
													? "Aprobado"
													: "Pendiente"}
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					)}
				</AnimatePresence>
				<Footer />
			</div>

			{/* Estilos para el switch */}
			<style>{`
				.switch {
					position: relative;
					display: inline-block;
					width: 50px;
					height: 24px;
				}

				.switch input {
					opacity: 0;
					width: 0;
					height: 0;
				}

				.slider {
					position: absolute;
					cursor: pointer;
					top: 0;
					left: 0;
					right: 0;
					bottom: 0;
					background-color: #ba1212;
					transition: 0.4s;
					border-radius: 34px;
				}

				.slider:before {
					position: absolute;
					content: "";
					height: 16px;
					width: 16px;
					left: 4px;
					bottom: 4px;
					background-color: white;
					transition: 0.4s;
					border-radius: 50%;
				}

				input:checked + .slider {
					background-color: #4aff09;
				}

				input:checked + .slider:before {
					transform: translateX(26px);
				}
			`}</style>
		</div>
	);
};

export default AdminMessagesPage;
