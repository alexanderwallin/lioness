let subscribers = []

export const subscribe = (fn) => {
  if (subscribers.indexOf(fn) === -1) {
    subscribers = [...subscribers, fn]
  }
}

export const unsubscribe = (fn) => {
  subscribers = subscribers.filter((x) => x !== fn)
}

export const emit = () => {
  subscribers.forEach((fn) => fn())
}
