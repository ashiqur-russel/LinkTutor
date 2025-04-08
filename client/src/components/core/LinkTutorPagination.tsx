"use client";

import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";

const LinkTutorPagination = ({
  totalPage,
  basePath,
  pageName,
  onPageChange,
}: {
  totalPage: number;
  basePath?: string;
  pageName?: string;
  onPageChange?: (page: number) => void;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;
  const path = basePath || pathname;

  const goToPage = (page: number) => {
    if (onPageChange) {
      onPageChange(page);
    } else {
      const url = new URLSearchParams();
      url.set("page", String(page));

      // Only append pageName if it exists
      if (pageName) {
        url.set("pageName", pageName);
      }

      router.replace(`${path}?${url.toString()}`);
    }
  };

  return (
    <div className="flex gap-2 mt-2 justify-end items-center">
      <Button
        className="w-8 h-8"
        variant="outline"
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ArrowLeft />
      </Button>

      {[...Array(totalPage)].map((_, index) => {
        const page = index + 1;
        return (
          <Button
            key={index}
            className="w-8 h-8"
            variant={currentPage === page ? "default" : "outline"}
            onClick={() => goToPage(page)}
          >
            {page}
          </Button>
        );
      })}

      <Button
        className="w-8 h-8"
        variant="outline"
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPage}
      >
        <ArrowRight />
      </Button>
    </div>
  );
};

export default LinkTutorPagination;
