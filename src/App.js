import './App.css';
import {useEffect} from "react";
import Button from "./components/Buttons/Button";
import Form from "./components/Forms/Form";
import Input from "./components/Inputs/Input";
import {useTelegram} from "./Hooks/useTelegram";
import Header from "./components/Header/Header";
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

                {/*<Button callback={onClose} buttonTitle="Закрыть"/>
                <Form method='post' onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    console.log(formData.get('search'));
                }} inputs={[
                    <Input key={'search'} type={'text'} name={'search'}/>,
                    <Button key={'submit'} type={'button'} buttonTitle="Отправить"/>,
                ]}/>*/}
            </main>
        </>

    );
}
