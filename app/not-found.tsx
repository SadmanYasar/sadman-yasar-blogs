import Link from "@/components/link";
import Layout from "@/components/layout";

export default function NotFound() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center text-center py-20">
        <h1 className="text-4xl font-extrabold text-white mb-4">404</h1>
        <p className="text-lg text-gray-400 mb-8">This page could not be found.</p>
        <Link
          href="/"
          className="px-6 py-2.5 text-sm font-medium text-purple-300 bg-purple-950/50 border border-purple-500/30 rounded-full hover:bg-purple-900/50 transition-colors"
        >
          Return Home
        </Link>
      </div>
    </Layout>
  );
}
