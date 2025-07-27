import "./button.css";
export default function Button({buttonTitle, callback}) {
    return (
        <button className='button' onClick={callback}>{buttonTitle}</button>
    );
}