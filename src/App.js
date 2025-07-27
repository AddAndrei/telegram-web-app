import './App.css';
import Header from "./components/Header";
import SectionTeaching from "./components/Sections/SectionTeaching";
import DifferencesSection from "./components/Sections/DifferencesSection";

export default function App() {

    return (
        <>
            <Header/>
            <main>
                <SectionTeaching/>
                <DifferencesSection/>
            </main>
        </>

    );
}
