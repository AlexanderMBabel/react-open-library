import {
    createContext
} from 'react'

const CatagoryContext = createContext({})

export const CatagoryProvider = CatagoryContext.Provider
export const CatagoryConsumer = CatagoryContext.Consumer

export default CatagoryContext