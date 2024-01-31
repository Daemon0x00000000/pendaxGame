import { NavLink } from "react-router-dom";

const checkIsActive = (params) => {
    console.log(params)
    return {
        color: params.isActive ? 'red' : 'black',
        backgroundColor: params.isActive ? 'yellow' : 'white'
    }
}

const Nav = () => {
    return (
        <nav>
            <ul>
                <li>
                    <NavLink style={checkIsActive} to="/GamePage">Jeux du pendu</NavLink>
                </li>
                <li>
                    <NavLink style={checkIsActive} to="/stats">Statistique</NavLink>
                </li>
                <li>
                    <NavLink style={checkIsActive} to="/Home">Home</NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Nav