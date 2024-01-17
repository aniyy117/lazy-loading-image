"use client";

import ImageRenderer from "@/components/ImageRenderer";
import { useEffect, useState } from "react";

export default function Home() {
  const [photos, setPhotos] = useState(null);

  useEffect(() => {
    fetch("https://picsum.photos/v2/list?page=2&limit=100&height=200")
      .then((res) => res.json())
      .then((data) => setPhotos(data));
  }, []);


  return (
    <main>
      {/* {photos &&
        photos.map((data) => (
          <img
          key={data.id}
          src={data.download_url}
          // thumb={data.download_url}
          width={data.width}
          height={data.height}
          />
        ))} */}
      {photos &&
        photos.map((data) => (
          <ImageRenderer
            key={data.id}
            url={data.download_url}
            thumb={data.download_url}
            width={300}
            height={100}
          />
        ))}
    </main>
  );
}
