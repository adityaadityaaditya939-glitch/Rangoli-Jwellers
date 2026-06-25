import * as XLSX from "xlsx";

export function toCsv<T extends Record<string, unknown>>(rows: T[]) {
  if (rows.length === 0) {
    return "";
  }
  const headers = Object.keys(rows[0]);
  const lines = [
    headers.join(","),
    ...rows.map((row) =>
      headers
        .map((key) => {
          const value = row[key];
          const str = value == null ? "" : String(value);
          if (str.includes(",") || str.includes('"') || str.includes("\n")) {
            return `"${str.replace(/"/g, '""')}"`;
          }
          return str;
        })
        .join(","),
    ),
  ];
  return lines.join("\n");
}

export function toExcelBuffer<T extends Record<string, unknown>>(rows: T[], sheetName: string) {
  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  return XLSX.write(workbook, { type: "buffer", bookType: "xlsx" }) as Buffer;
}
