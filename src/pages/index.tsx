// src/pages/MessagesPage.tsx
import { FC, useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";

interface Message {
	id: string;
	date: string;
	email: string;
	from: string;
	message: string;
	photo: string;
	to: string;
}

const MessagesPage: FC = () => {
	const [messages, setMessages] = useState<Message[]>([]);

	useEffect(() => {
		const fetchMessages = async () => {
			const querySnapshot = await getDocs(collection(db, "greetings"));
			const messagesData = querySnapshot.docs.map((doc) => {
				const data = doc.data();
				return {
					id: doc.id,
					date: data.date,
					email: data.email,
					from: data.from,
					message: data.message,
					photo: data.photo,
					to: data.to,
				} as Message;
			});
			setMessages(messagesData);
			console.log(messagesData);
		};

		fetchMessages();
	}, []);

	return (
		<div className="p-4">
			<h1 className="text-2xl font-bold mb-4">Mensajes para ti 💖</h1>
			{messages.map((msg) => (
				<div key={msg.id} className="bg-white p-4 mb-4 rounded shadow">
					<p className="font-bold">{msg.from}</p>
					<p>{msg.message}</p>
				</div>
			))}
		</div>
	);
};

export default MessagesPage;
