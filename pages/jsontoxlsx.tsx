import Editor, { Monaco } from "@monaco-editor/react";
import { useRef, useState } from "react";
import MCHead from "../components/head";
import Alert, { alertProps } from "../components/alert";
import axios from "axios";
import ProcessingButton from "../components/processingButton";
import MD from "../components/md";
import fs from "fs";
import matter from "gray-matter";

const title = "MetaCollective JSON to XLSX";
const description = "Convert JSON data to XLSX";
const defaultValue = { foo: "bar" };

type Props = {
  readme?: any;
};

export default function JSONtoXLSX({ readme }: Props) {
  const editorRef = useRef(null);

  const [editorValue, setEditorValue] = useState<string>(
    JSON.stringify(defaultValue)
  );
  const [showMessage, setShowMessage] = useState<boolean>(false);

  const [message, setMessage] = useState<alertProps>({
    message: "",
    title: "",
    type: "",
  });
  const [processing, setProcessing] = useState<boolean>(false);

  const handleEditorDidMount = (editor: any, monaco: Monaco) => {
    editorRef.current = editor;
  };

  const onChange = async (newValue: any) => {
    if (editorValue) setEditorValue(newValue || "");
  };

  const convertToXLSX = async () => {
    try {
      JSON.parse(editorValue);
    } catch (e) {
      setMessage({
        type: "error",
        title: "Error",
        message: "Please enter valid JSON string",
      });
      setShowMessage(true);
      return;
    }

    try {
      setProcessing(true);
      let { data } = await axios.post(
        "https://8n88fd0iz7.execute-api.eu-west-1.amazonaws.com/dev/djsontoxlsx",
        {
          data: editorValue,
        }
      );
      window.location.assign(data.result.downloadURL);
      setMessage({
        type: "success",
        title: "XLSX",
        message: `Conversion to XLSX was sucessfull, Please check your download folder.`,
      });
      setShowMessage(true);
      setProcessing(false);
    } catch (error) {
      setMessage({
        type: "error",
        title: "Error",
        message: "Something went wrong while converting to xlsx",
      });
      setShowMessage(true);
      setProcessing(false);
    }
  };

  return (
    <>
      <MCHead title={title} description={description} />
      <div className="container mx-auto flex flex-col md:flex-row items-center my-2 md:my-2">
        <div className="flex flex-col w-full justify-center items-center pt-6 pb-12">
          {showMessage && <Alert {...message} />}
          <section>
            <div className="py-4 px-4 mx-auto max-w-screen-xl lg:py-3 lg:px-6">
              <div className="mx-auto max-w-screen-sm text-center lg:mb-8 mb-4">
                <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                  JSON to XLSX
                </h2>
                <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">
                  Paste JSON data in the editor below and press the covert
                  button
                </p>
              </div>
              <div className="py-4 px-4 mx-auto max-w-screen-xl lg:py-3 lg:px-6">
                <Editor
                  height="60vh"
                  width="50vw"
                  theme="vs-dark"
                  defaultLanguage="json"
                  defaultValue={JSON.stringify(defaultValue)}
                  onMount={handleEditorDidMount}
                  onChange={onChange}
                />
              </div>
              <div className="py-4 px-4 mx-auto max-w-screen-xl lg:py-2 lg:px-6">
                {!processing && (
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded float-right"
                    onClick={convertToXLSX}
                  >
                    Convert to XLSX
                  </button>
                )}
                {processing && <ProcessingButton message="Processing..." />}
              </div>
            </div>
          </section>
        </div>
      </div>
      <hr />
      <div className="container mx-auto pt-12 md:pt-2 px-6">
        <MD {...readme[0]} />
      </div>
    </>
  );
}

export async function getStaticProps() {
  // get list of files from the posts folder
  const files = fs.readdirSync("readme");
  const readFile = fs.readFileSync(`readme/jsontoxlsx.md`, "utf-8");
  const { data: frontmatter, content } = matter(readFile);

  // Return the pages static props
  return {
    props: {
      readme: [{ frontmatter, content }],
    },
  };
}
