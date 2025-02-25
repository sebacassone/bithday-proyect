import { FC, useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";
import { AnimatePresence } from "framer-motion";
import { X, Heart, Sparkles } from "lucide-react";
import Footer from "../components/Footer";

interface Message {
	id: string;
	date: Date;
	email: string;
	from: string;
	message: string;
	photo: string;
	to: string;
}

const MessagesPage: FC = () => {
	const [messages, setMessages] = useState<Message[]>([]);
	const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
	const [loading, setLoading] = useState(true);
	const [currentImage, setCurrentImage] = useState(1);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentImage((prev) => (prev % 10) + 1);
		}, 7000);

		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		const fetchMessages = async () => {
			const querySnapshot = await getDocs(collection(db, "greetings"));
			const messagesData = querySnapshot.docs.map((doc) => ({
				id: doc.id,
				date: doc.data().date.toDate(),
				...doc.data(),
			})) as Message[];

			setMessages(messagesData);
			setLoading(false);
		};

		fetchMessages();
	}, []);

	return (
		<div className="min-h-screen bg-[#F5A6E6] relative overflow-hidden">
			{/* Efecto de corazones */}
			<div className="absolute inset-0 flex items-center justify-center pointer-events-none">
				{[...Array(15)].map((_, i) => (
					<div
						key={i}
						className="absolute text-[#BA1212] animate-float"
						style={{
							animationDelay: `${Math.random() * 2}s`,
							left: `${Math.random() * 100}%`,
						}}
					>
						<Heart className="fill-current" size={28} />
					</div>
				))}
			</div>

			{/* Contenido principal */}
			<div className="relative z-10 flex flex-col items-center min-h-screen p-4 md:p-8">
				{/* Header */}
				<div className="w-full max-w-2xl text-center mb-8">
					<div className="relative mx-auto w-32 h-32 md:w-40 md:h-40 mb-6 rounded-full border-4 border-[#4AFF09] shadow-lg overflow-hidden">
						<AnimatePresence mode="wait">
							{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
								(imgNumber) =>
									currentImage === imgNumber && (
										<img
											key={imgNumber}
											src={`/assets/imgs/${imgNumber}.jpg`}
											alt="Fer"
											className="w-full h-full object-cover absolute inset-0 animate-fade-in"
										/>
									)
							)}
						</AnimatePresence>
						<div className="absolute inset-0 bg-gradient-to-t from-[#BA1212]/30 via-transparent to-[#4AFF09]/20 mix-blend-soft-light" />
					</div>

					<div className="space-y-4">
						<h1 className="text-4xl md:text-5xl font-bold text-[#BA1212] mb-2 font-[DancingScript] drop-shadow">
							¡Felices 24!
						</h1>
						<div className="bg-white/90 rounded-2xl p-4 md:p-6 shadow-md">
							<p className="text-[#000000] text-lg md:text-xl leading-relaxed">
								Con todo el cariño de tus amigues te desean unas palabras (al
								igual que yo), me hace inmensamente feliz poder hacerte
								finalmente este regalo con todo mi amor, gracias por existir,
								por hacerme la vida mucho más bonita. Te amo 🌸✨
								<br />
								<span className="text-[#BA1212] font-semibold block mt-2">
									- Sebastián Cassone
								</span>
							</p>
						</div>
					</div>
				</div>

				{/* Mensajes */}
				{loading ? (
					<div className="flex flex-col items-center animate-pulse">
						<div className="w-12 h-12 border-4 border-[#4AFF09] border-t-transparent rounded-full mb-4" />
						<span className="text-[#787878]">Cargando bendiciones...</span>
					</div>
				) : (
					<div className="w-full max-w-6xl mx-auto">
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
							{messages.map((msg, index) => (
								<div
									key={msg.id}
									className="relative bg-white/95 backdrop-blur-lg rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 h-56 flex flex-col items-center justify-center border-2 border-[#4AFF09] cursor-pointer"
									onClick={() => setSelectedMessage(msg)}
								>
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
										<div className="absolute -right-2 -bottom-2 bg-[#4AFF09] text-[#000000] rounded-full px-2 py-1 text-xs font-bold shadow">
											{index + 1}
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
							))}
						</div>
					</div>
				)}

				{/* Modal */}
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
										</div>
									</div>
								</div>

								<div className="bg-[#4AFF09] py-3 px-6 text-[#000000] font-bold text-sm">
									🦋 ¡Que todos tus deseos se hagan realidad! 🌟
								</div>
							</div>
						</div>
					)}
				</AnimatePresence>

				<Footer />
			</div>
		</div>
	);
};

export default MessagesPage;
