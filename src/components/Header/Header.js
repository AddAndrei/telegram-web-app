import React from 'react';
import './Header.css';
import {IoIosSearch} from "react-icons/io";
import { FiAlignJustify } from "react-icons/fi";

const Header = () => {
    return (
        <div className={"header"}>
            <form>
                <input type="text" placeholder='Искать' name='search'/>
                <button type='button'><IoIosSearch size={'26'} color={'#929292'} /></button>
            </form>
            <div>
                <button type='button' className={'filters'}><FiAlignJustify size={'30'} color={'#929292'}/></button>
            </div>
        </div>
    );
};

export default Header;