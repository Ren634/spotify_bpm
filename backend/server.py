from flask import *
from search import getTrackinfo
from flask_cors import CORS
from heartrate import get_heart_rate
app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])


@app.route("/Trackinfo", methods=["GET"])
def return_trackinfo():
    response = {"result": getTrackinfo(request.args["artist"], request.args.get("heartrate", type=float))}
    return make_response(jsonify(response))


@app.route("/HeartRate", methods=["GET"])
def return_heartrate():
    response = {"result": get_heart_rate()}
    return make_response(jsonify(response))


@app.after_request
def after_request(response):
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add("Access-Control-Allow-Headers", "*")
    response.headers.add("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS")
    return response


if __name__ == "__main__":
    app.run(port=8000, debug=True)
