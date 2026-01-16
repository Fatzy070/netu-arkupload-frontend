import React from 'react';

const Loading = () => {
    return (
     
        <div className="flex justify-center items-center ">
            <section className='border-2 border-gray-300 rounded-full animate-bounce'>
                <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-white"></div>
            </section>
      </div>

    );
};

export default Loading;