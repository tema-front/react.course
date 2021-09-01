import '../../App.css'

export const Message = (props) => {

    return (
        <p className="message"> 
            {props.message.author}: {props.message.text}
        </p>
    )
};  