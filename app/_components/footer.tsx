import golden from '../../public/golden.png'
import royal from '../../public/royal.png'
import primier from '../../public/primier.png'
import whiskas from '../../public/whiskas.png'
import natural from '../../public/natural.png'
import Image from 'next/image'
import { FacebookLogoIcon, InstagramLogoIcon, YoutubeLogoIcon } from '@phosphor-icons/react/dist/ssr'

// Componente Footer: Implementa o rodapé do site com marcas parceiras e informações de contato
// Utiliza array de objetos para gerenciar dinamicamente as marcas exibidas

const brands = [
  { name: "Royal Canin", logo: royal },
  { name: "Golden", logo: golden },
  { name: "Primier", logo: primier },
  { name: "Formula Natural", logo: natural },
  { name: "Whiskas", logo: whiskas },
  { name: "Golden", logo: golden },
]


export function Footer(){
    return(
        <section className='bg-[#E84C3D] py-16 text-white'>
            <div className='container mx-auto px-4'>

                <div className='border-b border-white/20 pb-8'>
                <h4 className='text-3xl font-semibold mb-8 text-center'>Marcas que trabalhamos</h4>

                {/* Grid responsivo que se adapta a diferentes tamanhos de tela (2 colunas em mobile, 6 em desktop) */}
                <div className='grid grid-cols-2 lg:grid-cols-6 gap-8'>
                    {/* Renderização dinâmica das marcas usando map para iterar sobre o array de objetos */}
                    {brands.map((item, index) => (
                        <div key={index} className='bg-white p-4 rounded-lg flex items-center justify-center'>
                        <Image
                        src={item.logo}
                        alt={item.name}
                        width={100}
                        height={50}
                        quality={100}
                        style={{
                            width: "auto",
                            height: "auto",
                        }}
                        className='object-contain'
                        />
                        </div>
                ))}
                </div>

                </div>

                <footer className='grid grid-cols-1 md:grild-cols-2 lg:grid-cols-3 gap-8 mb-12 mt-5'>
                    <div>
                        <h3 className='text-2xl font-semibold mb-2'>Pet Shop</h3>
                        <p className='mb-4'>
                            Oferecemos um ambiente seguro e acolhedor para seus animais, com treinamento personalizado e cuidados médicos de qualidade.
                        </p>
                        <a href='#' className='bg-green-500 px-4 py-2 rounded-md'>
                            Contato via Whatsapp
                        </a>
                    </div>

                    <div>
                        <h3 className='text-2xl font-semibold mb-2'>Contatos</h3>
                        <p>Email: teste@teste.com</p>
                        <p>Telefone: (11) 99999-9999</p>
                        <p>Endereço: Rua Teste, 123 - Bairro Teste - Cidade Teste - SP</p>
                    </div>

                    <div>
                        <h3 className='text-2xl font-semibold mb-2'>Redes Sociais</h3>
                        <div className='flex gap-4'>
                            <a href='#' className=' px-4 py-2 rounded-md'>
                                <FacebookLogoIcon className='w-5 h-5' />
                            </a>
                            <a href='#' className=' px-4 py-2 rounded-md'>
                                <InstagramLogoIcon className='w-5 h-5' />
                            </a>
                            <a href='#' className='px-4 py-2 rounded-md'>
                                <YoutubeLogoIcon className='w-5 h-5' />
                            </a>
                        </div>
                    </div>

                </footer>

            </div>
        </section>
    )
}