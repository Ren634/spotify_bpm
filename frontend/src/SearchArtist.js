import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { Heart } from "react-spinners-css";
import {
    Grid,
    CardContent,
    Typography,
    Button,
    Box,
    Stack,
    Card,
    Link,
} from "@mui/material";
import East from "@mui/icons-material/East";
import AudioPlayer from "./AudioPlayer";

function SearchArtist(props) {
    const [heartrate, setHeartRate] = useState();
    const [isLoding, setIsLoding] = useState(false);
    const [albumname, setAlbumname] = useState();
    const [trackname, setTrackname] = useState();
    const [tracktempo, setTracktempo] = useState("");
    const [previewURL, setPreviewURL] = useState();
    const [trackURL, setTrackURL] = useState();
    const [imageURL, setImageURL] = useState();
    const [isDone, setIsDone] = useState(false);
    const [isStart, setIsStart] = useState(false);
    const [artist] = useState(props.artist);
    const ref = useRef(true);
    const getHeartRate = () => {
        setIsStart(true);
        setIsLoding(true);
        axios.get("http://127.0.0.1:8000/HeartRate").then((res) => {
            setHeartRate(res.data.result);
            setIsLoding(false);
        });
        ref.current = false;
    };
    useEffect(() => {
        if (ref.current) return;
        setIsLoding(true);
        axios
            .get("http://127.0.0.1:8000/Trackinfo", {
                params: {
                    artist: artist,
                    heartrate: heartrate,
                },
            })
            .then((res) => {
                setAlbumname(res.data.result["album_info"]["name"]);
                setImageURL(res.data.result["album_info"]["images"][0]["url"]);
                setTrackname(res.data.result["track_name"]);
                setTracktempo(res.data.result["track_tempo"]);
                setPreviewURL(res.data.result["preview_url"]);
                setTrackURL(res.data.result["track_url"]);
            });
        setIsLoding(false);
        setIsDone(true);
    }, [heartrate, artist]);
    return (
        <div>
            <Grid container alignItems="center" direction="column">
                <Stack spacing={25}>
                    {isDone ? <></> : <Box />}
                    <Stack spacing={1} alignItems="center">
                        {isStart ? (
                            <></>
                        ) : (
                            <Box>
                                <Grid
                                    container
                                    alignItems="center"
                                    direction="column"
                                >
                                    <Typography
                                        color="text.secondary"
                                        variant="h5"
                                        align="center"
                                    >
                                        Put on sensors !
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        endIcon={<East />}
                                        onClick={getHeartRate}
                                    >
                                        NEXT
                                    </Button>
                                </Grid>
                            </Box>
                        )}
                        {isLoding ? (
                            <Box>
                                <Heart
                                    color="red"
                                    size={300}
                                    style={{ left: "45%" }}
                                />
                                <Typography
                                    variant="h2"
                                    color="text.secondary"
                                    align="center"
                                >
                                    In Measurement
                                </Typography>
                            </Box>
                        ) : (
                            <></>
                        )}
                        {isDone ? (
                            <Grid
                                container
                                alignItems="center"
                                direction="column"
                            >
                                <Card
                                    sx={{ maxWidth: 800 }}
                                    style={{ backgroundColor: "#fffafa" }}
                                >
                                    <Grid item margin={3}>
                                        <img src={imageURL} />
                                        <CardContent>
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                                align="center"
                                            >
                                                {albumname}
                                            </Typography>
                                            <Typography
                                                align="center"
                                                gutterBottom
                                                variant="h5"
                                                component="div"
                                            >
                                                <Link
                                                    href={trackURL}
                                                    color="inherit"
                                                    underline="hover"
                                                >
                                                    {trackname}
                                                </Link>
                                            </Typography>
                                            <Typography
                                                align="center"
                                                color="text.secondary"
                                            >
                                                HR:{parseInt(heartrate)} BPM:
                                                {parseInt(tracktempo)}
                                            </Typography>
                                            <Grid
                                                container
                                                alignItems="center"
                                                direction="column"
                                                margin={1}
                                            >
                                                <Grid item>
                                                    <AudioPlayer
                                                        previewURL={previewURL}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Grid>
                                </Card>
                            </Grid>
                        ) : (
                            <></>
                        )}
                    </Stack>
                </Stack>
            </Grid>
        </div>
    );
}

export default SearchArtist;
