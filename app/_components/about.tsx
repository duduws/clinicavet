import Image from "next/image";
import about1Img from '../../public/about-1.png'
import about2Img from '../../public/about-2.png'
import { CheckCheck, MapPin } from "lucide-react";
import { WhatsappLogoIcon } from '@phosphor-icons/react/dist/ssr'

// Componente About: Seção responsável por apresentar informações sobre a empresa
// Utiliza Next.js Image para otimização de imagens e ícones de bibliotecas populares como Lucide e Phosphor

export function About(){
    return(
        <section className="bg-[#FDF6EC] py-16">
            <div className="contaienr px-4 mx-auto">

                <div  className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    <div className="relative">
                        {/* Implementação de layout com imagem principal responsiva */}
                        <div className="relative w-full h-[400px] rounded-3xl overflow-hidden">
                            <Image
                            src={about1Img}
                            alt="Foto do cachorro"
                            fill
                            quality={100}
                            className="object-cover hover:scale-110 duration-300" /* Efeito de hover com animação suave */
                            priority
                            />
                        </div>

                        {/* Técnica de sobreposição de imagens com posicionamento absoluto */}
                        <div className="absolute w-40 h-40 right-4 -bottom-8 border-4 overflow-hidden border-white rounded-lg">
                            <Image
                            src={about2Img}
                            alt="Foto do cachorro 2"
                            fill
                            quality={100}
                            priority
                            />
                        </div>
                    </div>

                    <div className="space-y-6 mt-10">
                        <h2 className="text-4xl font-bold">Sobre nós</h2>

                        <p className="text-lg">
                            Oferecemos um ambiente seguro e acolhedor para seus animais, com treinamento personalizado e cuidados médicos de qualidade.
                        </p>

                        <ul className="space-y-4">
                            <li className="flex items-center gap-2">
                                <CheckCheck className="text-red-500"/>
                                Aberto desde 2006.
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCheck className="text-red-500"/>
                                Equipe com mais de 10 veterinários.
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCheck className="text-red-500"/>
                                Qualidade é nossa prioridade.
                            </li>
                        </ul>

                        <div className="flex gap-2">
                            <a href="#"
                            className="bg-[#E84C3D] text-white flex items-center justify-center w-fit gap-2 px-4 py-2 rounded-md"
                            > <WhatsappLogoIcon className='w-5 h-5 text-white'/>
                                Contato via WhatsApp
                            </a>
                            <a href="#"
                            className="flex items-center justify-center w-fit gap-2 px-4 py-2 rounded-md"
                            > <MapPin className='w-5 h-5 text-black'/>
                                Endereço da Loja
                            </a>
                        </div>
                
                    </div>

                </div>


            </div>
        </section>
    )
}