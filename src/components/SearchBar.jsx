import React from 'react'
import './SearchBar.css'

const SearchBer = ({value, onChange}) => {
  return (
    <input className='search-bar' type="text" value={value} onChange={onChange} />
  )
}

export default SearchBer