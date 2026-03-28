function KeyConceptsComponent() {
    const [activeCard, setActiveCard] = state(null);
    const concepts = [
        { id: 'sdgs', title: 'Sustainable Development Goals', description: 'Global benchmarks for environmental protection and social equity. Firms adopt these to ensure long-term viability.', icon: 'globe' },
        { id: 'green-finance', title: 'Green Finance & Bonds', description: 'Capital directed toward eco-friendly projects, such as renewable energy and sustainable infrastructure.', icon: 'leaf' },
        { id: 'returns', title: 'Stock Performance', description: 'The ultimate financial metric—measuring how sustainability initiatives translate into shareholder value.', icon: 'trending-up' }
    ];

    effect(() => { lucide.createIcons(); }, [activeCard]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8 bg-slate-900 mt-8 rounded-2xl border border-slate-700/50 shadow-2xl">
            {concepts.map(concept => {
                const isHovered = activeCard === concept.id;
                return (
                    <div key={concept.id} onMouseEnter={() => setActiveCard(concept.id)} onMouseLeave={() => setActiveCard(null)} className={`relative p-6 rounded-2xl border bg-slate-800/80 backdrop-blur-sm cursor-pointer transition-all duration-300 ease-in-out ${isHovered ? '-translate-y-1 border-emerald-500/50 shadow-[0_8px_30px_rgb(16,185,129,0.15)]' : 'border-slate-700/50 hover:-translate-y-1'}`}>
                        <div className="flex items-center gap-4 mb-4">
                            <div className={`p-3 rounded-lg transition-colors duration-300 ${isHovered ? 'bg-emerald-500/10' : 'bg-slate-700/50'}`}>
                                <i data-lucide={concept.icon} className={`w-7 h-7 transition-colors duration-300 ${isHovered ? 'text-emerald-400' : 'text-slate-400'}`}></i>
                            </div>
                            <h3 className="text-xl font-semibold text-slate-100">{concept.title}</h3>
                        </div>
                        <p className="text-slate-400 leading-relaxed">{concept.description}</p>
                    </div>
                );
            })}
        </div>
    );
}
