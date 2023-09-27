import React from "react";
import { PageItem } from "./style";

interface PaginationItemProps {
  page?: number;
  className?: string;
  onClick?: any;
}

const PaginationItem: React.FC<PaginationItemProps> = ({
  page,
  className,
  onClick,
}) => {
  return (
    <PageItem className={className} onClick={onClick}>
      {page}
    </PageItem>
  );
};

export default PaginationItem;
