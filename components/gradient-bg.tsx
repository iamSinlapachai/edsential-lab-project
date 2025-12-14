export default function GradientBG() {
    return (
        <div>
            {/* --- Background Elements --- */}
            <div className="absolute inset-0 -z-10 h-full w-full pointer-events-none">
                <div className="absolute top-0 right-0 -mr-20 -mt-20 h-[500px] w-[500px] rounded-full bg-purple-600/20 blur-[100px]" />
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-[500px] w-[500px] rounded-full bg-fuchsia-600/20 blur-[100px]" />
            </div>
        </div>
    )
}
