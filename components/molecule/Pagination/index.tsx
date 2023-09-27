import React from "react";
import PaginationItem from "@/components/atom/PaginationItem";
import { PaginationContainer } from "./style";

interface Paginationrops {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<Paginationrops> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <PaginationContainer>
      {pages.map((page) => (
        <PaginationItem
          key={page}
          page={page}
          className={page === currentPage ? "active" : ""}
          onClick={() => onPageChange(page)}
        />
      ))}
    </PaginationContainer>
  );
};

export default Pagination;
