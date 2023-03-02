import React, { ReactNode } from "react";
import Head from "next/head";
import { NextSeo } from "next-seo";
import Navbar from "./navigation";

import Footer from "./footer";

type Props = {
  children?: ReactNode;
  title?: string;
  description?: string;
};

export default function Layout(props: Props) {
  const { children } = props;
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://tools.meta-collective.co.uk" />
        <link rel="dns-prefetch" href="https://tools.meta-collective.co.uk" />
      </Head>
      <NextSeo
        title={props.title}
        description={props.description}
        canonical={"https://tools.meta-collective.co.uk"}
        openGraph={{
          url: "https://tools.meta-collective.co.uk",
          title: props.title,
          description: props.description,
          images: [
            {
              url: "https://cdn-images-1.medium.com/fit/c/64/64/1*dj1msIqe6GrX0RjsaTtm3A.png",
              width: 800,
              height: 600,
              alt: props.title
            }
          ],
          site_name: props.title
        }}
        twitter={{
          handle: "@metacollective9",
          site: "@metacollective9",
          cardType: "summary_large_image"
        }}
      />

      <div className="antialiased text-gray-800 dark:bg-black dark:text-gray-400">
        <Navbar  />
        <div>
          {children}
        </div>
        <Footer  />
      </div>
    </>
  );
}
