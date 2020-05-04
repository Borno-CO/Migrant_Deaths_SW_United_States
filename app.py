from flask import Flask, jsonify
import psycopg2
from psycopg2.extras import RealDictCursor
import json
import datetime
from flask_cors import CORS


conn = psycopg2.connect(user = "zeqidumhuulbsx",
                              password = "0ff410eb9f726fac7c0cc90783d0d2de8441ca79371cda90082105c2d763bcc9",
                              host = "ec2-174-129-33-107.compute-1.amazonaws.com",
                              port = "5432",
                              database = "dc4ihr1is83988")

cur = conn.cursor(cursor_factory=RealDictCursor)

def myconverter(o):
    if isinstance(o, datetime.datetime):
        return o.__str__()

## Flask setup
app = Flask(__name__)
CORS(app)

@app.route("/")
def welcome():
    return "Home Page of DB"

@app.route("/api/v1/migrant_incidents")
def crossings_by_year():
    cur.execute("select * from migrant_incident_detail")
    dumps = json.dumps(cur.fetchall(), default=str)
    return dumps

@app.route("/api/v1/summary_crossings")
def summary_post():
    conn = psycopg2.connect(user = "zeqidumhuulbsx",
                              password = "0ff410eb9f726fac7c0cc90783d0d2de8441ca79371cda90082105c2d763bcc9",
                              host = "ec2-174-129-33-107.compute-1.amazonaws.com",
                              port = "5432",
                              database = "dc4ihr1is83988")

    cur = conn.cursor(cursor_factory=RealDictCursor)
    cur.execute("select * from summary_crossings_by_port_year")
    dumps = json.dumps(cur.fetchall(), indent=2)
    return dumps
    
if __name__ == "__main__":  
    app.run(debug=True)