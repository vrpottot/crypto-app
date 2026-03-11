import { Layout, Select, Space, Button, Modal, Drawer } from 'antd'
import { useCrypto } from '../../context/crypto-context'
import { useEffect, useState } from 'react'
import CoinInfoModal from '../CoinInfoModal'
import AddAssetForm from '../AddAssetForm'
import { MenuOutlined } from '@ant-design/icons'

const headerStyle = {
  width: '100%',
  height: 64,
  padding: '0 1rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  background: 'rgba(12, 12, 24, 0.6)',
  backdropFilter: 'blur(24px)',
  WebkitBackdropFilter: 'blur(24px)',
  borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
  position: 'sticky',
  top: 0,
  zIndex: 100,
}

const logoStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  cursor: 'default',
  userSelect: 'none',
}

const logoDotStyle = {
  width: 10,
  height: 10,
  borderRadius: '50%',
  background: 'linear-gradient(135deg, #7b2cbf, #3a86ff)',
  boxShadow: '0 0 12px rgba(123, 44, 191, 0.5)',
}

const logoTextStyle = {
  fontSize: '1.15rem',
  fontWeight: 700,
  letterSpacing: '-0.02em',
  color: '#f0f0f5',
}

export default function AppHeader({ onMenuClick, showMenu }) {
  const [select, setSelect] = useState(false)
  const [coin, setCoin] = useState(null)
  const [modal, setModal] = useState(false)
  const [drawer, setDrawer] = useState(false)
  const [drawerWidth, setDrawerWidth] = useState(600)
  const { crypto } = useCrypto()

  useEffect(() => {
    const handleResize = () => {
      setDrawerWidth(window.innerWidth <= 768 ? '100%' : 600)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const keypress = (event) => {
      if (event.key === '/') {
        setSelect((prev) => !prev)
      }
    }
    document.addEventListener('keypress', keypress)
    return () => document.removeEventListener('keypress', keypress)
  }, [])

  function handleSelect(value) {
    setCoin(crypto.find((c) => c.id === value))
    setModal(true)
  }

  return (
    <Layout.Header style={headerStyle}>
      <Space size="middle" align="center">
        {showMenu && (
          <Button 
            type="text" 
            icon={<MenuOutlined />} 
            onClick={onMenuClick}
            style={{ color: '#f0f0f5', fontSize: '1.2rem' }}
          />
        )}
        <div style={logoStyle}>
          <div style={logoDotStyle} />
          <span style={logoTextStyle}>CryptoFolio</span>
        </div>

        <Select
          style={{ width: '100%', maxWidth: 250, minWidth: 140 }}
          open={select}
          onSelect={handleSelect}
          onClick={() => setSelect((prev) => !prev)}
          value="press / to open"
          options={crypto.map((coin) => ({
            label: coin.name,
            value: coin.id,
            icon: coin.icon,
          }))}
          optionRender={(option) => (
            <Space>
              <img
                style={{ width: 20, borderRadius: '50%' }}
                src={option.data.icon}
                alt={option.data.label}
              />{' '}
              {option.data.label}
            </Space>
          )}
        />
      </Space>

      <Button type="primary" onClick={() => setDrawer(true)}>
        + Add Asset
      </Button>

      <Modal open={modal} onCancel={() => setModal(false)} footer={null}>
        <CoinInfoModal coin={coin} />
      </Modal>

      <Drawer
        width={drawerWidth}
        title="Add Asset"
        onClose={() => setDrawer(false)}
        open={drawer}
        destroyOnClose
      >
        <AddAssetForm onClose={() => setDrawer(false)} />
      </Drawer>
    </Layout.Header>
  )
}
