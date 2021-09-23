import '../../style/App.css'

export const Message = ({ messagesList }) => {
    return (
        <div className="textSpace">
            {messagesList?.map((message, i) => <p className="message" key={i}>{message.author}: {message.text}</p>)}
        </div>
    )
};  