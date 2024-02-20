import { NavLink } from "react-router-dom";

const checkIsActive = (params) => {
    return {
        color: params.isActive ? 'orange' : 'black',
        backgroundColor: params.isActive ? 'grey' : 'white'
    }
}

const Nav = () => {
    return (
        <nav>
            <ul>
                <li>
                    <NavLink style={checkIsActive} to="/home">Accueil</NavLink>
                </li>
                <li>
                    <NavLink style={checkIsActive} to="/game">Jouer</NavLink>
                </li>
                <li>
                    <NavLink style={checkIsActive} to="/stats">Statistiques</NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Nav