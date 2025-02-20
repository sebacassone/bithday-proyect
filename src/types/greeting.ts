// types/greeting.ts
export interface Greeting {
	id: string;
	message: string;
	from: string;
	to: string;
	email: string;
	photo?: string;
	date: Date;
	authMethod: "google" | "email";
}
