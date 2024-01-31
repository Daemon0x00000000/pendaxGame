import {useEffect} from "react";


export const useKeyboard = (action) => {
    const handleKeyDown = (event) => {
        if (event.key.match(/[a-z]/i)) {
            action(event.key.toUpperCase())
        }
    }
    useEffect(() => {
        window.addEventListener('keyup', handleKeyDown)
        return () => {
            window.removeEventListener('keyup', handleKeyDown)
        }
    }, [])

}