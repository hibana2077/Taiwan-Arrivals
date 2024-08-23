from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
import requests
import redis
import os
import time
import uvicorn
import requests
from bs4 import BeautifulSoup
from fastapi.middleware.cors import CORSMiddleware

redis_server = os.getenv("REDIS_SERVER", "localhost")
redis_port = os.getenv("REDIS_PORT", 6379)
HOST = os.getenv("HOST", "127.0.0.1")

counter_db = redis.Redis(host=redis_server, port=redis_port, db=0) # string

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    """
    A function that handles the root endpoint.

    Returns:
        dict: A dictionary with the message "Hello: World".
    """
    return {"Hello": "World"}

@app.get("/data")
def get_data():
    """
    A function that handles the data endpoint.

    Returns:
        dict: A dictionary with the message "Data: 123".
    """
    return {"Data": "123"} # mock data

if __name__ == "__main__":
    uvicorn.run(app, host=HOST, port=8081) # In docker need to change to 0.0.0.0