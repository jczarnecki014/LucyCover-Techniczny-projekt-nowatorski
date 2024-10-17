import { useEffect, useState } from "react"


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