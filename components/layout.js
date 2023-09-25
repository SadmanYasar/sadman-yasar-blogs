import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Starfield from './starfield';

const name = 'Sadman Yasar Sayem';
export const siteTitle = 'Sadman Yasar Sayem Blogs';
const PROFILE_IMAGE_URL = 'https://avatars.githubusercontent.com/u/67522140?v=4'

export default function Layout({ children, home }) {
    return (
        <>
            <div className='max-w-2xl w-full  min-h-screen mx-auto px-4'>
                <Head>
                    <link rel="icon" href="/favicon.ico" />
                    <meta
                        name="description"
                        content="Sadman Yasar Sayem personal website using Next.js"
                    />
                    <meta
                        property="og:image"
                        content={`https://og-image.vercel.app/${encodeURI(
                            siteTitle,
                        )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
                    />
                    <meta name="og:title" content={siteTitle} />
                    <meta name="twitter:card" content="summary_large_image" />
                </Head>
                <header className='flex flex-col self-center'>
                    {home ? (
                        <>
                            <div className='p-2 rounded-full mx-auto mt-8 bg-purple-500 bg-opacity-20 transition hover:bg-opacity-10 ease-in-out duration-100'>
                                <img
                                    src={PROFILE_IMAGE_URL}
                                    className="rounded-full h-36 w-36 object-cover border-4 border-purple-500"
                                    alt={name}
                                />
                            </div>
                            <h1 className="text-2xl leading-1.3 font-extrabold tracking-wide my-8 mx-auto">{name}</h1>
                            <div className='w-full mx-auto mb-8 flex items-center justify-center space-x-4'>
                                <a href="https://www.upwork.com/freelancers/~01cfd344d945d1f282?viewMode=1" target="_blank">
                                    <img src={'/upwork.svg'} className="w-10 h-10 rounded-lg object-cover bg-yellow-50/90 p-2" />
                                </a>
                                <a href="https://www.linkedin.com/in/Sadman-Yasar-Sayem/" target="_blank">
                                    <img src={'/linkedin.svg'} className="w-10 h-10 object-cover rounded-lg bg-yellow-50/90 p-2" />
                                </a>
                                <a href="https://github.com/SadmanYasar" target="_blank">
                                    <img src={'/github.svg'} className="w-10 h-10 object-cover rounded-lg bg-yellow-50/90 p-2" />
                                </a>
                                <a href="https://www.behance.net/sadmanyasar" target="_blank">
                                    <img src={'/behance.svg'} className="w-10 h-10 object-cover rounded-lg bg-yellow-50/90 p-2" />
                                </a>
                            </div>
                        </>
                    ) : (
                        <>
                            <Link href="/">
                                <a>
                                    <img
                                        src={PROFILE_IMAGE_URL}
                                        className='rounded-full h-24 w-24 object-cover mt-8 transition hover:border-4 border-purple-500 border-opacity-20 ease-in-out duration-100'
                                        alt={name}
                                    />
                                </a>
                            </Link>
                            <h2 className='text-lg leading-1.4 my-4'>
                                <Link href="/">
                                    <a className='text-current'>{name}</a>
                                </Link>
                            </h2>
                        </>
                    )}
                </header>
                <main>{children}</main>
                {!home && (
                    <div className='mt-12'>
                        <Link href="/">
                            <a>← Back to home</a>
                        </Link>
                    </div>
                )}
            </div>
            <Starfield />
        </>
    );
}