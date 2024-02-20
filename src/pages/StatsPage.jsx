import {useContext, useEffect} from "react";
import {StatsContext} from "../App.jsx";


export const StatsPage = () => {
    const [stats, setStats] = useContext(StatsContext)

    useEffect(() => {
        console.log(stats);
    }, []);

    return (
        <div>
            <h1>Stats Page</h1>
            {!stats || stats.scores.length === 0 ? <p>No stats yet</p> : (
            <table className={"statsTable"}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    {stats.scores.sort((a, b) => b.score - a.score).map((stat, index) => (
                        <tr key={index}>
                            <td>{stat.name}</td>
                            <td>{stat.score}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            )}
        </div>
    )
}
