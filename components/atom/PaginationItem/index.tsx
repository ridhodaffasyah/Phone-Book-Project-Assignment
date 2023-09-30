import React from "react";
import { PageItem } from "./style";
import { PaginationItemProps } from "@/utils/interface";

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
