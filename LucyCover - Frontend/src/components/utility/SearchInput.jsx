import React from 'react';
//Components
import { IoClose } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
//Style
import style from './css/SearchInput.module.css'

/**
 * SearchInput - component which combine icon and input
 * It usualy is use to create search input
 * @param {string} placeholder - placeholder in input
 * @param {string} value - value in input
 * @param {Function} SetSearchPhrase - function that change state of some searchPhrase
 * @returns 
 */

const SearchInput = ({placeholder,value,SetSearchPhrase}) => {

    const SearchInputChangeHandler = (event) => {
        SetSearchPhrase(event.target.value)
    }

    const ClearInputClickHandler = () => {
        SetSearchPhrase('')
    }

    return (
            <div className={style.SearchInput_Box}>
                <div xs={10}>
                    <input placeholder={placeholder} value={value} onInput={SearchInputChangeHandler} />
                </div>
                <div xs={2}>
                    {value.length === 0 ? <CiSearch /> : <IoClose onClick={ClearInputClickHandler} /> }
                </div>
            </div>
    );
  };

export default SearchInput