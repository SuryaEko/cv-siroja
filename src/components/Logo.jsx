import { COMPANY } from '../data/constants'

// source: public/brand/logo.jpeg is 1536×1024 (aspect 3:2)
const sizeMap = {
  sm: { cls: 'h-8 w-auto',  width: 48,  height: 32 },  // Navbar
  md: { cls: 'h-14 w-auto', width: 84,  height: 56 },  // Footer
}

export default function Logo({ size = 'sm', eager = false, className = '' }) {
  const { cls, width, height } = sizeMap[size]
  return (
    <img
      src={COMPANY.logo}
      alt="Logo CV. Siroja Network"
      width={width}
      height={height}
      decoding="async"
      loading={eager ? 'eager' : 'lazy'}
      fetchPriority={eager ? 'high' : 'auto'}
      className={`${cls} ${className}`.trim()}
    />
  )
}
