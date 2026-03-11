import { Layout, Typography } from 'antd'
import { useCrypto } from '../../context/crypto-context'
import PortfolioChart from '../PortfolioChart'
import AssetsTable from '../AssetsTable'

const contentStyle = {
  textAlign: 'center',
  minHeight: 'calc(100vh - 60px)',
  color: '#fff',
  padding: 'clamp(1rem, 3vw, 2rem) clamp(1rem, 4vw, 2.5rem)',
}

export default function AppContent() {
  const { assets, crypto } = useCrypto()

  const cryptoPriceMap = crypto.reduce((acc, c) => {
    acc[c.id] = c.price
    return acc
  }, {})

  const totalValue = assets
    .map((asset) => asset.amount * cryptoPriceMap[asset.id])
    .reduce((acc, v) => (acc += v), 0)
    .toFixed(2)

  return (
    <Layout.Content style={contentStyle}>
      <div style={{ textAlign: 'left', marginBottom: '2rem' }}>
        <div className="portfolio-label">Total Portfolio Value</div>
        <span className="portfolio-value">${totalValue}</span>
      </div>
      <PortfolioChart />
      <AssetsTable />
    </Layout.Content>
  )
}
