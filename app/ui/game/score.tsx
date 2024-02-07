export default function Score({score}: {score: number}) {
    return (
        <div className="p-[10px] border-2 w-full">
            <p className="text-center text-2xl bg-white text-black w-full">SCORE</p>
            <p className="text-center text-2xl p-2 w-full">
                {score}
            </p>
        </div>
    )
}