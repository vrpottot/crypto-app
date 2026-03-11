import { Layout } from 'antd'
import AppHeader from './AppHeader'
import AppSider from './AppSider'
import AppContent from './AppContent'
import { useContext } from 'react'
import CryptoContext from '../../context/crypto-context'

export default function AppLayout() {
  const { loading } = useContext(CryptoContext)

  if (loading) {
    return (
      <div className="premium-loader">
        <div className="premium-loader-ring" />
        <span className="premium-loader-text">Loading Portfolio</span>
      </div>
    )
  }

  return (
    <Layout className="fade-in">
      <AppHeader />
      <Layout>
        <AppSider />
        <AppContent />
      </Layout>
    </Layout>
  )
}
