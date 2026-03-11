import { ConfigProvider, theme } from 'antd'
import AppLayout from './components/layout/AppLayout'
import { CryptoContextProvider } from './context/crypto-context'

export default function App() {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#7B2CBF',
          fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
        },
      }}
    >
      <CryptoContextProvider>
        <AppLayout />
      </CryptoContextProvider>
    </ConfigProvider>
  )
}
