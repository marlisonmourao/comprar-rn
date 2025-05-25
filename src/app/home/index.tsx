import { Button } from '@/components/button'
import { Filter } from '@/components/filter'
import { Input } from '@/components/input'
import { Item } from '@/components/item'
import { ItemStorage, itemsStorage } from '@/storage/items-storage'
import { FilterStatus } from '@/types/filter-status'
import { useEffect, useState } from 'react'
import {
  Alert,
  FlatList,
  Image,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { styles } from './styles'

const FILTER_STATUS: FilterStatus[] = [FilterStatus.DONE, FilterStatus.PENDING]

export default function Home() {
  const [filter, setFilter] = useState<FilterStatus>(FilterStatus.PENDING)
  const [description, setDescription] = useState('')
  const [items, setItems] = useState<ItemStorage[]>([])

  async function handleAddItem() {
    if (!description.trim()) {
      return Alert.alert('Adicionar item', 'Informe a descrição do item')
    }

    const newItem = {
      id: Math.random().toString(36).substring(2),
      description,
      status: FilterStatus.PENDING,
    }

    await itemsStorage.getItemsByStatus(filter)
    setItems(prevState => [...prevState, newItem])
    await itemsStorage.addItem(newItem)

    setFilter(FilterStatus.PENDING)
    Alert.alert('Item adicionado', 'Item adicionado com sucesso')
    setDescription('')
  }

  async function handleRemoveItem(id: string): Promise<void> {
    await itemsStorage.deleteItem(id)
    setItems(prevState => prevState.filter(item => item.id !== id))

    Alert.alert('Item removido', 'Item removido com sucesso')

    await itemsStorage.getItemsByStatus(filter)
  }

  async function handleClear() {
    Alert.alert('Limpar', 'Deseja limpar todos os itens?', [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Sim',
        onPress: () => {
          itemsStorage.clear()
          setFilter(FilterStatus.PENDING)
          setDescription('')
          setItems([])
        },
      },
    ])
  }

  async function handleToggleStatus(id: string) {
    await itemsStorage.toggleStatus(id)
    const updatedItems = await itemsStorage.getItemsByStatus(filter)
    setItems(updatedItems)
  }

  useEffect(() => {
    itemsStorage.getItemsByStatus(filter).then(setItems)
  }, [filter])

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Image source={require('@/assets/logo.png')} style={styles.logo} />
      <View style={styles.form}>
        <Input
          placeholder="O que você precisa comprar?"
          value={description}
          onChangeText={setDescription}
          keyboardAppearance="dark"
        />
        <Button title="Adicionar" onPress={handleAddItem} />
      </View>
      <View style={styles.content}>
        <View style={styles.header}>
          {FILTER_STATUS.map(status => (
            <Filter
              key={status}
              status={status}
              onPress={() => setFilter(status)}
              isActive={filter === status}
            />
          ))}

          <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
            <Text style={styles.clearButtonText}>Limpar</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={items}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Item
              data={item}
              onRemove={() => handleRemoveItem(item.id)}
              onCheck={() => handleToggleStatus(item.id)}
            />
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
