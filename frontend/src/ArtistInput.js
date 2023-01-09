import React, { useState } from "react";
import { Button, Input, Stack, Box } from "@mui/material/";
import East from "@mui/icons-material/East";
import Grid from "@mui/material/Unstable_Grid2";
function ArtistInput(props) {
    const [artistname, setArtistName] = useState("");
    const submitArtist = () => {
        props.setArtistName(artistname);
    };
    return (
        <div className="ArtistInput">
            <Grid container direction="column">
                <Stack spacing={25}>
                    <Box />
                    <Stack spacing={1} alignItems="center">
                        <Input
                            placeholder="Artist"
                            autoFocus={true}
                            fullWidth={true}
                            value={artistname}
                            onChange={(event) => {
                                setArtistName(event.target.value);
                            }}
                            type="text"
                        />
                        <Button
                            variant="contained"
                            endIcon={<East />}
                            onClick={submitArtist}
                        >
                            NEXT
                        </Button>
                    </Stack>
                </Stack>
            </Grid>
        </div>
    );
}
export default ArtistInput;
