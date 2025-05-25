import { FilterStatus } from '@/types/filter-status'

import { CircleCheck, CircleDashed } from 'lucide-react-native'

export function StatusIcon({ status }: { status: FilterStatus }) {
  return status === FilterStatus.DONE ? (
    <CircleCheck size={18} color="#0284c7" />
  ) : (
    <CircleDashed size={18} color="#FFFFFF" />
  )
}
