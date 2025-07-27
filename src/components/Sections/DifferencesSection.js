import Button from "../Buttons/Button";
import {useState} from "react";

export default function DifferencesSection() {
    const [content, setContent] = useState('Нажми на кнопку пидрр')
    function click(type) {
        console.log(type)
        setContent(type);
    }
    return (
        <section>
            <h3>Чем мы отличаемся от других</h3>
            <Button buttonTitle="Опа" callback={() => click("test")}/>
            <Button buttonTitle="Пиздец" callback={() => click("azazaza")}/>
            <p>{content}</p>
        </section>
    );
}