import Head from 'next/head';
import Image from 'next/image';
// import styles from './layout.module.css';
// import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import Starfield from './starfield';

const name = 'Sadman Yasar Sayem';
export const siteTitle = 'Sadman Yasar Sayem Blogs';

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
                            <img
                                src="/images/profile.jpg"
                                className='rounded-full h-36 w-36 object-cover mx-auto mt-8'
                                alt={name}
                            />
                            <h1 className="text-2xl leading-1.3 font-extrabold tracking-wide my-4">{name}</h1>
                        </>
                    ) : (
                        <>
                            <Link href="/">
                                <a>
                                    <img
                                        src="/images/profile.jpg"
                                        className='rounded-full h-24 w-24 object-cover mt-8'
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