import { FilterStatus } from '@/types/filter-status'
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { StatusIcon } from '../status-icon'
import { styles } from './styles'

interface FilterProps extends TouchableOpacityProps {
  status: FilterStatus
  isActive: boolean
}

export function Filter({ status, isActive, ...rest }: FilterProps) {
  return (
    <TouchableOpacity
      style={[styles.container, { opacity: isActive ? 1 : 0.5 }]}
      activeOpacity={0.8}
      {...rest}
    >
      <StatusIcon status={status} />

      <Text style={styles.title}>
        {status === FilterStatus.DONE ? 'Comprado' : 'Pendente'}
      </Text>
    </TouchableOpacity>
  )
}
