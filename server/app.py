from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.get('/health')
def health():
    return jsonify({"ok": True, "service": "weiz-training-api"})

# TODO: add auth, CRUD, submit record, report endpoints

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8799)
