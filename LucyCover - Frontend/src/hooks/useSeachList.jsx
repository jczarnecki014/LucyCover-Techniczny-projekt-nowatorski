import { useEffect, useState } from "react"


const useSearchList = ({list,searchPhrase}) => {
    const [searchList,SetSearchList] = useState([]);

    useEffect(()=>{
        const timeout = setTimeout(()=>{
            const searchResults = list.filter(e => {
                    const objectValues = Object.values(e)
                    const someSearchPhrase = objectValues.some(value => 
                        typeof(value) === 'string' && value.toLocaleLowerCase().includes(searchPhrase.toLocaleLowerCase()) )
                    return someSearchPhrase;
                });
            SetSearchList(searchResults)
        },700)

        return () => {
            clearTimeout(timeout);
        }

    },[list,searchPhrase])

    useEffect(()=>{
        SetSearchList(list);
    },[])

    return searchList;
}

export default useSearchList