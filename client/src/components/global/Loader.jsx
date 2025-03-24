const Loader = () => {
    return (
        <div className="flex justify-center items-center h-screen bg-[#212121] ">
            <div className="relative flex items-center justify-center w-24 h-24 border-[16px] border-dark border-opacity-5 rounded-full shadow-inner shadow-gray-800">
                <span className="absolute w-4 h-4 bg-gray-600 rounded-full animate-orbit" style={{ animationDelay: '0s' }}></span>
                <span className="absolute w-4 h-4 bg-gray-600 rounded-full animate-orbit" style={{ animationDelay: '0.02s' }}></span>
                <span className="absolute w-4 h-4 bg-gray-600 rounded-full animate-orbit" style={{ animationDelay: '0.04s' }}></span>
                <span className="absolute w-4 h-4 bg-gray-400 rounded-full animate-orbit"></span>
                <span className="absolute text-gray-400 text-xs font-light opacity-0 transition-opacity duration-200 hover:opacity-100">
                    loading...
                </span>
            </div>
        </div>
    );
};

export default Loader;