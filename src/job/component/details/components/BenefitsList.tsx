export default function BenefitsList({ benefits }: { benefits?: string[] }) {
    if (!benefits || benefits.length === 0) return null;
  
    return (
      <div className="mt-4">
        <h4 className="font-medium text-gstore-midnight mb-2">Benefits:</h4>
        <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
          {benefits.map((benefit, index) => (
            <li key={index}>{benefit}</li>
          ))}
        </ul>
      </div>
    );
  }
  