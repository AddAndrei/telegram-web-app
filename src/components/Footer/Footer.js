import React from 'react';
import './Footer.css'
import {IoIosSearch} from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdMessage } from "react-icons/md";
import { TfiAlignJustify } from "react-icons/tfi";
const Footer = () => {
    return (
        <footer>
            <div className='footer-button'>
                <IoIosSearch size={'26'} color={'#929292'}/>
                <span>поиск</span>
            </div>
            <div className='footer-button'>
                <FaHeart size={'25'} color={'#929292'}/>
                <span>избранное</span>
            </div>
            <div className='footer-button'>
                <IoIosAddCircleOutline size={'28'} color={'#929292'}/>
                <span>добавить</span>
            </div>
            <div className='footer-button'>
                <MdMessage size={'26'} color={'#929292'}/>
                <span>сообщения</span>
            </div>
            <div className='footer-button'>
                <TfiAlignJustify size={'26'} color={'#929292'}/>
                <span>профиль</span>
            </div>
        </footer>
    );
};

export default Footer;