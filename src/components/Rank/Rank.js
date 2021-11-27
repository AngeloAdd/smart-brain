import React from "react";

const Rank = ({user}) => {
    return (
        <div  className="flex flex-column justify-center items-center mv2 w-100">
            <p className="mb0 f3 white">
                {user.username + ' your current rank is:'}
            </p>
            <p className="bg-animate white hover-bg-moon-gray hover-black f3 ba br-100 pa2">
                {'#' + user.rank}
            </p>
        </div>
    )
}

export default Rank