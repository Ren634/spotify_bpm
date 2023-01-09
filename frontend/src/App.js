import React, { useEffect, useState } from "react";
import SearchArtist from "./SearchArtist";
import ArtistInput from "./ArtistInput";
import Grid from "@mui/material/Unstable_Grid2";

function App() {
    const [artistname, setArtistName] = useState("");
    const [isEmpty, setIsEmpty] = useState(true);
    useEffect(() => {
        if (artistname === "") return;
        setIsEmpty(false);
    }, [artistname]);
    return (
        <div className="App">
            <Grid container justify="center" alignItems="center">
                <Grid item xs={4} />
                <Grid item xs={4}>
                    {isEmpty ? (
                        <ArtistInput setArtistName={setArtistName} />
                    ) : (
                        <SearchArtist artist={artistname} />
                    )}
                </Grid>
                <Grid item xs={4} />
            </Grid>
        </div>
    );
}

export default App;
