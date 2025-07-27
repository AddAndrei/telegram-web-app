import {ways} from "../../data";
import WayToTeach from "../WayToTeach";

export default function SectionTeaching() {
    return (
        <section>
            <h3>Наш подход к обучению</h3>
            <ul>
                {ways.map((item,i) => <WayToTeach key={i} title={item.title} description={item.description}/>)}
            </ul>
        </section>
    );
}