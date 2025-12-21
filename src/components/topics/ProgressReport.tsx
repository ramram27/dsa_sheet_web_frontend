'use client'

const ProgressReport = () => {
    const isBrowser = typeof window !== "undefined";
    const easy = isBrowser
        ? JSON.parse(localStorage.getItem("easy") || "0")
        : 0;

    const medium = isBrowser
        ? JSON.parse(localStorage.getItem("medium") || "0")
        : 0;

    const hard = isBrowser
        ? JSON.parse(localStorage.getItem("hard") || "0")
        : 0;

    return (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800 flex items-center">
                    Progress Report
                </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">Easy Topics</h4>
                    <div className="text-2xl font-bold text-green-600 mb-2">
                        {easy}%
                    </div>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-yellow-800 mb-2">Medium Topics</h4>
                    <div className="text-2xl font-bold text-yellow-600 mb-2">
                        {medium}%
                    </div>
                </div>

                <div className="bg-red-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-red-800 mb-2">Hard Topics</h4>
                    <div className="text-2xl font-bold text-red-600 mb-2">
                        {hard}%
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProgressReport;












