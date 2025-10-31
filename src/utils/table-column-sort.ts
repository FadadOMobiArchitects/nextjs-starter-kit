import { SortingFn } from "@tanstack/react-table";

// Case-insensitive, locale-aware sorting function registered once here and reused via defaultColumn
export const caseInsensitiveText: SortingFn<any> = (rowA, rowB, columnId) => {
  const a = rowA.getValue(columnId);
  const b = rowB.getValue(columnId);

  if (a == null && b == null) return 0;
  if (a == null) return 1; // push empty values to bottom
  if (b == null) return -1;

  // If both numeric, keep fast numeric compare
  if (typeof a === "number" && typeof b === "number") {
    if (a === b) {
      return 0;
    } else if (a < b) {
      return -1;
    } else {
      return 1;
    }
  }

  // Compare as strings (numeric:true handles numbers inside strings)
  return String(a)
    .toLocaleLowerCase()
    .localeCompare(String(b).toLocaleLowerCase(), undefined, {
      numeric: true,
      sensitivity: "base",
    });
};
