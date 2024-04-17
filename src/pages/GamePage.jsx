import {useContext, useEffect, useReducer, useState} from "react";
import {StatsContext} from "../App.jsx";
import '../styles/game.css'
import {useKeyboard} from "../hooks/useKeyboard.js";
import {useNavigate} from "react-router-dom";


export const GamePage = () => {
    const [stats, setStats] = useContext(StatsContext)
    const [motProposer, setMotProposer] = useState('')
    const [pseudo, setPseudo] = useState('')
    const [capturing, setCapturing] = useState(false)
    const navigate = useNavigate();

    const gameReducer = (state, action) => {
        switch (action.type) {
            case 'FIND_WORD':
                return {
                    ...state,
                    score: (state.score + 2) + (state.word.length - state.lettersFound.length),
                    lettersFound: [...state.lettersFound, action.payload.letter]
                }
            case 'BAD_LETTER':
                return {
                    ...state,
                    letterFails: state.letterFails + 1
                }
            case 'GOOD_LETTER':
                if (state.lettersFound.includes(action.payload.letter)) {
                    return state
                }
                return {
                    ...state,
                    lettersFound: [...state.lettersFound, action.payload.letter]
                }
            case 'BAD_WORD':
                return {
                    ...state,
                    score: state.score - 2
                }
            case 'LOST':
                return {
                    ...state,
                    lost: true
                }
            case 'WON':
                return {
                    ...state,
                    won: true
                }
            case 'SET_WORD':
                return {
                    ...state,
                    word: action.payload.word
                }
            case 'RELOAD':
                return {
                    ...state,
                    word: '',
                    score: 0,
                    letterFails: 0,
                    lettersFound: [],
                    lost: false,
                    won: false
                }
            default:
                return state
        }
    }

    const [game, dispatch] = useReducer(gameReducer, {
        word: '',
        score: 0,
        letterFails: 0,
        lettersFound: [],
        lost: false,
        won: false
    })

    useEffect(() => {
        if (game.won === false && game.lost === false && game.word === ''){
            fetch('https://trouve-mot.fr/api/random')
                .then(response => response.json())
                .then(data => {
                    dispatch({type: 'SET_WORD', payload: {word: data[0].name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase()}})
                    console.log(
                        data[0].name.toUpperCase()
                    );
                })
        }
        console.log(game.won,game.lost, 'STATUT');
    }, [game.won, game.lost]);

    const handleLetterClick = (letter) => {
        if (capturing || game.won || game.lost) return
        // Check if it's letter and not special character
        letter = letter.toUpperCase()
        if ('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.includes(letter) === false) return
        // Unaccent word
        if (game.word.includes(letter)) {
            dispatch({type: 'GOOD_LETTER', payload: {letter: letter}})
            if (game.word.length === game.lettersFound.length + 1) {
                dispatch({type: 'WON'})
            }
        } else {
            dispatch({type: 'BAD_LETTER'})
            if (game.letterFails === 6) {
                dispatch({type: 'LOST'})
            }
        }
    }

    const handleWordClick = () => {

        if (game.word.includes(motProposer)) {
            dispatch({type: 'FIND_WORD', payload: {word: motProposer}})
            dispatch({type: 'WON'})
            setStats({...stats, score: stats.score + game.score})
        } else {
            dispatch({type: 'BAD_WORD'})
        }
        setMotProposer('')
    }

    const reload = () => {
        dispatch({type: 'RELOAD'})
    }

    const saveScore = () => {
        if (pseudo === '') return
        console.log(stats)
        if (stats.scores && stats.scores.find(score => score.name === pseudo)) {
            setStats({...stats, scores: stats.scores.map(score => {

                if (score.name === pseudo) {
                    return {
                        ...score,
                        score: score.score + game.score
                    }
                } else {
                    return score
                }
            })})
        } else {

            setStats({...stats, scores: [
                ...stats.scores,
                {
                    name: pseudo,
                    score: game.score
                }
            ]})
        }
        navigate('/stats')
    }

    useKeyboard(handleLetterClick)
    return (
        <>
            {!game.lost && !game.won && (
            <div>
                <h1 className="score">Score: {game.score}</h1>
                {game.word.split('').map((letter, index) => {
                        return (
                            <div className={`letter ${game.lettersFound.includes(letter) ? 'found' : ''}`} key={index}>
                                <div className="letter_back"></div>
                                <span className="letter_front">{
                                    game.lettersFound.includes(letter) ? letter : '_'
                                }</span>
                            </div>

                        )
                })}

                <img className="pendu" src={`${game.letterFails}.png`} alt="pendu"/>

                <div className="keyboard">
                {'abcdefghijklmnopqrstuvwxyz'.split('').map((letter, index) => {
                    if (game.lettersFound.includes(letter)) {
                        return <span key={index} className="keyboard__letter keyboard__found">{letter}</span>
                    } else {
                        return <span key={index} className="keyboard__letter" onClick={() => handleLetterClick(letter)}>{letter}</span>
                    }
                })}
                </div>

                <div className="motEnter">
                    <input onFocus={() => setCapturing(true)} onBlur={() => {
                        setCapturing(false)
                    }} value={motProposer} type="text" placeholder="Proposer un mot" onKeyUp={(event) => {
                        if (event.key === 'Enter') {
                            handleWordClick()
                        }
                    }} onChange={(event) => setMotProposer(event.target.value.toUpperCase())}/>
                    <button onClick={handleWordClick}>Proposer</button>
                </div>
            </div>
            )}
            {game.lost && !game.won && (
                <div className="won">
                    <h1>Perdu !</h1>
                    <button onClick={reload}>Rejouer</button>
                </div>
            )}
            {!game.lost && game.won && (
                <div className="won">
                    <h1>Gagné !</h1>
                    <div className="score">Score: {game.score}</div>
                    <input onFocus={() => setCapturing(true)} onBlur={() => setCapturing(false)} type="text" placeholder="Pseudo" value={pseudo} onChange={(event) => setPseudo(event.target.value)}
                            onKeyUp={(event) => {
                                 if (event.key === 'Enter') {
                                      saveScore()
                                 }
                            }}
                    style={{
                        marginBottom: '1rem',
                        backgroundColor: 'white',
                        color: 'black',
                        padding: '0.5rem',
                        borderRadius: '5px',
                    }}/>
                    <div className="actions">
                        <button onClick={reload}>Rejouer</button>
                        <button onClick={saveScore}>Sauvegarder</button>
                    </div>
                </div>
            )}
        </>
    )
}
