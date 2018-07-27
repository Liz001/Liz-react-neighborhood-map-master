import React, {
    Component
} from 'react';

class SidebarHeader extends Component {
    state = {}

    toggleHide = () => {
        const list = document.querySelector('.search-and-list');
        list.classList.toggle('hidden');
        const map = document.querySelector('#map');
        map.classList.toggle('full');
    }

//Hamburger menu svg and title
    render() {
        return (
            <div className='header' aria-label="upper bar/header">
                    <a className="burger" aria-label="burger menu" onClick={() => this.toggleHide()}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M2 6h20v3H2zm0 5h20v3H2zm0 5h20v3H2z"/>
                        </svg>
                    </a>
                    <div className='title' aria-label="Project title">
                        <h1>Neighborhood Map Palermo</h1>
                    </div>
            </div>
        );
    }
}

export default SidebarHeader
