"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { useEffect, useLayoutEffect, useTransition } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

type Props = {
  page: number;
  dataCount: number;
  currentItemsCount: number;
  itemsPerPage?: number;
  className?: string;
  selectedCount?: number;
  hasSelect?: boolean;
  isPageAdd?: boolean;
  isLong?: boolean;
};

export default function ServerPagination({
  page,
  dataCount,
  itemsPerPage = 10,
  currentItemsCount,
  className,
  selectedCount = 0,
  hasSelect = false,
  isPageAdd = false,
  isLong = false,
}: Readonly<Props>) {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const params = new URLSearchParams(searchParams?.toString());
    if (!currentItemsCount && page !== 1) {
      params.delete("page");
      replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
  }, [page, currentItemsCount, pathname, replace, searchParams]);

  // Effect to add page and size parameters to URL when isPageAdd is true
  useEffect(() => {
    if (isPageAdd) {
      const params = new URLSearchParams(searchParams?.toString());

      // Always show page parameter when isPageAdd is true
      params.set("page", String(page));

      // Always show size parameter when isPageAdd is true
      params.set("size", String(itemsPerPage));

      // Only update if URL doesn't already have these parameters with correct values
      const currentPage = params.get("page");
      const currentSize = params.get("size");

      if (
        currentPage !== String(page) ||
        currentSize !== String(itemsPerPage)
      ) {
        replace(`${pathname}?${params.toString()}`, { scroll: false });
      }
    }
  }, [isPageAdd, page, itemsPerPage, pathname, replace, searchParams]);

  const totalPages = Math.ceil(dataCount / itemsPerPage);
  const hasNextPage = page < totalPages;
  const hasPreviousPage = page > 1;
  const startItem = (page - 1) * itemsPerPage + 1;
  const endItem = Math.min(page * itemsPerPage, dataCount);

  const navigateToPage = (newPageNumber: number) => {
    if (newPageNumber < 1 || newPageNumber > totalPages) return;

    startTransition(() => {
      const params = new URLSearchParams(searchParams?.toString());

      if (isPageAdd) {
        // When isPageAdd is true, always show page parameter
        params.set("page", String(newPageNumber));
      } else if (newPageNumber === 1 && params.has("page")) {
        // Original behavior: remove page=1, set others
        params.delete("page");
      } else {
        params.set("page", String(newPageNumber));
      }

      replace(`${pathname}?${params.toString()}`, { scroll: false });
    });
  };

  return (
    <div
      className={cn(
        "flex sm:flex-row flex-col-reverse gap-y-3 gap-x-2 items-center justify-between",
        className
      )}
    >
      <div className="text-muted-foreground flex-1 text-sm">
        {hasSelect ? (
          <>
            {selectedCount} sur {dataCount} ligne(s) sélectionnée(s).
          </>
        ) : (
          <>
            Affichage de {startItem} à {endItem || 10} sur {dataCount}{" "}
            résultats.
          </>
        )}
      </div>

      <div className="flex sm:flex-row flex-col-reverse gap-y-3 items-center space-x-6 lg:space-x-8">
        {/* Items Per Page Selector */}
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Lignes par page</p>
          <PageSizeSelector
            pageSize={itemsPerPage}
            isPageAdd={isPageAdd}
            isLong={isLong}
          />
        </div>

        {/* Page Info */}
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {page} sur {totalPages || 1}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            className="hidden size-8 lg:flex shadow-none bg-white"
            onClick={() => navigateToPage(1)}
            disabled={!hasPreviousPage || isPending}
          >
            <span className="sr-only">Aller à la première page</span>
            <ChevronsLeft />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="size-8 shadow-none bg-white"
            onClick={() => navigateToPage(page - 1)}
            disabled={!hasPreviousPage || isPending}
          >
            <span className="sr-only">Aller à la page précédente</span>
            <ChevronLeft />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="size-8 shadow-none bg-white"
            onClick={() => navigateToPage(page + 1)}
            disabled={!hasNextPage || isPending}
          >
            <span className="sr-only">Aller à la page suivante</span>
            <ChevronRight />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="hidden size-8 lg:flex shadow-none bg-white"
            onClick={() => navigateToPage(totalPages)}
            disabled={!hasNextPage || isPending}
          >
            <span className="sr-only">Aller à la dernière page</span>
            <ChevronsRight />
          </Button>
        </div>
      </div>
    </div>
  );
}

function PageSizeSelector({
  pageSize = 10,
  isPageAdd = false,
  isLong = false,
}: Readonly<{
  pageSize?: number;
  isPageAdd?: boolean;
  isLong?: boolean;
}>) {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const pageSizeOptions = isLong
    ? [100, 200, 300, 400, 500]
    : [10, 20, 30, 40, 50];

  useLayoutEffect(() => {
    const params = new URLSearchParams(searchParams?.toString());
    if (
      pageSize < 10 ||
      pageSize > 500 ||
      !pageSizeOptions.includes(pageSize)
    ) {
      params.delete("size");
      replace(`${pathname}?${params.toString()}`, { scroll: false });
    } else if (isPageAdd) {
      // When isPageAdd is true, always show size parameter
      params.set("size", String(pageSize));
      replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
  }, [pageSize, pathname, replace, searchParams, isPageAdd]);

  const navigateToPage = (pageSize: number) => {
    if (pageSize < 10 || pageSize > 500) return;

    startTransition(() => {
      const params = new URLSearchParams(searchParams?.toString());

      params.set("size", String(pageSize));

      replace(`${pathname}?${params.toString()}`, { scroll: false });
    });
  };

  return (
    <Select
      disabled={isPending}
      value={`${pageSize}`}
      onValueChange={(value) => {
        navigateToPage(Number(value));
      }}
    >
      <SelectTrigger
        className={cn(
          "!h-8 w-[70px] shadow-none bg-white",
          isLong && "w-[80px]"
        )}
      >
        <SelectValue placeholder={pageSize} />
      </SelectTrigger>
      <SelectContent side="top">
        {pageSizeOptions.map((size) => (
          <SelectItem key={size} value={`${size}`}>
            {size}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
