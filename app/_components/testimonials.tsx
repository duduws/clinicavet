"use client" // Diretiva necessária para componentes interativos no Next.js 13+
import useEmblaCarousel from 'embla-carousel-react' // Biblioteca de carrossel para exibição de depoimentos
import { ChevronLeft, ChevronRight, Scissors, Syringe, CarTaxiFront, Hotel, Clock } from 'lucide-react'	
import { WhatsappLogoIcon } from '@phosphor-icons/react/dist/ssr'
import tutor1 from '../../public/tutor1.png' // Imagens otimizadas para os depoimentos
import tutor2 from '../../public/tutor1.png'
import Image from 'next/image' // Componente de imagem otimizado do Next.js

// Array de objetos estruturados para os depoimentos de clientes
// Cada depoimento contém conteúdo, autor, função/papel e imagem
const testimonials = [
  {
    content:
      "Desde que comecei a levar a Luna para banho e tosa aqui, ela nunca esteve tão feliz! O atendimento é impecável, os profissionais são super cuidadosos e sempre deixam minha peluda linda e cheirosa. Recomendo de olhos fechados!",
    author: "Mariana Souza",
    role: "Tutora da Luna (Golden Retriever)",
    image: tutor2, // Referência à imagem importada
  },
  {
    content:
      "O serviço de hotel para pets foi uma experiência incrível! Precisei viajar e fiquei tranquilo sabendo que o Thor estava sendo bem cuidado. Recebi fotos e atualizações diárias, e ele voltou para casa super feliz! Sem dúvida, o melhor petshop da região.",
    author: "Rafael",
    role: "Tutor do Thor (Bulldog Francês)",
    image: tutor1,
  },
  {
    content: "Meus gatos nunca gostaram de sair de casa, mas o atendimento nesse petshop fez toda a diferença. A equipe é muito paciente e cuidadosa, e o serviço de banho especializado para felinos foi maravilhoso! Agora sei onde confiar o cuidado deles.",
    author: "Camila fernandes",
    role: "Tutora da Mel e do Max",
    image: tutor2,
  },
]

export function Testimonials(){

    // Inicialização do carrossel com configuração de loop infinito
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true // Habilita navegação circular infinita
    })
    
    // Funções de navegação para os botões de controle
    function scrollPrev(){
        emblaApi?.scrollPrev(); // Navega para o slide anterior
    }
    function scrollNext(){
        emblaApi?.scrollNext(); // Navega para o próximo slide
    }

    return(
        <section className="bg-[#FFD449] py-16">
            <div className="container mx-auto px-4">

                    <h2 className="text-4xl font-bold mb-12 text-center">Depoimentos dos nossos clientes</h2>

                    <div className="relative max-w-4xl mx-auto">

                        <div className='overflow-hidden' ref={emblaRef}>
                            <div className='flex'>
                                {testimonials.map((item, index) => (
                                    <div key={index} className='flex-[0_0_100%] min-w-0 px-3'>
                                        <article className='bg-[#1E293B] text-white rounded-2xl p-6 space-y-4 h-full flex flex-col'>
                                            <div className='flex flex-col items-center text-center space-y-4 select-none'>
                                                <div className='relative w-24 h-24'>
                                                    <Image
                                                    src={item.image}
                                                    alt={item.author}
                                                    fill
                                                    sizes='96px'
                                                    className='object-cover rounded-full'
                                                    />
                                                </div>

                                                <p className='text-gray-200'>{item.content}</p>

                                                <div>
                                                    <p className='font-bold'>{item.author}</p>
                                                    <p className='text-sm text-gray-400'>{item.role}</p>
                                                </div>

                                            </div>
                                        </article>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button onClick={scrollPrev} className='absolute top-1/2 left-0 -translate-y-1/2 bg-white p-2 rounded-full shadow-md'>
                            <ChevronLeft className='w-6 h-6'/>
                        </button>
                        <button onClick={scrollNext} className='absolute top-1/2 right-0 -translate-y-1/2 bg-white p-2 rounded-full shadow-md'>
                            <ChevronRight className='w-6 h-6'/>
                        </button>

                    </div>

            </div>

        </section>
    )
}