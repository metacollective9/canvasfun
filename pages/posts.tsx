import axios from "axios";
import useSWR from "swr";
import MCHead from "../components/head";
import { POST, post } from "../components/post";
import Loading from "../components/loading";

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
      <MCHead title={title} description={description} />
      <div className="container mx-auto flex flex-col md:flex-row items-center my-2 md:my-2">
        <div className="flex flex-col w-full justify-center items-center pt-6 pb-12">
          <section className="">
            <div className="py-4 px-4 mx-auto max-w-screen-xl lg:py-3 lg:px-6">
              <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
                <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                  POSTS
                </h2>
                <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">
                  A collection of technical blog posts on various random topics
                </p>
              </div>
              <div className="grid gap-8 lg:grid-cols-2">
                {data.map((post: post) => (
                  <POST {...post} key={post.title} />
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
