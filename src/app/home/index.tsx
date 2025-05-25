import { Button } from '@/components/button'
import { Filter } from '@/components/filter'
import { Input } from '@/components/input'
import { Item } from '@/components/item'
import { FilterStatus } from '@/types/filter-status'
import {
  FlatList,
  Image,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { styles } from './styles'

const FILTER_STATUS: FilterStatus[] = [FilterStatus.DONE, FilterStatus.PENDING]

const ITEMS = [
  {
    id: '1',
    description: 'Arroz',
    status: FilterStatus.PENDING,
  },
  {
    id: '2',
    description: 'Feijão',
    status: FilterStatus.PENDING,
  },
  {
    id: '3',
    description: 'Batata',
    status: FilterStatus.DONE,
  },
  {
    id: '4',
    description: 'Carne',
    status: FilterStatus.DONE,
  },
]

export default function Home() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Image source={require('@/assets/logo.png')} style={styles.logo} />
      <View style={styles.form}>
        <Input placeholder="O que você precisa comprar?" />
        <Button title="Adicionar" />
      </View>
      <View style={styles.content}>
        <View style={styles.header}>
          {FILTER_STATUS.map(status => (
            <Filter key={status} status={status} isActive />
          ))}

          <TouchableOpacity style={styles.clearButton}>
            <Text style={styles.clearButtonText}>Limpar</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={ITEMS}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Item data={item} onRemove={() => {}} onCheck={() => {}} />
          )}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={() => (
            <Text style={styles.empty}>Nenhum item aqui</Text>
          )}
        />
      </View>
    </View>
  )
}
