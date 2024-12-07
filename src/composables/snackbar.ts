export function useSnackbar() {
  const isVisible = useState('snackbar-visible', () => false)
  const message = useState('snackbar-message', () => '')
  const type = useState('snackbar-type', () => 'info')
  const timer = useState<NodeJS.Timeout | undefined>('snackbar-timer')

  function showSnackbar(msg: string, msgType: 'success' | 'error' | 'warning' | 'info' = 'info') {
    // Clear any existing timer
    if (timer.value) clearTimeout(timer.value)

    message.value = msg
    type.value = msgType
    isVisible.value = true

    timer.value = setTimeout(() => {
      isVisible.value = false
    }, 3000)
  }

  function closeSnackbar() {
    if (timer.value) clearTimeout(timer.value)
    isVisible.value = false
    timer.value = undefined
  }

  return {
    isVisible,
    message,
    type,
    showSnackbar,
    closeSnackbar,
  }
}
