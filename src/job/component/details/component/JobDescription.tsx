interface JobDescriptionProps {
  text?: string;
}

export default function JobDescription({ text }: JobDescriptionProps) {
  if (!text) return null;

  const paragraphs = text.split('. ').filter(Boolean);

  return (
    <div className="mt-4">
      <h4 className="font-semibold mb-2">Description:</h4>
      <div className="flex flex-col gap-2 max-h-[300px] overflow-y-auto scroll-smooth hide-scroll">
        {paragraphs.map((p, index) => (
          <p key={index} className="text-gray-700">
            {p}.
          </p>
        ))}
      </div>
    </div>
  );
}
