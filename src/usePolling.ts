import { useCallback, useRef } from 'react'

const sleep = (duration = 3000) =>
  new Promise((resolve) => setTimeout(resolve, duration))

interface PollingConfig<V = any, E = any> {
  duration?: number
  onSuccess?: (value: V) => void
  onError?: (error: E) => void
  onCancel?: () => void
}

/**
 * Polling Hook
 */
const usePolling = <V = any, E = any>(
  pollingTask: () => Promise<V>,
  config?: PollingConfig<V, E>
) => {
  /**
   * Polling state flag ref
   */
  const isPollingRef = useRef(false)
  /**
   * Polling cancel state flag ref
   */
  const cancelPollingRef = useRef(false)

  const pollingFunc = useCallback(async () => {
    if (cancelPollingRef.current) {
      isPollingRef.current = false
      cancelPollingRef.current = false
      return
    }

    try {
      const value = await pollingTask()
      config?.onSuccess?.(value)
      await sleep(config?.duration)
    } catch (err: any) {
      isPollingRef.current = false
      cancelPollingRef.current = false
      config?.onError?.(err)
      return
    }

    pollingFunc()
  }, [pollingTask, config])

  /**
   * Polling cancel function
   */
  const cancelPolling = useCallback(() => {
    if (isPollingRef.current) {
      cancelPollingRef.current = true
      config?.onCancel?.()
    }
  }, [config])

  /**
   * Polling begin function
   */
  const startPolling = useCallback(() => {
    if (isPollingRef.current) {
      return
    }

    isPollingRef.current = true
    pollingFunc()
  }, [pollingFunc])

  return [startPolling, cancelPolling]
}

export default usePolling
