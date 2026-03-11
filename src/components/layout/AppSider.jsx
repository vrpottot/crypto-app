import { Layout, Card, Statistic, List, Typography, Tag, Empty } from 'antd'
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons'
import { capitalize } from '../../utils'
import { useContext } from 'react'
import CryptoContext from '../../context/crypto-context'

const siderStyle = {
  padding: '1.5rem 1rem',
  borderRight: '1px solid rgba(255, 255, 255, 0.04)',
  background: 'transparent',
}

const drawerContentStyle = {
  padding: '1rem',
  background: 'transparent',
}

export default function AppSider({ inDrawer }) {
  const { assets } = useContext(CryptoContext)

  if (!assets || assets.length === 0) {
    if (inDrawer) {
      return (
        <div style={drawerContentStyle}>
          <Empty
            description="No assets added"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            style={{
              marginTop: '2rem',
              color: 'rgba(200,200,220,0.5)'
            }}
          />
        </div>
      )
    }
    return (
      <Layout.Sider width="25%" style={siderStyle}>
        <div style={{
          fontSize: '0.7rem',
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          color: 'rgba(200,200,220,0.5)',
          fontWeight: 600,
          marginBottom: '1rem',
          paddingLeft: 4,
        }}>
          Your Assets
        </div>
        <Empty
          description="No assets added"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          style={{
            marginTop: '2rem',
            color: 'rgba(200,200,220,0.5)'
          }}
        />
      </Layout.Sider>
    )
  }

  if (inDrawer) {
    return (
      <div style={drawerContentStyle}>
        {assets.map((asset, index) => (
          <Card
            key={asset.id}
            className="glass-card"
            style={{
              marginBottom: '0.75rem',
              animationDelay: `${index * 0.1}s`,
            }}
            bordered={false}
          >
            <Statistic
              title={capitalize(asset.id)}
              value={asset.totalAmount}
              precision={2}
              valueStyle={{
                color: asset.grow ? 'var(--success-color)' : 'var(--danger-color)',
                fontWeight: 700,
                fontSize: '1.1rem',
              }}
              prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
              suffix="$"
            />
            <List
              size="small"
              dataSource={[
                {
                  title: 'Total Profit',
                  value: asset.totalProfit,
                  withTag: true,
                },
                { title: 'Asset Amount', value: asset.amount, isPlain: true },
              ]}
              renderItem={(item) => (
                <List.Item style={{
                  borderBlockEndColor: 'rgba(255,255,255,0.04)',
                  padding: '6px 0',
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%'
                  }}>
                    <span style={{ color: 'rgba(200,200,220,0.6)', fontSize: '0.85rem' }}>
                      {item.title}
                    </span>
                    <span>
                      {item.withTag && (
                        <Tag color={asset.grow ? 'green' : 'red'}>
                          {asset.growPercent || '0'}%
                        </Tag>
                      )}
                      {item.isPlain && (
                        <span style={{ color: '#f0f0f5', fontWeight: 500 }}>
                          {item.value}
                        </span>
                      )}
                      {!item.isPlain && (
                        <Typography.Text
                          type={asset.grow ? 'success' : 'danger'}
                          style={{ fontWeight: 600 }}
                        >
                          {item.value.toFixed(2)}$
                        </Typography.Text>
                      )}
                    </span>
                  </div>
                </List.Item>
              )}
            />
          </Card>
        ))}
      </div>
    )
  }

  return (
    <Layout.Sider width="25%" style={siderStyle}>
      <div style={{
        fontSize: '0.7rem',
        textTransform: 'uppercase',
        letterSpacing: '0.12em',
        color: 'rgba(200,200,220,0.5)',
        fontWeight: 600,
        marginBottom: '1rem',
        paddingLeft: 4,
      }}>
        Your Assets
      </div>
      {assets.map((asset, index) => (
        <Card
          key={asset.id}
          className="glass-card"
          style={{
            marginBottom: '1rem',
            animationDelay: `${index * 0.1}s`,
          }}
          bordered={false}
        >
          <Statistic
            title={capitalize(asset.id)}
            value={asset.totalAmount}
            precision={2}
            valueStyle={{
              color: asset.grow ? 'var(--success-color)' : 'var(--danger-color)',
              fontWeight: 700,
              fontSize: '1.3rem',
            }}
            prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
            suffix="$"
          />
          <List
            size="small"
            dataSource={[
              {
                title: 'Total Profit',
                value: asset.totalProfit,
                withTag: true,
              },
              { title: 'Asset Amount', value: asset.amount, isPlain: true },
            ]}
            renderItem={(item) => (
              <List.Item style={{
                borderBlockEndColor: 'rgba(255,255,255,0.04)',
                padding: '8px 0',
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%'
                }}>
                  <span style={{ color: 'rgba(200,200,220,0.6)', fontSize: '0.85rem' }}>
                    {item.title}
                  </span>
                  <span>
                    {item.withTag && (
                      <Tag color={asset.grow ? 'green' : 'red'}>
                        {asset.growPercent || '0'}%
                      </Tag>
                    )}
                    {item.isPlain && (
                      <span style={{ color: '#f0f0f5', fontWeight: 500 }}>
                        {item.value}
                      </span>
                    )}
                    {!item.isPlain && (
                      <Typography.Text
                        type={asset.grow ? 'success' : 'danger'}
                        style={{ fontWeight: 600 }}
                      >
                        {item.value.toFixed(2)}$
                      </Typography.Text>
                    )}
                  </span>
                </div>
              </List.Item>
            )}
          />
        </Card>
      ))}
    </Layout.Sider>
  )
}
