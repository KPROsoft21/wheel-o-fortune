import './Menu.css';
import wheel from './assets/menu-wheel.svg'

function Menu({ onStart }) {
    return (
        <div className='Menu'>
            <h1>Wheel Of Fortune!</h1>

            <div className='wheel-container'>
                <img src={wheel} alt="Wheel of Fortune" className="menu-wheel">

                </img>

                <button onClick={onStart} className='btn'>
                    Play
                </button>
            </div>


        </div>
    )
}

export default Menu;