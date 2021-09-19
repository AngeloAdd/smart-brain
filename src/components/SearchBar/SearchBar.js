import React from "react";


const SearchBar = ( { input, clearInputBar, onInputChange, onButtonSubmit } ) => {
    return (
        <div  className="flex flex-column items-center justify-center">
            <p className="w-50 f5 tc mt0 mb2 white">
                {'This tool can detect faces in your image'}
            </p>
            <div className="flex justify-center w-50 shadow-2 br3 bg-form pv5">
                <input placeholder="Insert an URL" onChange={onInputChange} onFocus={clearInputBar} value={input} type="text" className="w-60 mr1 f4 br2 shadow-0 b0"/>
                <button onClick={onButtonSubmit} type="button" className="w-20 f4 link br2 grow bg-dark-blue pa2 dib white">
                    {'Detect'}
                </button>
            </div>
        </div>
    )
}

export default SearchBar