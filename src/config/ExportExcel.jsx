import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export const exportExcel = (data, name) => {
  console.log(data);
  // Bước 1: Chuyển đổi dữ liệu thành workbook
  const worksheet = XLSX.utils.json_to_sheet(data); // Chuyển đổi dữ liệu JSON thành sheet
  const workbook = XLSX.utils.book_new(); // Tạo workbook mới
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1'); // Thêm sheet vào workbook

  // Bước 2: Xuất workbook ra file Excel dưới dạng binary
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

  // Bước 3: Tạo Blob từ buffer và tự động tải về file Excel
  const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  saveAs(blob, `${name}.xlsx`);
};
