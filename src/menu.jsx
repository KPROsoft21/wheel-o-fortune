import './Menu.css';
import wheel from './assets/menu-wheel.svg'

function Menu({ onStart }) {
    return (
        <div className='Menu'>
            <div className="menu-frame">
                <div className="menu-frame-inner">
                    <h1>Wheel Of Fortune!</h1>

                    <div className='wheel-container'>
                        <img src={wheel} alt="Colorful game wheel" className="menu-wheel" />
                        <div className="menu-pointer" aria-hidden="true" />
                        <button onClick={onStart} className='btn'>
                            Start
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Menu;
