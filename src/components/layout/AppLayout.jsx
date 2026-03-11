import { Layout, Drawer, Button } from 'antd'
import { MenuOutlined } from '@ant-design/icons'
import AppHeader from './AppHeader'
import AppSider from './AppSider'
import AppContent from './AppContent'
import { useContext, useState, useEffect } from 'react'
import CryptoContext from '../../context/crypto-context'

const MOBILE_BREAKPOINT = 768

export default function AppLayout() {
  const { loading } = useContext(CryptoContext)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= MOBILE_BREAKPOINT)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

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
      <AppHeader onMenuClick={() => setDrawerOpen(true)} showMenu={isMobile} />
      <Layout>
        {!isMobile && <AppSider />}
        <AppContent />
      </Layout>
      
      <Drawer
        title="Your Assets"
        placement="left"
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
        width="100%"
        styles={{
          body: { padding: 0, background: 'transparent' },
          header: { background: 'rgba(15, 15, 30, 0.9)', borderBottom: '1px solid rgba(255,255,255,0.06)' }
        }}
      >
        <AppSider inDrawer />
      </Drawer>
    </Layout>
  )
}
