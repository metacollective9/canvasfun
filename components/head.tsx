import Head from "next/head";

type Props = {
  title?: string;
  description?: string;
};

export default function MCHEAD({ title = "Meta Collective Tools", description= "Meta Collective Tools" }: Props) {
  return (
    <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} key="title" />
        <meta property="og:description" content={description} key="description" />
        <meta name="description" content={description} />
    </Head>
  );
}
