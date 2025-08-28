import "./Button.module.css";
export default function Button({buttonTitle, callback, type}) {
    return (
        <button className='button' onClick={callback} type={type}>{buttonTitle}</button>
    );
}