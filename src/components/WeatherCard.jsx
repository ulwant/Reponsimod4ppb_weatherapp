function WeatherCard({title,value,children}){
    return(
        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-5 text-white shadow-lg space-y-1">
            <p className="text-sm font-medium opacity-70">{title}</p>
            <div className="text-2xl font-semibold">{value}</div>
            {children && (
                <div className="mt-1 text-sm opacity-80">{children}</div>
            )}
        </div>
    )
}

export default WeatherCard;