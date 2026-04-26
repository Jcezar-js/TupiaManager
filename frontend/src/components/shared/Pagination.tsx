import { Pagination as BsPagination } from 'react-bootstrap';

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  return (
    <div className="d-flex justify-content-center mt-3">
      <BsPagination>
        <BsPagination.Prev onClick={() => onPageChange(page - 1)} disabled={page <= 1} />
        <BsPagination.Item active>{page}</BsPagination.Item>
        <BsPagination.Next onClick={() => onPageChange(page + 1)} disabled={page >= totalPages} />
      </BsPagination>
    </div>
  );
}
