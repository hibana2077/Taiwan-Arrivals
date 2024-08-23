from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
import requests
import redis
import os
import time
import uvicorn
import requests
import pandas as pd
from bs4 import BeautifulSoup
from fastapi.middleware.cors import CORSMiddleware

redis_server = os.getenv("REDIS_SERVER", "localhost")
redis_port = os.getenv("REDIS_PORT", 6379)
HOST = os.getenv("HOST", "127.0.0.1")

TARGET_URL = "https://stat.motc.gov.tw/mocdb/stmain.jsp?sys=220&ym=9001&ymt=11305&kind=21&type=1&funid=b710401&cycle=41&outmode=0&compmode=0&outkind=1&fldspc=0,26,&codspc0=0,10,&rdm=mAiUIglU"

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
    A function that scrapes data from the TARGET_URL.

    Returns:
        dict: A dictionary with the message "Data: 123".
    """
    response = requests.get(TARGET_URL)
    soup = BeautifulSoup(response.text, "html.parser")
    table = soup.find("table", {"class": "tblcls"})
    table_list = pd.read_html(str(table))
    static = ["年度", "所有類別總計"]
    new_table = pd.DataFrame(columns=static+[i[0] + i[1] for i in table_list[0].columns][2:])
    for idx in range(0, len(table_list[0]), 13):
        temp_list = []
        for col in table_list[0].columns:
            temp_list.append(table_list[0].iloc[idx:idx+1, :][col[0]][col[1]].values[0])
        new_table.loc[len(new_table)] = temp_list
    return new_table.to_dict()

if __name__ == "__main__":
    uvicorn.run(app, host=HOST, port=8081) # In docker need to change to 0.0.0.0