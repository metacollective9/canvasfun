import axios from "axios";
import { useEffect, useState } from "react";

export default function FileUpload() {
  const [file, setFile] = useState<any>(null);
  const [uploadingStatus, setUploadingStatus] = useState<boolean>(false);

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

    //setUploadedFile(process.env.BUCKET_URL + file.name);
    setUploadingStatus(false);
    setFile(null);
  };

  useEffect(() => {
    if (file) {
      const uploadedFileDetail = async () => await uploadFile();
      uploadedFileDetail();
    }
  }, [file]);

  return (
    <input
      type="file"
      className="bg-transparent hover:bg-slate-900 text-gray-900 hover:text-white rounded shadow hover:shadow-lg py-2 px-4 border border-gray-900 hover:border-transparent"
      accept="image/*"
      name="image"
      id="select-image"
      onChange={(e: any) => setFile(e.target.files[0])}
    />
  );
}
