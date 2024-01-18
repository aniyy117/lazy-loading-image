import ImageRenderer from "@/components/ImageRenderer";

async function getData() {
  const res = await fetch(
    "https://picsum.photos/v2/list?page=2&limit=100&height=200"
  );

  return res.json();
}

export default async function Home() {
  const photos = await getData();

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
          <div className="flex mx-10" key={data.id}>
            <ImageRenderer
              url={data.download_url}
              thumb={data.download_url}
              // thumb={"/loading.webp"}
              width={300}
              height={100}
            />
          </div>
        ))}
    </main>
  );
}
