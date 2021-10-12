import { CircularProgress } from '@material-ui/core/';
import { MyButton } from "../UI/button/MyButton"
import { signOut } from '../../services/firebase'

export const Header = ({ headerName, loading, logout }) => {
    const onLogout = async () => {
        await signOut()
    }

    return (
        <header className='chatsHDR'>
            <hr className='headerUnderLine' /> 
                <div className='headerContent'>
                    <h2 className='headerNews textColor'>{ headerName }</h2>
                    {logout && <MyButton onClick={onLogout} style={{'maxHeight': '35px', 'marginLeft': '40px', 'marginTop': '42px'}}>Logout</MyButton>}
                    {loading && <CircularProgress className='circularProgress'/>}
                </div> 
            <hr className='headerUnderLine' />
        </header>
    );
}

