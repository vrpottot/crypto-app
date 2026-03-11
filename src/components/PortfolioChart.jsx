import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import { useCrypto } from '../context/crypto-context'

ChartJS.register(ArcElement, Tooltip, Legend)

export default function PortfolioChart() {
  const { assets } = useCrypto()

  const data = {
    labels: assets.map((a) => a.name),
    datasets: [
      {
        label: '$',
        data: assets.map((a) => a.totalAmount),
        backgroundColor: [
          'rgba(123, 44, 191, 0.85)',   // purple
          'rgba(58, 134, 255, 0.85)',    // blue
          'rgba(247, 37, 133, 0.85)',    // pink
          'rgba(0, 230, 118, 0.85)',     // green
          'rgba(255, 190, 11, 0.85)',    // gold
          'rgba(255, 82, 82, 0.85)',     // red
        ],
        borderColor: [
          'rgba(123, 44, 191, 1)',
          'rgba(58, 134, 255, 1)',
          'rgba(247, 37, 133, 1)',
          'rgba(0, 230, 118, 1)',
          'rgba(255, 190, 11, 1)',
          'rgba(255, 82, 82, 1)',
        ],
        borderWidth: 2,
        hoverOffset: 12,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: 'rgba(240, 240, 245, 0.85)',
          font: {
            family: 'Inter',
            size: 13,
            weight: '500',
          },
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
      tooltip: {
        backgroundColor: 'rgba(15, 15, 30, 0.92)',
        borderColor: 'rgba(123, 44, 191, 0.3)',
        borderWidth: 1,
        titleFont: {
          family: 'Inter',
          size: 14,
          weight: '600',
        },
        bodyFont: {
          family: 'Inter',
          size: 13,
        },
        padding: 14,
        cornerRadius: 10,
        displayColors: true,
        boxPadding: 6,
      },
    },
  }

  return (
    <div
      className="glass-card"
      style={{
        display: 'flex',
        justifyContent: 'center',
        height: 350,
        padding: '1.5rem',
        marginBottom: '1.5rem',
      }}
    >
      <Pie data={data} options={options} />
    </div>
  )
}
