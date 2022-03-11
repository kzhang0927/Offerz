from typing import Optional, List
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

if __name__ == "__main__":
    uvicorn.run("server.app:app", host="0.0.0.0", port=8000, reload=True)