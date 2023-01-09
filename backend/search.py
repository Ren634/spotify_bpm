import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import numpy as np

client_id = ""
client_secret = ""

client_credentials_manager = SpotifyClientCredentials(client_id, client_secret)


def getTrackinfo(name, heart_rate):
    sp = spotipy.Spotify(auth_manager=client_credentials_manager)
    artist_result = sp.search(name, type="artist")["artists"]["items"][0]
    artist_id = artist_result["id"]
    artist_album_info = {}
    album_id = []
    for item in sp.artist_albums(artist_id)["items"]:
        artist_album_info[str(item["id"])] = item
        album_id += [item["id"]]
    album_track_id = {}
    track_id = []
    track_name = {}
    track_infos = {}
    for id in album_id:
        for track_info in sp.album_tracks(id)["items"]:
            track_infos[str(track_info["id"])] = track_info
            track_name[str(track_info["id"])] = track_info["name"]
            track_id += [track_info["id"]]
            album_track_id[str(track_info["id"])] = id
    features = []
    for i in range(0, len(track_id), 100):
        features += sp.audio_features(track_id[i:i + 100])
    track_tempo = []
    for feature in features:
        if(feature is None):
            track_tempo += [1000]
        else:
            track_tempo += [feature["tempo"]]
    index = np.abs(np.array(track_tempo) - heart_rate).argsort()[0]
    selected_track = track_id[index]
    preview_url = "" if track_infos[selected_track]["preview_url"] is None else track_infos[selected_track]["preview_url"]
    result = {
        "album_info": artist_album_info[album_track_id[selected_track]],
        "track_name": track_name[selected_track],
        "track_tempo": track_tempo[index],
        "preview_url": preview_url,
        "track_url": track_infos[selected_track]["external_urls"]["spotify"]
    }
    return result
