import React from 'react';
const PlayerDetails = (props) => {
    return ( 
        <div>
            PlayerDetails
            <button onClick={() => props.nextPage()} />
        </div>
     );
}
 
export default PlayerDetails;