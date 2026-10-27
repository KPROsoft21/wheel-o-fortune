import './Menu.css';
import wheel from './assets/menu-wheel.svg'

function Menu({ onStart }) {
    return (
        <div className='Menu'>
            <h1>Wheel Of Fortune!</h1>

            <div className='wheel-container'>
                {/* The wheel svg */}
                <img src={wheel} alt="Colorful game wheel" className="menu-wheel">

                </img>
                <div className="menu-pointer" aria-hidden="true" />

                {/* When the button is clicked it will call the onStart function defined
                    inside of App.jsx */}
                <button onClick={onStart} className='btn'>
                    Start
                </button>
            </div>


        </div>
    )
}

export default Menu;
