export const Header = () => {
    return (
        <>
        <div className="bg-gradient-to-b from-slate-800 via-slate-750 to-slate-800">
            <div className="container mx-auto px-4 py-10">
            {/* Header com tema Rick and Morty */}
                <div className="text-center">
                <h1 className="text-6xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-500 to-purple-600">
                    Rick and Morty
                </h1>
                <p className="text-cyan-300 text-xl max-w-2xl mx-auto">
                    Explore o multiverso e descubra todos os personagens desta incrível série
                </p>
                </div>
            </div>
        </div>
        </>
    )

}