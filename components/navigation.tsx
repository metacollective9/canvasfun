import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="bg-slate-300 p-2 mt-0 w-full font-Playfair">
      <div className="container mx-auto flex flex-wrap items-center">
        <div className="flex w-full md:w-1/2 justify-center md:justify-start text-white font-extrabold">
          <a
            className="text-gray-800 no-underline hover:text-black hover:no-underline"
            href="/"
          >
            <span className="text-2xl pl-2">
                <img
                  src="https://cdn-images-1.medium.com/fit/c/64/64/1*dj1msIqe6GrX0RjsaTtm3A.png"
                  className="inline-block"
                  alt="Meta Collective"
                />
            </span>
          </a>
        </div>

        <div className="flex w-full pt-2 content-center justify-between md:w-1/2 md:justify-end">
          <ul className="list-reset flex justify-between flex-1 md:flex-none items-center">
            <li className="mr-3">
              <Link href="/colorpicker" className="inline-block py-2 px-4 text-black no-underline font-medium">
                Color Picker
              </Link>
            </li>
            <li className="mr-3">
              <Link href="/jsontoxlsx" className="inline-block py-2 px-4 text-black no-underline font-medium">
                JSON to XLSX
              </Link>
            </li>
            <li className="mr-3">
              <Link href="/posts" className="inline-block py-2 px-4 text-black no-underline font-medium">
                Posts
              </Link>
            </li>
          </ul>
        </div>
        
      </div>
      
    </nav>
  );
}
