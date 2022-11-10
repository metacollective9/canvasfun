import Head from "next/head";
import Navigation from "../components/navigation";
import Footer from "../components/footer";
import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
  title?: string;
  description?: string;
};

export default function Layout({
  children,
  title = "Meta Collective Tools",
  description = "Meta Collective Tools",
}: Props) {
  return (
    <div className="bg-slate-100 font-Playfair leading-normal tracking-normal w-full">
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content={title} key="title" />
        <meta
          property="og:description"
          content={description}
          key="description"
        />
        <meta name="description" content={description} />
        <link
          rel="icon"
          href="https://cdn-images-1.medium.com/fit/c/64/64/1*dj1msIqe6GrX0RjsaTtm3A.png"
        />
      </Head>

      <main className="bg-slate-100 font-Playfair leading-normal tracking-normal">
        <Navigation />
        {children}
      </main>
      <Footer />
    </div>
  );
}
