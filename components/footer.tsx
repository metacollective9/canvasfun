import Container from "./container";
import ThemeSwitch from "./themeSwitch";

type footerProps = {
  copyright?: string;
};

export default function Footer(props:footerProps) {
  return (
    <Container className="mt-10 border-t border-gray-100 dark:border-gray-800">
      <div className="text-sm text-center">
        Copyright © {new Date().getFullYear()} {props?.copyright}. All
        rights reserved.
      </div>
      <div className="mt-1 text-sm text-center text-gray-400 dark:text-gray-600">
        Made by{" "}
        {/*  // ** 🙏  Can I ask you a favor? 🙏 **
            // Please do not remove the below link.
           // It helps us to grow & continue our work. Thank you.
          // OR contact hello@web3templates.com for commercial license.  */}
        <a
          href="https://www.web3templates.com/?ref=stablo-template"
          rel="noopener"
          target="_blank">
          Web3Templates
        </a>
        <div>
        <ThemeSwitch />
        </div>
      </div>
    </Container>
  );
}
