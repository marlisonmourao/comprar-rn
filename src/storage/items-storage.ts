import { FilterStatus } from '@/types/filter-status'
import AsyncStorage from '@react-native-async-storage/async-storage'

const ITEMS_STORAGE_KEY = '@comprar:items'

export type ItemStorage = {
  id: string
  description: string
  status: FilterStatus
}

async function getItems(): Promise<ItemStorage[]> {
  try {
    const items = await AsyncStorage.getItem(ITEMS_STORAGE_KEY)
    return items ? JSON.parse(items) : []
  } catch (error) {
    throw new Error('GET_ITEMS: ', error as Error)
  }
}

async function getItemsByStatus(status: FilterStatus): Promise<ItemStorage[]> {
  try {
    const items = await getItems()
    return items.filter(item => item.status === status)
  } catch (error) {
    throw new Error('GET_ITEMS_BY_STATUS: ', error as Error)
  }
}

async function addItem(newItem: ItemStorage) {
  const items = await getItems()
  const updatedItems = [...items, newItem]

  await saveItem(updatedItems)

  return updatedItems
}

async function saveItem(items: ItemStorage[]) {
  try {
    await AsyncStorage.setItem(ITEMS_STORAGE_KEY, JSON.stringify(items))
  } catch (error) {
    throw new Error('SAVE_ITEM: ', error as Error)
  }
}

async function deleteItem(id: string) {
  try {
    const items = await getItems()

    const filteredItems = items.filter(item => item.id !== id)

    await AsyncStorage.setItem(ITEMS_STORAGE_KEY, JSON.stringify(filteredItems))
  } catch (error) {
    throw new Error('DELETE_ITEM: ', error as Error)
  }
}

async function clear() {
  try {
    await AsyncStorage.removeItem(ITEMS_STORAGE_KEY)
  } catch (error) {
    throw new Error('CLEAR: ', error as Error)
  }
}

async function toggleStatus(id: string): Promise<void> {
  const items = await getItems()
  const updatedItems = items.map(item =>
    item.id === id
      ? {
          ...item,
          status:
            item.status === FilterStatus.PENDING
              ? FilterStatus.DONE
              : FilterStatus.PENDING,
        }
      : item
  )
  await saveItem(updatedItems)
}

export const itemsStorage = {
  getItems,
  getItemsByStatus,
  addItem,
  deleteItem,
  clear,
  toggleStatus,
}
