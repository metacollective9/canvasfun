import React from "react";
import { Disclosure } from "@headlessui/react";
import Container from "./container";
import Link from "next/link";
import Image from "next/image";
import { myLoader } from "../utils/all";

export default function Navigation() {
  const leftmenu = [
    {
      label: "Home",
      href: "/",
      external: false
    },
    {
      label: "Color Picker",
      href: "/colorpicker",
      external: false
    },
    {
      label: "JSON to XLSX",
      href: "/jsontoxlsx",
      external: false
    }
  ];

  const rightmenu = [
    
    {
      label: "Github",
      href: "https://github.com/metacollective9",
      external: true
    },
    {
      label: "Medium",
      href: "https://medium.com/@metacollective",
      external: true
    }
  ];

  const mobilemenu = [...leftmenu, ...rightmenu];

  return (
    <Container>
      <nav>
        <Disclosure>
          {({ open }) => (
            <>
              <div className="flex flex-wrap justify-between md:gap-10 md:flex-nowrap">
                <div className="flex-col items-center justify-start order-1 hidden w-full md:flex md:flex-row md:justify-end md:w-auto md:order-none md:flex-1">
                  {leftmenu.map((item, index) => (
                    // <Link href={item.href} key={index} className="px-5 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-blue-500">
                      <a href={item.href} className="px-5 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-blue-500" key={index}> 
                        {item.label}
                      </a>
                    // </Link>
                  ))}
                </div>
                <div className="flex justify-between w-full md:w-auto">
                  <Link href="/" className="w-28 dark:hidden">
                    {/* <a className="w-28 dark:hidden"> */}
                      <Image
                        className="dark:hidden"
                        src="https://cdn-images-1.medium.com/1*dj1msIqe6GrX0RjsaTtm3A.png"
                        alt="logo"
                        width={64}
                        height={64}
                        loader={myLoader}
                        unoptimized={true}
                      />
                    {/* </a> */}
                  </Link>
                  <Link href="/" className="hidden w-28 dark:block">
                    {/* <a className="hidden w-28 dark:block"> */}
                      <Image
                        className="hidden dark:block"
                        src="https://cdn-images-1.medium.com/1*dj1msIqe6GrX0RjsaTtm3A.png"
                        alt="logo"
                        width={64}
                        height={64}
                        loader={myLoader}
                        unoptimized={true}
                      />
                    {/* </a> */}
                  </Link>
                  <Disclosure.Button
                    aria-label="Toggle Menu"
                    className="px-2 py-1 ml-auto text-gray-500 rounded-md md:hidden focus:text-blue-500 focus:outline-none dark:text-gray-300 ">
                    <svg
                      className="w-6 h-6 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24">
                      {open && (
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                        />
                      )}
                      {!open && (
                        <path
                          fillRule="evenodd"
                          d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                        />
                      )}
                    </svg>
                  </Disclosure.Button>
                </div>

                <div className="flex-col items-center justify-start order-2 hidden w-full md:flex md:flex-row md:w-auto md:flex-1 md:order-none">
                  {rightmenu.map((item, index) => (
                    // <Link href={item.href} key={index} className="px-5 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-blue-500">
                      <a
                        href={item.href}
                        key={index}
                        className="px-5 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-blue-500"
                        target={item.external ? "_blank" : ""}
                        rel={item.external ? "noopener" : ""}>
                        {item.label}
                      </a>
                    // </Link>
                  ))}
                </div>
              </div>
              <Disclosure.Panel>
                <div className="flex flex-col items-center justify-start order-2 w-full md:hidden">
                  {mobilemenu.map((item, index) => (
                    <Link href={item.href} key={index} className="px-5 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-blue-500">
                      {/* <a
                        className="px-5 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-blue-500"
                        //target={item.external ? "_blank" : ""}
                        //rel={item.external ? "noopener" : ""}
                      > */}
                        {item.label}
                      {/* </a> */}
                    </Link>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </nav>
    </Container>
  );
}
