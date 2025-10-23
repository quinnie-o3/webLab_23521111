// src/data-service.ts

// TODO: Define structure for chart data [cite: 395]
export interface DataPoint {
  label: string; 
  value: number;  
  category: string; 
  date: string; 
}

// TODO: Define filtering options
export interface DataFilters {
  category?: string;
  startDate?: string;
  endDate?: string;
}

// Các hằng số để tạo dữ liệu giả
export const CATEGORIES = ['Electronics', 'Groceries', 'Apparel', 'Books'];

// Mảng màu để vẽ biểu đồ tròn (Pie Chart)
export const CHART_COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'];


function getRandomCategory(): string {
  return CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
}

function getRandomDate(): string {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setMonth(endDate.getMonth() - 6);
  
  const randomTime = startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime());
  return new Date(randomTime).toISOString();
}

/**
 * TODO: Method to generate mock data
 * @param count
 * @returns
 */
export function generateMockData(count: number = 8): DataPoint[] {
  const data: DataPoint[] = [];
  for (let i = 0; i < count; i++) {
    data.push({
      label: `Product ${i + 1}`,
      value: Math.floor(Math.random() * 5000) + 500,
      category: getRandomCategory(),
      date: getRandomDate(),
    });
  }
  return data;
}

/**
 * TODO: Method to simulate real-time updates
 * @returns 
 */
export function generateRandomDataPoint(): DataPoint {
  const newIndex = Math.floor(Math.random() * 50) + 10;
  return {
    label: `Product ${newIndex}`,
    value: Math.floor(Math.random() * 5000) + 500,
    category: getRandomCategory(),
    date: new Date().toISOString(), // Dữ liệu mới có ngày là hiện tại
  };
}


/**
 * TODO: Method to filter data by category/date
 * @param data 
 * @param filters 
 * @returns 
 */
export function filterData(data: DataPoint[], filters: DataFilters): DataPoint[] {
  return data.filter(point => {
    // 1. Lọc theo danh mục
    if (filters.category && filters.category !== 'all' && point.category !== filters.category) {
      return false;
    }
    // 2. Lọc theo ngày bắt đầu (so sánh chuỗi ISO)
    if (filters.startDate && point.date < filters.startDate) {
      return false;
    }
    // 3. Lọc theo ngày kết thúc
    if (filters.endDate && point.date > filters.endDate) {
      return false;
    }
    return true;
  });
}

export function drawPieSlice(
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  radius: number,
  startAngle: number,
  endAngle: number,
  color: string
) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  ctx.arc(centerX, centerY, radius, startAngle, endAngle);
  ctx.closePath();
  ctx.fill();
}