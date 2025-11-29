interface JobDescriptionProps {
    text?: string;
  }
  
  export default function JobDescription({ text }: JobDescriptionProps) {
    if (!text) return null;
  
    return (
      <div className="mt-4">
        <h4 className="font-semibold mb-2">Description:</h4>
        <p className="mt-2">{text}</p>
      </div>
    );
  }
  