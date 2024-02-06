import React from "react";

export const Character = ({ user = "brenda" }) => {
  return (
    <div>
      {user === "brenda" ? (
        <img
          src="https://res.cloudinary.com/dz9smi3nc/image/upload/v1706477479/twitch_api_to_take_roll/Sin-t%C3%ADtulo-1_ttywax.gif"
          alt="brenda"
        />
      ) : (
        <></>
      )}
    </div>
  );
};
