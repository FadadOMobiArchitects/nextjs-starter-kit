import { LoaderIcon } from "lucide-react";

import { cn } from "@/lib/utils";

function Spinner({
  className,
  ...props
}: Readonly<React.ComponentProps<"svg">>) {
  return (
    <output>
      <LoaderIcon
        aria-label="Loading"
        className={cn("size-4 animate-spin", className)}
        {...props}
      />
    </output>
  );
}

export { Spinner };
