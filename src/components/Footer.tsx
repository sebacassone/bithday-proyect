// components/Footer.tsx
import { motion } from "framer-motion";
import { Github, Linkedin, Code } from "lucide-react";

const Footer = () => {
	return (
		<footer className="fixed bottom-0 left-0 right-0 bg-[#F5A6E6] border-t-2 border-[#4AFF09] shadow-lg">
			<div className="max-w-6xl mx-auto px-4 md:px-8 py-3">
				<div className="flex flex-col md:flex-row items-center justify-between gap-4">
					{/* Redes sociales */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						className="flex items-center gap-6"
					>
						<a
							href="https://github.com/sebacassone"
							target="_blank"
							rel="noopener noreferrer"
							className="text-[#000000] hover:text-[#BA1212] transition-colors"
							aria-label="GitHub"
						>
							<Github className="w-6 h-6" />
						</a>

						<a
							href="https://www.linkedin.com/in/sebacassone/"
							target="_blank"
							rel="noopener noreferrer"
							className="text-[#000000] hover:text-[#4AFF09] transition-colors"
							aria-label="LinkedIn"
						>
							<Linkedin className="w-6 h-6" />
						</a>
					</motion.div>

					{/* Texto del repo */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2 }}
						className="flex items-center gap-2 text-[#787878] hover:text-[#BA1212] transition-colors"
					>
						<Code className="w-5 h-5" />
						<a
							href="https://github.com/sebacassone/bithday-proyect"
							target="_blank"
							rel="noopener noreferrer"
							className="text-sm font-medium"
						>
							Código de este regalo
						</a>
					</motion.div>

					{/* Firma */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.4 }}
						className="flex items-center gap-2"
					>
						<span className="text-sm text-[#000000] font-[DancingScript]">
							Hecho con 💖 por Sebastián
						</span>
						<div className="w-2 h-2 bg-[#4AFF09] rounded-full animate-pulse" />
					</motion.div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
