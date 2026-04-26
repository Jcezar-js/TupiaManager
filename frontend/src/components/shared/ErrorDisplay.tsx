interface ErrorDisplayProps {
  errors: Record<string, string[]>;
}

export function ErrorDisplay({ errors }: ErrorDisplayProps) {
  if (!errors || Object.keys(errors).length === 0) {
    return null;
  }

  return (
    <div className="bg-red-50 border border-red-200 rounded p-4">
      {Object.entries(errors).map(([field, messages]) => (
        <div key={field} className="mb-2">
          <p className="text-sm font-medium text-red-600 capitalize">{field}</p>
          {messages.map((msg, idx) => (
            <p key={idx} className="text-sm text-red-500">
              • {msg}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}
