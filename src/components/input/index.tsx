import { TextInput, TextInputProps } from 'react-native'
import { styles } from './styles'

export function Input({ ...rest }: TextInputProps) {
  return (
    <TextInput placeholderTextColor="#6B7280" style={styles.input} {...rest} />
  )
}
