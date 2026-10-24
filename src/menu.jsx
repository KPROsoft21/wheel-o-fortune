import './Menu.css';
import wheel from './assets/menu-wheel.svg'

function Menu({ onStart }) {
    return (
        <div className='Menu'>
            <h1>Wheel Of Fortune!</h1>

            <div className='wheel-container'>
                {/* The wheel svg */}
                <img src={wheel} alt="Wheel of Fortune" className="menu-wheel">

                </img>

                {/* When the button is clicked it will call the onStart function defined
                    inside of App.jsx */}
                <button onClick={onStart} className='btn'>
                    Play
                </button>
            </div>


        </div>
    )
}

export default Menu;