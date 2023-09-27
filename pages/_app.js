import "../styles/global.css"

import localFont from 'next/font/local'

const satoshi = localFont({
  src : '../styles/fonts/Satoshi.woff2',
  variable : '--font-satoshi',
})

export default function App({Component, pageProps}) {
  return (<main className = {`${satoshi.variable} font-sans`}>
          <Component { ...pageProps } />
        </main>)
}