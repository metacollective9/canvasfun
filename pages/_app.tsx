import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/layout";
import { Analytics } from "@vercel/analytics/react";
import { GoogleAnalytics } from "nextjs-google-analytics";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
      <Analytics />
      <GoogleAnalytics trackPageViews gaMeasurementId="G-NPXKD38ZBV" />
    </Layout>
  );
}
