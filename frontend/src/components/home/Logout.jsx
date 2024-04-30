import React from 'react';

const Logout = () => {
    const handleSubmit = async (e) => {
        localStorage.clear();
        window.location.href = "/login";
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-50 to-indigo-400">
            <div className="bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Confirmer votre déconnexion</h2>
                <button 
                    type="submit" 
                    onClick={handleSubmit} 
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full focus:outline-none focus:shadow-outline transition duration-300"
                >
                    Confirmer
                </button>
            </div>
        </div>
    );
};

export default Logout;
