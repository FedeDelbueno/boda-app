import * as XLSX from "xlsx";

export function downloadExcel(filename, rows, columns, sheetName = "Datos") {
  const data = rows.map((row) => {
    const obj = {};
    columns.forEach((c) => {
      obj[c.label] = c.value(row);
    });
    return obj;
  });

  const worksheet = XLSX.utils.json_to_sheet(data, { header: columns.map((c) => c.label) });
  worksheet["!cols"] = columns.map((c) => ({ wch: Math.max(c.label.length + 2, 16) }));

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  XLSX.writeFile(workbook, filename);
}
