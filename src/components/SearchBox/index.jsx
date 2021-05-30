import React, { useState } from 'react';

import './SearchBox.css'

export default function SearchBox({search, placeholder}) {

  const [text, setText] = useState('')

  function onSearch(query){
    setText(query)
    search(query)
  }

  return (
  <>
    <br/>
    <div className="search">
      <form>
        <input
          autoFocus
          placeholder={placeholder}
          type="text" 
          className="form-control searcBoxInput"
          onChange={(event) => onSearch(event.target.value)}
          value={text}
          />
      </form>
    </div>
  </>

  )
}

