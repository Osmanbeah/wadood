function DataInsightsComponent() {
    const [hoveredPoint, setHoveredPoint] = state(null);
    const [mousePos, setMousePos] = state({ x: 0, y: 0 });
    const [isDrawn, setIsDrawn] = state(false);

    effect(() => {
        const timer = setTimeout(() => setIsDrawn(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const dataPoints = [ { x: 20, y: 4 }, { x: 40, y: 5.5 }, { x: 60, y: 8 }, { x: 80, y: 11.5 }, { x: 100, y: 14 } ];
    const width = 800, height = 400;
    const padding = { top: 40, right: 40, bottom: 40, left: 50 };
    const mapX = (val) => padding.left + (val / 100) * (width - padding.left - padding.right);
    const mapY = (val) => height - padding.bottom - (val / 15) * (height - padding.top - padding.bottom);
    const pathData = dataPoints.map((point, index) => `${index === 0 ? 'M' : 'L'} ${mapX(point.x)} ${mapY(point.y)}`).join(' ');

    const handleMouseMove = (e) => { if (hoveredPoint !== null) setMousePos({ x: e.clientX, y: e.clientY }); };

    return (
        <div className="relative w-full max-w-4xl mx-auto p-6 bg-slate-900 rounded-2xl border border-slate-700/50 shadow-2xl overflow-visible my-12" onMouseMove={handleMouseMove}>
            <h2 className="text-2xl font-bold text-slate-100 mb-2">Sustainable Returns Projection</h2>
            <p className="text-sm text-slate-400 mb-6">Correlation between ESG ratings and projected annual growth.</p>
            
            <div className="absolute top-20 right-8 p-3 bg-slate-800/90 backdrop-blur-md rounded-xl border border-slate-700 flex flex-col gap-3 z-10 shadow-lg">
                <div className="flex items-center gap-3"><div className="w-5 h-1.5 bg-emerald-500 rounded-full" /><span className="text-xs font-semibold text-slate-300">Green Portfolio</span></div>
                <div className="flex items-center gap-3"><div className="w-5 border-t-2 border-dashed border-slate-500" /><span className="text-xs font-semibold text-slate-400">Market Baseline</span></div>
            </div>

            <div className="relative aspect-[2/1] w-full">
                <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
                    <line x1={padding.left} y1={mapY(6)} x2={width - padding.right} y2={mapY(7)} stroke="#64748b" strokeWidth="2" strokeDasharray="6,6" className="opacity-70" />
                    <text x={width - padding.right - 5} y={mapY(7) - 8} textAnchor="end" className="text-[10px] fill-slate-400 font-semibold tracking-wide">Market Baseline</text>

                    {[0, 5, 10, 15].map(val => (
                        <g key={`y-${val}`}><line x1={padding.left} y1={mapY(val)} x2={width - padding.right} y2={mapY(val)} stroke="#334155" strokeWidth="1" opacity="0.5" /><text x={padding.left - 12} y={mapY(val) + 4} className="text-xs fill-slate-500 font-medium" textAnchor="end">{val}%</text></g>
                    ))}
                    {[0, 20, 40, 60, 80, 100].map(val => (
                        <g key={`x-${val}`}><line x1={mapX(val)} y1={padding.top} x2={mapX(val)} y2={height - padding.bottom} stroke="#334155" strokeWidth="1" opacity="0.3" strokeDasharray="4,4" /><text x={mapX(val)} y={height - padding.bottom + 24} className="text-xs fill-slate-500 font-medium" textAnchor="middle">{val}</text></g>
                    ))}

                    <path d={pathData} fill="none" stroke="#10b981" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-[0_4px_16px_rgba(16,185,129,0.3)] transition-all ease-in-out" style={{ strokeDasharray: 1000, strokeDashoffset: isDrawn ? 0 : 1000, transitionDuration: '1.5s' }} />

                    {dataPoints.map((point, index) => {
                        const isHovered = hoveredPoint === index;
                        return (
                            <circle key={index} cx={mapX(point.x)} cy={mapY(point.y)} r={isHovered ? 8 : 5} fill="#0f172a" stroke={isHovered ? "#34d399" : "#10b981"} strokeWidth="3" className={`transition-all duration-300 cursor-pointer ${isDrawn ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: isDrawn ? `${0.3 + index * 0.25}s` : '0s' }} onMouseEnter={(e) => { setHoveredPoint(index); setMousePos({ x: e.clientX, y: e.clientY }); }} onMouseLeave={() => setHoveredPoint(null)} />
                        );
                    })}
                </svg>

                {hoveredPoint !== null && (
                    <div className="fixed pointer-events-none z-50 bg-slate-800/95 backdrop-blur-md p-4 rounded-xl border border-emerald-500/40 shadow-[0_8px_32px_rgba(16,185,129,0.2)] transform -translate-x-1/2 -translate-y-[120%] transition-opacity duration-200" style={{ left: mousePos.x, top: mousePos.y }}>
                        <div className="flex flex-col gap-1 min-w-[120px]">
                            <div className="flex justify-between items-center"><span className="text-xs text-slate-400 font-medium">ESG Target</span><span className="font-bold text-slate-100">{dataPoints[hoveredPoint].x}</span></div>
                            <div className="w-full h-px bg-slate-700/50 my-1" />
                            <div className="flex justify-between items-center"><span className="text-xs text-slate-400 font-medium">Projected ROI</span><span className="font-bold text-emerald-400">+{dataPoints[hoveredPoint].y}%</span></div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
