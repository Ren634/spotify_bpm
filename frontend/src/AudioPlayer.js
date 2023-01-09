import React from "react";

function AudioPlayer(props) {
    const volumeChange = (event) => {
        event.target.volume = 0.2;
    };
    if (props.previewURL === "") {
        return <></>;
    } else {
        return (
            <audio
                controls
                autoPlay
                src={props.previewURL}
                onCanPlay={volumeChange}
            ></audio>
        );
    }
}

export default AudioPlayer;
