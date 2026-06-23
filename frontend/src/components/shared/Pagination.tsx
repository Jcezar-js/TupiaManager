import Box from '@mui/material/Box';
import MuiPagination from '@mui/material/Pagination';

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
      <MuiPagination
        page={page}
        count={totalPages}
        color="primary"
        onChange={(_, value) => onPageChange(value)}
      />
    </Box>
  );
}
