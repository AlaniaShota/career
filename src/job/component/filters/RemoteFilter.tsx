interface Props {
    remoteOnly: boolean;
    onChange: (v: boolean) => void;
  }
  
  export default function RemoteFilter({ remoteOnly, onChange }: Props) {
    return (
      <div className="flex items-center justify-between">
        <span className="text-sm">Remote only</span>
        <button
          onClick={() => onChange(!remoteOnly)}
          className={`w-12 h-6 rounded-full p-1 transition ${
            remoteOnly ? "bg-[var(--color-gstore-blue)]" : "bg-gray-300"
          }`}
        >
          <span
            className={`block h-4 w-4 bg-white rounded-full shadow transition ${
              remoteOnly ? "translate-x-6" : "translate-x-0"
            }`}
          />
        </button>
      </div>
    );
  }
  