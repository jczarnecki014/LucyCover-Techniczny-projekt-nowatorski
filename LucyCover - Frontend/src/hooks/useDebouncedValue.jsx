import { useEffect, useState } from "react"

/**
 * useDebouncedValue - hooks which take value and delay time and return this same value affter passing delay
 */

const useDebouncedValue = (value,delay) => {
    const [debouncedValue,SetdebouncedValue] = useState();

    useEffect(()=>{
        const timeout = setTimeout(()=>{
            SetdebouncedValue(value)
        },delay)

        return () => {
            clearTimeout(timeout)
        }
    },[value,delay])

    return debouncedValue
}

export default useDebouncedValue