"use client" // Diretiva necessária para componentes interativos no Next.js 13+
import useEmblaCarousel from 'embla-carousel-react' // Biblioteca de carrossel leve e performática
import { ChevronLeft, ChevronRight, Scissors, Syringe, CarTaxiFront, Hotel, Clock } from 'lucide-react'	// Ícones vetoriais de alta qualidade
import { WhatsappLogoIcon } from '@phosphor-icons/react/dist/ssr' // Biblioteca de ícones complementar

// Array de objetos estruturados para os serviços oferecidos
// Cada serviço contém título, descrição, duração, preço, ícone e texto para mensagem
const services = [
  {
    title: "Banho & Tosa",
    description: "Inclui banho com produtos específicos para o tipo de pelagem e pele do animal, corte de unhas, limpeza das orelhas e tosa personalizada (higiênica ou estilizada).",
    duration: "1h",
    price: "$50",
    icon: <Scissors />, // Uso de componentes React como valores em objetos
    linkText: 'Olá, vi no site sobre Banho e tosa e gostaria de mais informações.'
  },
  {
    title: "Consulta Veterinária",
    description: "Oferece atendimento clínico básico ou especializado para cuidar da saúde do animal. Inclui diagnóstico de doenças, aplicação de vacinas obrigatórias.",
    duration: "1h",
    price: "$45",
    icon: <Syringe />,
    linkText: 'Olá, vi no site sobre Consulta veterinária e gostaria de mais informações.'
  },
  {
    title: "Táxi Pet",
    description: "Serviço de transporte para levar e buscar os pets no petshop, clínicas veterinárias ou outros locais. Ideal para tutores que não têm tempo ou transporte adequado para locomover os animais.",
    duration: "2h",
    price: "$80",
    icon: <CarTaxiFront />,
    linkText: 'Olá, vi no site sobre Táxi Pet e gostaria de mais informações.'
  },
  {
    title: "Hotel para pets",
    description: "Serviço de hospedagem para animais de estimação, ideal para quando os tutores precisam viajar ou se ausentar por alguns dias. Os pets ficam acomodados em espaços seguros, confortáveis.",
    duration: "1h",
    price: "$60",
    icon: <Hotel />,
    linkText: 'Olá, vi no site sobre Hotel para pets e gostaria de mais informações.'
  },
]

export function Services(){

    // Inicialização do carrossel Embla com configurações responsivas
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: false, // Desativa o loop infinito
        align: "start", // Alinha os slides ao início
        slidesToScroll: 1, // Scroll de 1 slide por vez em dispositivos móveis
        breakpoints: {"(min-width: 768px": { slidesToScroll: 3} // Em telas maiores, permite scroll de 3 slides
    }       
    })


    function scrollPrev(){
        emblaApi?.scrollPrev();
    }

    function scrollNext(){
        emblaApi?.scrollNext();
    }

    return(
        <section className="bg-white py-16">
            <div className="container mx-auto px-4">

                    <h2 className="text-4xl font-bold mb-12">Nossos Serviços</h2>

                    <div className="relative">

                        <div className='overflow-hidden' ref={emblaRef}>
                            <div className='flex'>
                                {services.map((item, index) => (
                                    <div key={index} className='flex-[0_0_100%] min-w-0 md:flex-[0_0_33.33%] px-3'>
                                        <article className='bg-[#1E293B] text-white rounded-2xl p-6 space-y-4 h-full flex flex-col'>
                                            <div className='flex-1 flex items-start justify-between'>
                                                <div className='flex gap-3'>
                                                <span className='text-3xl'>{item.icon}</span>
                                                <div>
                                                    <h3 className='text-xl font-bold mb-1 my-1 select-none'>{item.title}</h3>
                                                    <p className='text-gray-400 text-sm select-none'>{item.description}</p>
                                                </div>
                                                </div>
                                            </div>

                                            <div className='border-t border-gray-700 pt-4 flex items-center justify-between'>
                                                <div className='flex items-center gap-2 text-sm'>
                                                    <Clock className='w-4 h-4' />
                                                    <span>{ item.duration }</span>
                                                </div>

                                            <a href='#' className='flex items-center justify-center gap-2 hover:bg-red-500 px-4 py-1 rounded-md duration-300'>
                                                <WhatsappLogoIcon className='w-5 h-5'/>
                                                Entrar em Contato
                                            </a>

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