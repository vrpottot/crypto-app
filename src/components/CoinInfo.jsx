import { Flex, Typography } from 'antd'

export default function CoinInfo({ coin, withSymbol }) {
  return (
    <Flex align="center" gap={14}>
      <img
        src={coin.icon}
        alt={coin.name}
        style={{
          width: 44,
          height: 44,
          borderRadius: '50%',
          boxShadow: '0 0 16px rgba(123, 44, 191, 0.3)',
          border: '2px solid rgba(123, 44, 191, 0.3)',
        }}
      />
      <Typography.Title level={2} style={{ margin: 0, letterSpacing: '-0.02em' }}>
        {withSymbol && (
          <span style={{ color: 'rgba(200,200,220,0.5)', fontWeight: 400 }}>
            ({coin.symbol})
          </span>
        )}{' '}
        {coin.name}
      </Typography.Title>
    </Flex>
  )
}
