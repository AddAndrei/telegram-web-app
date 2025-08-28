import './App.css';
import {useEffect} from "react";
import {useTelegram} from "./Hooks/useTelegram";
import {Route, Routes} from 'react-router-dom';
import Main from "./components/Pages/Main/Main";
import Footer from "./components/Footer/Footer";
import Favorite from "./components/Pages/Favorite/Favorite";
import Add from "./components/Pages/Add/Add";

export default function App() {
    const {onClose, tg} = useTelegram();

    useEffect(() => {
        tg.ready();
    }, [tg]);


    return (
        <>
            <main>
                <div className={'main'}>
                    <Routes>
                        <Route index element={<Main/>}/>
                        <Route path={'/favorite'} element={<Favorite/>}/>
                        <Route path={'/add'} element={<Add/>}/>
                    </Routes>
                    <Footer/>
                </div>
            </main>
        </>
    );
}
