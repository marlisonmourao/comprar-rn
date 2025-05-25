import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#09090b',
    paddingTop: 62,
  },
  logo: {
    width: 134,
    height: 34,
  },
  form: {
    width: '100%',
    marginTop: 24,
    paddingHorizontal: 16,
    gap: 7,
    marginBottom: 42,
  },
  content: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 16,
    backgroundColor: '#020617',
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
    padding: 24,
    paddingTop: 32,
    marginTop: 24,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#2c3e50',
    paddingBottom: 12,
  },
  clearButton: {
    marginLeft: 'auto',
  },
  clearButtonText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: 600,
  },
  separator: {
    height: 0.6,
    width: '100%',
    backgroundColor: '#eef0f5',
    marginVertical: 12,
  },
  listContent: {
    paddingTop: 24,
    paddingBottom: 62,
    gap: 8,
  },
  empty: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 600,
    textAlign: 'center',
  },
})
