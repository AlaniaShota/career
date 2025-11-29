interface JobSkillsProps {
    skills: string[];
  }
  
  export default function JobSkills({ skills }: JobSkillsProps) {
    if (!skills?.length) return null;
  
    return (
      <div className="mt-2 flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm"
          >
            {skill}
          </span>
        ))}
      </div>
    );
  }
  