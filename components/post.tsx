export type post = {
  title: string;
  description: string;
  readtime: string;
  tag: string;
  url: string;
  image: string;
};

import Image from "next/image";
import Link from "next/link";
import { cx } from "../utils/all";
import { PhotoIcon } from "@heroicons/react/24/outline";
import Label from "./ui/label";

export function POST({ ...post }: post) {
  return (
    <>
      <div className="cursor-pointer link-effect">
        <div
          className={cx(
            "relative overflow-hidden transition-all bg-gray-100 rounded-md dark:bg-gray-800   hover:scale-105", "aspect-video"
          )}>
          <a href={post.url} target="_blank">
              {post?.image ? (
                <Image
                  src={post?.image}
                  loader={() => post?.image} 
                  blurDataURL={post?.image}
                  alt={"Thumbnail"}
                  placeholder="blur"
                  unoptimized={true}
                  fill={true}
                  className="transition-all"
                />
              ) : (
                <span className="absolute w-16 h-16 text-gray-200 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                  <PhotoIcon />
                </span>
              )}
          </a>
        </div>
        <Label color="pink">{post.tag}</Label>
        <h2 className="mt-2 text-lg font-semibold tracking-normal text-brand-primary dark:text-white">
          <Link href={post.url}>
            <span className="link-underline link-underline-blue">
              {post.title}
            </span>
          </Link>
        </h2>

        <div>
          {post.description && (
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 line-clamp-3">
              <Link href={post.url}>
                {post.description}
              </Link>
            </p>
          )}
        </div>

        <div className="flex items-center mt-3 space-x-3 text-gray-500 dark:text-gray-400">
          <span className="text-xs text-gray-300 dark:text-gray-600">
            &bull;
          </span>
        </div>
      </div>
    </>
  );
}
