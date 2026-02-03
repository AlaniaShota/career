import notFound from "../assets/Gemini_Generated_Image_x7co30x7co30x7co.png";
export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gstore-midnight text-white">
      <img
        src={notFound}
        alt="Not Found"
        className="w-full object-contain rounded-2xl md:w-2/5"
      />
    </div>
  );
}
