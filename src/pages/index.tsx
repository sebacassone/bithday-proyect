// src/pages/MessagesPage.tsx
import { FC, useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";

interface Message {
	id: string;
	text: string;
	sender: string;
	createdAt: Date;
}

const MessagesPage: FC = () => {
	const [messages, setMessages] = useState<Message[]>([]);

	useEffect(() => {
		const fetchMessages = async () => {
			const querySnapshot = await getDocs(collection(db, "messages"));
			const messagesData = querySnapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			})) as Message[];
			setMessages(messagesData);
		};

		fetchMessages();
	}, []);

	return (
		<div className="p-4">
			<h1 className="text-2xl font-bold mb-4">Mensajes para ti 💖</h1>
			{messages.map((msg) => (
				<div key={msg.id} className="bg-white p-4 mb-4 rounded shadow">
					<p className="font-bold">{msg.sender}</p>
					<p>{msg.text}</p>
				</div>
			))}
		</div>
	);
};

export default MessagesPage;
