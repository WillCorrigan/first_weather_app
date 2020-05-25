import React from 'react';
import './searchbox.css';



const Searchbox = (props) => {
    return (
        <div>
            <div className='mw5 mw7-ns center pa3  ph7-ns'>
                <input 
                className='input-reset ba b--black-20 pa2 mb2 db w-100'
                type='search' 
                placeholder='Enter a city name'
                onChange={props.updateSearch}
                onKeyDown={props.onKeyDown}
                />
                <button type="submit" className='db center ba b--black' onClick={props.resolveSearch}>Submit</button>
            </div>
        </div>
    );
}

export default Searchbox;