
import secondEmployee from "/public/fast-ink-y43tNhAVDNs-unsplash.png";
import thirdEmployee from "/public/irvan-maulana-_vBQVlMR4rg-unsplash.png";
import fourthEmployee from "/public/karacis-studio-TFQIyR8-lDI-unsplash.png";

export default function Employees() {
  const employersData = [
    {
      id: 1,
      name: "Giorgi Beridze",
      post: "Lead Developer",
      img: secondEmployee,
    },
    {
      id: 2,
      name: "Nino Kapanadze",
      post: "UX Designer",
      img: thirdEmployee,
    },
    {
      id: 3,
      name: "Shota Alania",
      post: "Web Developer",
      img: fourthEmployee,
    },
  ];

  return (
    <div className="flex flex-row w-full justify-around my-18 text-soft-silver">
      {employersData.map((item) => (
        <div
          key={item.id}
          className="rounded-2xl flex flex-wrap flex-row justify-center items-start w-2xs"
        >
          <img
            src={item.img}
            alt={item.name}
            className="w-full rounded-2xl object-cover "
          />
          <div className="flex justify-start flex-col items-center mt-6">
            <h1 className="text-2xl">{item.name}</h1>
            <p className="text-ms">{item.post}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
