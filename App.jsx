function App() {
    return (
        <div className="min-h-screen pb-20">
            <header className="bg-slate-900/50 backdrop-blur-md border-b border-emerald-500/20 sticky top-0 z-40">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                    <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">Eco-Finance SPA</h1>
                </div>
            </header>
            <main className="max-w-6xl mx-auto px-6 mt-12">
                <div className="text-center mb-16 shadow-lg rounded-2xl bg-slate-800/50 p-8 border border-slate-700/50">
                    <h2 className="text-4xl font-extrabold mb-4 text-white">Impact of SDGs & Green Finance on Stock Returns</h2>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto">Explore the direct correlation between sustainability initiatives and shareholder value in modern financial markets.</p>
                </div>
                
                {/* These components are loaded from the other files! */}
                <KeyConceptsComponent />
                <DataInsightsComponent />
            </main>
        </div>
    );
}

// Draw the App to the screen
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
