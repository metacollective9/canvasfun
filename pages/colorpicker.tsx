import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../components/loading";
import fs from "fs";
import matter from "gray-matter";
import MD from "../components/md";

type Props = {
  readme?: any;
};

export default function ColorPicker({ readme }: Props) {
  const [file, setFile] = useState<any>(null);
  const [uploadingStatus, setUploadingStatus] = useState<boolean>(false);
  const [uploadedFile, setUploadedFile] = useState<any>();
  const [colour, setColour] = useState<string>("");
  const [hexColour, setHexColour] = useState<string>("");
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
      <div className="container mx-auto flex flex-col md:flex-row items-center my-2 md:my-2">
        <div className="flex flex-col w-full lg:w-1/3 justify-center items-start pt-12 pb-12">
          <h1 className="uppercase tracking-loose">Color picker</h1>
          <h3 className="">Pick exact color of a pixel</h3>
          <p className="leading-normal mb-4">
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
            <span
              className="box-content mt-2 p-2 border-2"
              style={{ backgroundColor: colour }}
            >
              <p>
                {hexColour} <br />
                HEX value of colour is copied in your clipboard
              </p>
            </span>
          )}
        </div>

        <div className="w-full lg:w-2/3 lg:py-6 text-center">
          {uploadingStatus && <Loading />}
          {!uploadingStatus && <canvas id="canvas"></canvas>}
        </div>
      </div>
      <hr />
      <div className="flex flex-col w-full justify-start items-start pt-12 pb-24">
        <MD {...readme[0]} />
      </div>
    </>
  );
}

export async function getStaticProps() {
  // get list of files from the posts folder
  const files = fs.readdirSync("readme");

  // get frontmatter & slug from each post
  const readme = files.map((fileName) => {
    const slug = fileName.replace(".md", "");
    const readFile = fs.readFileSync(`readme/${fileName}`, "utf-8");
    const { data: frontmatter, content } = matter(readFile);

    return {
      content,
      frontmatter,
    };
  });

  // Return the pages static props
  return {
    props: {
      readme,
    },
  };
}
