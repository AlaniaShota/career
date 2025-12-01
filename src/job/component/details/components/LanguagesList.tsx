export default function LanguagesList({ languages }: { languages?: string[] }) {
    if (!languages || languages.length === 0) return null;
  
    return (
      <div className="mt-4">
        <h4 className="font-medium mb-2">Languages:</h4>
        <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
          {languages.map((lang, index) => (
            <li key={index}>{lang}</li>
          ))}
        </ul>
      </div>
    );
  }
  