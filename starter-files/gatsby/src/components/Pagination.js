import React from 'react';
import Link from 'gatsby';

export default function Pagination({
  pageSize,
  totalCount,
  currentPage,
  skip,
  base,
}) {
  const totalPage = Math.ceil(totalCount / pageSize);
  return (
    <div>
      <Link to={`/${base}/${currentPage - 1}`} />
    </div>
  );
}
