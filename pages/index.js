import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Hi! I am a Computer Science undergraduate student currently learning NextJs. It's fascinating to use it after being a MERN stack dev all this time 😊</p>
        <p>
          This site is made with ❤️ using{' '}
          <a href="https://nextjs.org/">NextJs</a>
        </p>
      </section>
    </Layout>
  );
}