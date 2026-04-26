interface ErrorDisplayProps {
  errors: Record<string, string[]>;
}

export function ErrorDisplay({ errors }: ErrorDisplayProps) {
  if (!errors || Object.keys(errors).length === 0) {
    return null;
  }

  return (
    <div className="alert alert-danger py-2">
      {Object.entries(errors).map(([field, messages]) => (
        <div key={field}>
          <p className="mb-0 fw-semibold text-capitalize">{field}</p>
          {messages.map((msg, idx) => (
            <p key={idx} className="mb-0 small">
              • {msg}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}
