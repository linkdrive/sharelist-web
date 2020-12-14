export interface State {
  setting: any
}

export const state: State = {
  recent: {},
  setting: {
    mode: 'night',
    theme: 'default',
    fontSize: 1.125,
  },
  books: [],
}
