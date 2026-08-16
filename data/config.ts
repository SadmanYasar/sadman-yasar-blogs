export const siteConfig = {
  name: "Sadman Yasar Sayem",
  title: "Sadman Yasar Sayem Blogs",
  description: "Sadman Yasar Sayem personal website and engineering blogs",
  siteUrl: (
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://sadman-yasar-sayem-blogs.vercel.app"
  ).replace(/\/$/, ""),
  twitterHandle: "@sadmanyasar_",
  email: "sadmanyasar8@gmail.com",
  gtmId: "G-P43MJLFWMN",
  userwayAccount: "6iC0LiBYmw",
};

export const config = siteConfig;
export default siteConfig;
