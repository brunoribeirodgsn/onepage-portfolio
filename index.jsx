import { useState, memo } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageCircle } from "lucide-react";

// Componente memoizado para cada card do portfólio
const PortfolioCard = memo(({ item }) => (
  <motion.div
    className="relative rounded-2xl overflow-hidden cursor-pointer shadow-xl perspective-1000"
    whileHover="hover"
    initial="rest"
    animate="rest"
    onMouseMove={(e) => {
      const card = e.currentTarget;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotateX = ((y / rect.height) - 0.5) * 15;
      const rotateY = ((x / rect.width) - 0.5) * -15;
      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    }}
    onMouseLeave={(e) => {
      const card = e.currentTarget;
      card.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
    }}
  >
    <a href={item.url} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
      <motion.img
        src={item.img}
        alt={item.title}
        loading="lazy"
        className="w-full h-48 object-cover rounded-2xl"
      />
      <motion.div
        className="absolute inset-0 bg-black bg-opacity-40 flex items-end justify-center p-4"
        variants={{
          rest: { opacity: 0, y: 20 },
          hover: { opacity: 1, y: 0, transition: { duration: 0.4 } }
        }}
      >
        <p className="text-white font-semibold text-center text-lg">{item.title}</p>
      </motion.div>
    </a>
  </motion.div>
));

export default function Portfolio() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    const phone = "5524999278489";
    const text = `Olá Bruno! Sou ${formData.name} (${formData.email}). Minha mensagem: ${formData.message}`;
    window.open(`https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(text)}`, "_blank");
    setSending(false);
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  const portfolio = {
    branding: [
      { title: "Projeto Branding 1", url: "https://www.instagram.com/brunoribeirodgsn/p/DJzUOa-piXj/", img: "/images/branding1.jpg" },
      { title: "Projeto Branding 2", url: "https://www.instagram.com/brunoribeirodgsn/p/C1KZCw-uZY_/", img: "/images/branding2.jpg" },
    ],
    motion: [
      { title: "Projeto Motion 1", url: "https://www.instagram.com/brunoribeirodgsn/reel/C3-vmLUh0bR/", img: "/images/motion1.jpg" },
      { title: "Projeto Motion 2", url: "https://www.instagram.com/brunoribeirodgsn/p/C1IQJL_Jzsf/", img: "/images/motion2.jpg" },
    ],
    social: [
      { title: "Projeto Social 1", url: "#", img: "/images/social1.jpg" },
      { title: "Projeto Social 2", url: "#", img: "/images/social2.jpg" },
    ],
  };

  return (
    <div className="bg-gradient-to-b from-[#0f0f1a] to-[#1a1a2e] text-white relative">
      {/* Hero */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
        className="min-h-screen flex flex-col md:flex-row items-center justify-center text-center md:text-left px-6 md:px-20"
      >
        <motion.div className="md:w-1/2">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-lime-400 via-purple-500 to-sky-400 bg-clip-text text-transparent">
            Bruno Ribeiro
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-md">
            Designer & Motion Designer. Transformo ideias em experiências visuais dinâmicas e memoráveis.
          </p>
          <Button
            className="mt-6 px-6 py-3 rounded-2xl bg-gradient-to-r from-lime-400 via-purple-500 to-sky-400 text-black font-semibold shadow-lg"
            onClick={() => window.open("https://api.whatsapp.com/send?phone=5524999278489", "_blank")}
          >
            Vamos Criar Juntos
          </Button>
        </motion.div>
      </motion.section>

      {/* Serviços */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
        className="py-20 px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto"
      >
        {["Branding", "UI/UX", "Motion Graphics"].map((service) => (
          <Card key={service} className="rounded-2xl shadow-md bg-[#22223b] border-none">
            <CardContent className="p-6">
              <h3 className="text-2xl font-semibold mb-2 text-lime-400">{service}</h3>
              <p className="text-gray-300">Criação estratégica e criativa para dar vida à sua marca.</p>
            </CardContent>
          </Card>
        ))}
      </motion.section>

      {/* Portfólio otimizado */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
        className="py-20 px-6 max-w-6xl mx-auto"
      >
        <h2 className="text-3xl font-bold text-center mb-12 text-purple-400">Portfólio</h2>
        <Tabs defaultValue="motion" className="w-full">
          <TabsList className="flex flex-col sm:flex-row justify-center mb-8 space-y-2 sm:space-y-0 sm:space-x-4">
            <TabsTrigger value="branding">Branding</TabsTrigger>
            <TabsTrigger value="motion">Motion</TabsTrigger>
            <TabsTrigger value="social">Social Media</TabsTrigger>
          </TabsList>

          {Object.keys(portfolio).map((category) => (
            <TabsContent key={category} value={category} forceMount={false} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {portfolio[category].map((item, i) => <PortfolioCard key={i} item={item} />)}
            </TabsContent>
          ))}
        </Tabs>
      </motion.section>

      {/* Contato */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
        className="py-20 px-6 max-w-3xl mx-auto"
      >
        <h2 className="text-3xl font-bold text-center mb-12 text-lime-400">Entre em Contato</h2>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <Input type="text" name="name" placeholder="Seu nome" onChange={handleChange} required />
          <Input type="email" name="email" placeholder="Seu email" onChange={handleChange} required />
          <Textarea name="message" placeholder="Sua mensagem" rows={5} onChange={handleChange} required />
          <Button
            type="submit"
            disabled={sending}
            className="mt-4 px-6 py-3 rounded-2xl bg-gradient-to-r from-lime-400 via-purple-500 to-sky-400 text-black font-semibold shadow-lg disabled:opacity-50"
          >
            Enviar via WhatsApp
          </Button>
        </form>
      </motion.section>

      {/* Footer */}
      <footer className="py-6 text-center text-gray-400 text-sm">
        © 2025 Bruno Ribeiro — Siga no{" "}
        <a
          href="https://instagram.com/brunoribeirodgsn"
          target="_blank"
          rel="noopener noreferrer"
          className="text-purple-400 hover:underline"
        >
          Instagram
        </a>
      </footer>

      {/* Botão flutuante WhatsApp */}
      <div className="fixed bottom-6 right-6 group relative z-50">
        <motion.a
          href="https://api.whatsapp.com/send?phone=5524999278489&text=Olá%20Bruno!%20Quero%20saber%20mais%20sobre%20seu%20trabalho."
          target="_blank"
          rel="noopener noreferrer"
          className="bg-lime-400 p-4 rounded-full shadow-xl flex items-center justify-center"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
          aria-label="Fale comigo no WhatsApp"
        >
          <MessageCircle className="text-black w-6 h-6" />
        </motion.a>
        <span className="absolute right-16 top-1/2 -translate-y-1/2 px-3 py-1 text-sm bg-black text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none sm:block">
          Fale comigo no WhatsApp
        </span>
      </div>
    </div>
  );
}
