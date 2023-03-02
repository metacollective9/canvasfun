import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../components/loading";
import fs from "fs";
import matter from "gray-matter";
import MD from "../components/md";
import MCHead from "../components/head";
import { NextSeo } from "next-seo";
import Container from "../components/container";

type Props = {
  readme?: any;
};

export default function ColorPicker({ readme }: Props) {
  const [file, setFile] = useState<any>(null);
  const [uploadingStatus, setUploadingStatus] = useState<boolean>(false);
  const [uploadedFile, setUploadedFile] = useState<any>();
  const [colour, setColour] = useState<string>("");
  const [hexColour, setHexColour] = useState<string>("");
  const title = "Color Picker";
  const description = "Pick colour from an image";
  let canvas: HTMLCanvasElement;
  let data: Uint8ClampedArray;

  useEffect(() => {
    if (file) {
      const uploadedFileDetail = async () => await uploadFile();
      uploadedFileDetail();
    }

    navigator.clipboard.writeText(hexColour.toString());
  }, [file, hexColour]);

  const uploadFile = async () => {
    setUploadingStatus(true);

    let { data } = await axios.post("/api/s3/upload", {
      name: `canvasfun/${file.name}`,
      type: file.type,
    });

    const url = data.url;
    await axios.put(url, file, {
      headers: {
        "Content-type": file.type,
        "Access-Control-Allow-Origin": "*",
      },
    });

    setUploadedFile(process.env.BUCKET_URL + file.name);
    setUploadingStatus(false);
    setFile(null);

    loadFile(
      `https://d3owavb6pntfxw.cloudfront.net/fit-in/900x900/canvasfun/${file.name}`
    );
  };

  const loadFile = (url: string) => {
    let img = new (window as any).Image();
    img.crossOrigin = `Anonymous`;
    img.src = url;

    setFile(null);

    img.onload = function () {
      canvas = document.getElementById("canvas") as HTMLCanvasElement;
      canvas.width = img.width;
      canvas.height = img.height;
      let ctx: CanvasRenderingContext2D = canvas.getContext(
        "2d"
      ) as CanvasRenderingContext2D;
      ctx.drawImage(img, 0, 0);

      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      data = imgData.data;
      canvas.addEventListener("mousemove", (ev) => {
        //as the mouse moves around the image
        let cols = canvas.width;
        let { offsetX, offsetY } = ev;
        //call the method to get the r,g,b,a values for current pixel
        let c = extractPixelColor(cols, offsetY, offsetX);
        //build a colour string for css
        let clr = `rgb(${c.red}, ${c.green}, ${c.blue})`; //${c.alpha / 255}

        setColour(clr);
        setHexColour(
          `#${[c.red, c.green, c.blue]
            .map((x) => x.toString(16).padStart(2, "0"))
            .join("")}`
        );
      });
    };
  };

  //cols: Width of the image representing total number of columns
  //x: Row position of this pixel
  //y: Column position of this pixel
  const extractPixelColor = (cols: number, x: number, y: number) => {
    //To get the exact pixel, the logic is to multiply total columns in this image with the row position of this pixel and then add the column position of this pixed
    let pixel = cols * x + y;
    //To get the array position in the entire image data array, simply multiply your pixel position by 4 (since each pixel will have its own r,g,b,a in that order)
    let position = pixel * 4;
    //the rgba value of current pixel will be the following
    return {
      red: data[position],
      green: data[position + 1],
      blue: data[position + 2],
      alpha: data[position + 3],
    };
  };

  return (
    <>
      <NextSeo
        title={`Blog — ${title}`}
        description={description || ""}
        canonical={"https://tools.meta-collective.co.uk/colorpicker"}
        openGraph={{
          url: "https://tools.meta-collective.co.uk/colorpicker",
          title: `Blog — ${title}`,
          description: description || "",
          images: [
            {
              url: "",
              width: 800,
              height: 600,
              alt: "",
            },
          ],
          site_name: "Web3Forms",
        }}
        twitter={{
          cardType: "summary_large_image",
        }}
      />
      <Container>
        <h1 className="text-3xl font-semibold tracking-tight text-center lg:leading-snug text-brand-primary lg:text-4xl dark:text-white">
          Color picker
        </h1>
        <div className="grid text-center content-center">
          <p className="mt-2 text-lg">
            Simply upload an image and start picking
          </p>
          <input
            type="file"
            className="bg-transparent hover:bg-slate-900 text-gray-900 hover:text-white rounded shadow hover:shadow-lg py-2 px-4 border border-gray-900 hover:border-transparent"
            accept="image/*"
            name="image"
            id="select-image"
            onChange={(e: any) => setFile(e.target.files[0])}
          />
          {colour.length > 0 && (
            <div
              className="box-content mt-2 p-2 border-2"
              style={{ backgroundColor: colour }}
            >
              <p>
                {hexColour} <br />
                HEX value of colour is copied in your clipboard
              </p>
            </div>
          )}
        </div>

        <div className="md:w-full lg:w-2/3 lg:py-6 text-center">
          {uploadingStatus && <Loading />}
          {!uploadingStatus && <canvas id="canvas"></canvas>}
        </div>
        <hr />
        <MD {...readme[0]} />
      </Container>
    </>
  );
}

export async function getStaticProps() {
  // get list of files from the posts folder
  const files = fs.readdirSync("readme");
  const readFile = fs.readFileSync(`readme/colorpicker.md`, "utf-8");
  const { data: frontmatter, content } = matter(readFile);

  // Return the pages static props
  return {
    props: {
      readme: [{ frontmatter, content }],
    },
  };
}
