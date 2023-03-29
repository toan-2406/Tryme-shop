import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import purchaseApi from 'src/apis/purchase.api'
import Button from 'src/components/Button'
import { purchasesStatus } from 'src/constants/purchase'
import { formatCurrency, generateNameId } from 'src/utils/utils'
import path from 'src/constants/path'
import Input from 'src/components/Input'
import useSearchProducts from 'src/hooks/useSearchProducts'
export default function Sale() {
  const { onSubmitSearch, register } = useSearchProducts()
  const { data: historyPurchaseList, refetch } = useQuery({
    queryKey: ['purchases', { status: purchasesStatus.all }],
    queryFn: () => purchaseApi.getPurchaseList({ status: purchasesStatus.all })
  })
  const list = historyPurchaseList?.data.data
 
  return (
   <>Sale</>
  )
}
