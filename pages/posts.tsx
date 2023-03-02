import axios from "axios";
import useSWR from "swr";
import { POST, post } from "../components/post";
import Loading from "../components/loading";
import Container from "../components/container";
import { NextSeo } from "next-seo";

const title = "MetaCollective Blog Posts";
const description = "Listing of MetaCollective blog posts";

export default function Blogs() {
  const fetcher = async (url: string) =>
    await axios.get(url).then((res) => res.data);
  const { data, error } = useSWR(
    "https://medium-blogs.s3.eu-west-1.amazonaws.com/medium+blogs.json",
    fetcher
  );

  if (error) <p>Loading failed...</p>;

  if (!data) return <Loading />;

  return (
    <>
      {data && (
        <>
          <NextSeo
            title={`Blog — ${title}`}
            description={description || ""}
            canonical={"https://tools.meta-collective.co.uk/"}
            openGraph={{
              url: "https://tools.meta-collective.co.uk/",
              title: `Blog — ${title}`,
              description: description || "",
              images: [
                {
                  url: "",
                  width: 800,
                  height: 600,
                  alt: ""
                }
              ],
              site_name: "Web3Forms"
            }}
            twitter={{
              cardType: "summary_large_image"
            }}
          />
          <Container>
            <h1 className="text-3xl font-semibold tracking-tight text-center lg:leading-snug text-brand-primary lg:text-4xl dark:text-white">
              Posts
            </h1>
            <div className="text-center">
              <p className="mt-2 text-lg">
                See all posts we have ever written.
              </p>
            </div>
            <div className="grid gap-10 mt-10 lg:gap-10 md:grid-cols-2 xl:grid-cols-3 ">
              {data.map((post: post) => (
                <POST
                  key={post.title}
                  {...post}
                />
              ))}
            </div>
          </Container>
        </>
      )}
    </>
  );
}