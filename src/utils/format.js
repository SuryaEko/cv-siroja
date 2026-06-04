// Format a number as Indonesian Rupiah: 4580000 -> "Rp 4.580.000"
export const formatIDR = (n) =>
  'Rp ' + Number(n).toLocaleString('id-ID')
