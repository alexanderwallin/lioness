let subscribers = []

export const subscribe = fn => {
  subscribers = [...subscribers, fn]
}

export const unsubscribe = fn => {
  subscribers = subscribers.filter(x => x !== fn)
}

export const emit = () => {
  subscribers.forEach(fn => fn())
}
