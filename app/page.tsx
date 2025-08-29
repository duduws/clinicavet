// Importação dos componentes modulares que compõem a página principal
import { About } from "./_components/about";
import { Footer } from "./_components/footer";
import { Hero } from "./_components/hero";
import { Services } from "./_components/services";
import { Testimonials } from "./_components/testimonials";


// Componente principal da página que organiza as seções em uma estrutura lógica
export default function Home() {
  return (
    <main>
      {/* Organização das seções em ordem estratégica para melhor experiência do usuário */}
      <Hero/> {/* Seção de destaque principal */}
      <About/> {/* Informações sobre a empresa */}
      <Services/> {/* Serviços oferecidos */}
      <Testimonials/> {/* Depoimentos de clientes para aumentar credibilidade */}
      <Footer/> {/* Rodapé com informações de contato e marcas */}
    </main>

  )
}