import React from 'react';

const Search = (props) => {
    const {locations, filteredLocations, selectedLocation, selectLocation, queryUpdate} = props;
    let places = filteredLocations === [] ? locations : filteredLocations;
    return (
        <div className='search-and-list'>
            <div>
                <input type="text"
                    className='search-box'
                    placeholder='Search...'
                    aria-label='Search Monument'
                    onChange={event => queryUpdate(event.target.value)}/>
            </div>
            <ul>
                {
                    places.map((location, index) => {
                        const isSelected = (location.id === selectedLocation.id ? 'row-selected' : '');
                        return (
                            <li
                                key={index}
                                onClick={ () => selectLocation(location)}
                                onKeyDown={(event) => event.keyCode !== 13 || selectLocation(location)}
                                className={isSelected}
                                tabIndex={0}
                            >
                                <span>{location.name}</span>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    );
}

export default Search;
