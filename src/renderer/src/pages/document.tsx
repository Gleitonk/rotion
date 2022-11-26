import { Link } from "react-router-dom";

export function Document() {
    return (
        <main className="flex-1 flex items-center justify-center text-rotion-400">
            Selecione ou crie um documento

            <Link to="/">Blank</Link>
        </main>
    )
}
