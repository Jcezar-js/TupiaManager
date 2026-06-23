import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface ErrorDisplayProps {
  errors: Record<string, string[]>;
}

export function ErrorDisplay({ errors }: ErrorDisplayProps) {
  if (!errors || Object.keys(errors).length === 0) {
    return null;
  }

  return (
    <Alert severity="error" sx={{ mb: 2 }}>
      {Object.entries(errors).map(([field, messages]) => (
        <Box key={field} sx={{ mb: 0.5 }}>
          <Typography variant="body2" sx={{ fontWeight: 600, textTransform: 'capitalize' }}>
            {field}
          </Typography>
          {messages.map((msg, idx) => (
            <Typography key={idx} variant="caption" component="p">
              • {msg}
            </Typography>
          ))}
        </Box>
      ))}
    </Alert>
  );
}
