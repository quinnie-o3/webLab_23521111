/** @jsx createElement */
import { createElement, VNode, ComponentProps } from './jsx-runtime';
import { DataPoint, drawPieSlice } from './data-service';


// TODO: Define props for chart component
export interface ChartProps extends ComponentProps {
  data: DataPoint[];
  type: 'bar' | 'line' | 'pie'; // Các loại biểu đồ
}


// TODO: Implement drawing functions:

//1. Vẽ biểu đồ cột
function drawBarChart(ctx: CanvasRenderingContext2D, data: DataPoint[]) {
  const { width, height } = ctx.canvas;
  if (!data || data.length === 0) return;

  const barWidth = width / data.length - 10; // 10 là khoảng cách
  const maxValue = Math.max(...data.map(d => d.value));
  ctx.fillStyle = '#36A2EB'; 

  data.forEach((d, i) => {
    const barHeight = (d.value / maxValue) * (height - 20); // 20 là lề
    const x = i * (barWidth + 10) + 5; // Vị trí x
    const y = height - barHeight - 10; // Vị trí y (từ dưới lên)
    
    ctx.fillRect(x, y, barWidth, barHeight);
    ctx.fillStyle = '#000';
    ctx.fillText(d.label, x + barWidth / 2 - 15, height - 2);
  });
}

// Vẽ line chart
function drawLineChart(ctx: CanvasRenderingContext2D, data: DataPoint[]) {
  const { width, height } = ctx.canvas;
  if (!data || data.length === 0) return;

  const maxValue = Math.max(...data.map(d => d.value));
  ctx.strokeStyle = '#FF6384'; 
  ctx.lineWidth = 3;
  ctx.beginPath();

  data.forEach((d, i) => {
    const x = (i / (data.length - 1)) * (width - 20) + 10; // Vị trí x (có lề 10)
    const y = height - (d.value / maxValue) * (height - 20) - 10; // Vị trí y
    
    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  });

  ctx.stroke();
}

// Vẽ pie chart
function drawPieChart(ctx: CanvasRenderingContext2D, data: DataPoint[]) {
  const { width, height } = ctx.canvas;
  if (!data || data.length === 0) return;
  
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(width, height) / 2 - 10; // Bán kính
  const totalValue = data.reduce((sum, d) => sum + d.value, 0);


  const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'];
  let startAngle = 0;

  data.forEach((d, i) => {
    const sliceAngle = (d.value / totalValue) * 2 * Math.PI;
    const endAngle = startAngle + sliceAngle;
    
    // Dùng hàm tiện ích từ data-service.ts
    drawPieSlice(
      ctx,
      centerX,
      centerY,
      radius,
      startAngle,
      endAngle,
      colors[i % colors.length]
    );

    startAngle = endAngle; // Góc bắt đầu của miếng bánh tiếp theo
  });
}


export const Chart = (props: ChartProps): VNode => {
  const { data, type } = props;

 
  const canvasRef = (canvasElement: Node) => {
    if (canvasElement && canvasElement instanceof HTMLCanvasElement) {
      const ctx = canvasElement.getContext('2d');
      if (ctx) {
        // 1. Xóa sạch canvas trước khi vẽ
        ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);

        // 2. Chọn hàm vẽ dựa trên 'props.type'
        switch (type) {
          case 'bar':
            drawBarChart(ctx, data);
            break;
          case 'line':
            drawLineChart(ctx, data);
            break;
          case 'pie':
            drawPieChart(ctx, data);
            break;
        }
      }
    }
  };

  return (
    <canvas
      className="chart-canvas"
      width="500"
      height="300"
      ref={canvasRef}
    >
      Your browser does not support the canvas element.
    </canvas>
  );
};
