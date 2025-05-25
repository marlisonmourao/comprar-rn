import { Text, TouchableOpacity, View } from 'react-native'
import { styles } from './styles'

import { FilterStatus } from '@/types/filter-status'
import { Trash2 } from 'lucide-react-native'
import { StatusIcon } from '../status-icon'

type ItemData = {
  status: FilterStatus
  description: string
}

type ItemProps = {
  data: ItemData
  onRemove: () => void
  onCheck: () => void
}

export function Item({ data, onRemove, onCheck }: ItemProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onCheck}>
        <StatusIcon status={data.status} />
      </TouchableOpacity>

      <Text style={styles.description}>{data.description}</Text>

      <TouchableOpacity onPress={onRemove}>
        <Trash2 size={18} color="#828282" />
      </TouchableOpacity>
    </View>
  )
}
