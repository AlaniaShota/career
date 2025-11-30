interface RequirementsListProps {
    requirements?: string[];
  }
  
  export default function RequirementsList({ requirements }: RequirementsListProps) {
    if (!requirements?.length) return null;
  
    return (
      <div className="mt-4">
        <h4 className="font-medium mb-2">Requirements:</h4>
        <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
          {requirements.map((req, i) => (
            <li key={i}>{req}</li>
          ))}
        </ul>
      </div>
    );
  }
  