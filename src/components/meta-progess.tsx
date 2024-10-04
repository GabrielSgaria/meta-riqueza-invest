interface MetaProgressProps {
    totalInvested: number;
    target: number;
}


export function MetaProgress({ totalInvested, target }: MetaProgressProps) {
    const progress = (totalInvested / target) * 100;
    return (
        <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
            <div
                className="bg-green-500 h-4 rounded-full"
                style={{ width: `${progress}%` }}>

            </div>
        </div>
    )
}