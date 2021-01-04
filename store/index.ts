export const defaultState = {}

export const state = () => ({ ...defaultState })

export type RootState = ReturnType<typeof state>
