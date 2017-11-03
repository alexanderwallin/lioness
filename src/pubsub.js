let subscribers = []

export const subscribe = fn => {
  if (subscribers.includes(fn) === false) {
    subscribers = [...subscribers, fn]
  }
}

export const unsubscribe = fn => {
  subscribers = subscribers.filter(x => x !== fn)
}

export const emit = () => {
  subscribers.forEach(fn => fn())
}
