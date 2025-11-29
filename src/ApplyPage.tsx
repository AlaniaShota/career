import { useSearchParams } from "react-router-dom";
import { useState } from "react";

export default function ApplyPage() {
  const [params] = useSearchParams();

  const jobId = params.get("jobId");
  const title = params.get("title");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cover, setCover] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      jobId,
      title,
      name,
      email,
      coverLetter: cover,
    };

    console.log("Submitting:", payload);

    // тут можешь отправлять на API
    alert("Application submitted!");
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Apply for: {title}</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        <label className="flex flex-col">
          <span className="font-semibold">Full Name</span>
          <input
            type="text"
            className="border p-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label className="flex flex-col">
          <span className="font-semibold">Email</span>
          <input
            type="email"
            className="border p-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label className="flex flex-col">
          <span className="font-semibold">Cover Letter</span>
          <textarea
            className="border p-2 rounded"
            rows={4}
            value={cover}
            onChange={(e) => setCover(e.target.value)}
          />
        </label>

        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Send Application
        </button>
      </form>
    </div>
  );
}
