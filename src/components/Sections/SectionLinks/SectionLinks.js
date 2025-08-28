import React from 'react';
import './SectionLinks.css';
import t from '../../../images/telephones.png'
import a from '../../../images/access.png'
import d from '../../../images/details.png'
const SectionLinks = () => {
    const images = {

    }
    const send = (event) => {
        event.preventDefault();
        console.log(event.target.getAttribute('type'));
    }
    return (
        <div className='links'>
            <img src={t} onClick={send} type='telephones' alt="telephones" className='image-link'/>
            <img src={a} alt="access" onClick={send} type='access' className='image-link'/>
            <img src={d} alt="details" onClick={send} type='details' className='image-link'/>
        </div>
    );
};

export default SectionLinks;