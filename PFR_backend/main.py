# from fastapi import FastAPI, UploadFile, Form
# from fastapi.middleware.cors import CORSMiddleware
# from pydantic import BaseModel
# from typing import List, Optional
# from fastapi.responses import FileResponse
# from datetime import datetime
# import pandas as pd
# import os
 
# app = FastAPI()
 
# # CORS setup to allow frontend requests
# app.add_middleware(
#     CORSMiddleware,
#     # allow_origins=["*"],  # You can restrict this in production
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# print("Hii")
 
# # Output Excel file name
# RESPONSES_FILE = "user_responses.xlsx"
 
# # Define answer format
# class Answer(BaseModel):
#     question: str
#     choice: str
#     justification: Optional[str] = ""
 
# # Define submission structure
# class Submission(BaseModel):
#     answers: List[Answer]
 
# # Endpoint to submit form responses
# @app.post("/submit/")
# def submit_form(data: Submission):
#     rows = []
#     for i, answer in enumerate(data.answers):
#         rows.append({
#             "Timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
#             "Q#": i + 1,
#             "Question": answer.question,
#             "Answer": answer.choice,
#             "Justification": answer.justification or ""
#         })
#     df = pd.DataFrame(rows)
 
#     # Append to existing Excel if exists
#     if os.path.exists(RESPONSES_FILE):
#         existing = pd.read_excel(RESPONSES_FILE)
#         df = pd.concat([existing, df], ignore_index=True)
 
#     df.to_excel(RESPONSES_FILE, index=False)
#     return {"message": "Saved successfully"}
 
# # Endpoint to get the full history
# @app.get("/history/")
# def get_history():
#     if os.path.exists(RESPONSES_FILE):
#         return FileResponse(RESPONSES_FILE, filename="user_responses.xlsx", media_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
#     return {"error": "No history available"}

 
# # Add this to run on port 8000
# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

# from fastapi import FastAPI, UploadFile, Form
# from fastapi.middleware.cors import CORSMiddleware
# from pydantic import BaseModel
# from typing import List, Optional
# from fastapi.responses import FileResponse
# from datetime import datetime
# import pandas as pd
# import os

# app = FastAPI(
#     title="Form Submission API",
#     description="API to handle form submissions and history viewing",
#     version="1.0.0"
# )

# # CORS setup to allow frontend requests
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],  # In production, replace with frontend URL
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # Output Excel file name
# RESPONSES_FILE = "user_responses.xlsx"

# # ✅ Base route to test API
# @app.get("/")
# def read_root():
#     return {"message": "Hello World - FastAPI is running!"}

# # Define answer format
# class Answer(BaseModel):
#     question: str
#     choice: str
#     justification: Optional[str] = ""

# # Define submission structure
# class Submission(BaseModel):
#     answers: List[Answer]

# # Endpoint to submit form responses
# # @app.post("/submit/")
# # def submit_form(data: Submission):
# #     rows = []
# #     for i, answer in enumerate(data.answers):
# #         rows.append({
# #             "Timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
# #             "Q#": i + 1,
# #             "Question": answer.question,
# #             "Answer": answer.choice,
# #             "Justification": answer.justification or ""
# #         })
# #     df = pd.DataFrame(rows)


# @app.post("/submit/")
# def submit_form(data: Submission):
#     rows = []

#     # Load existing file if it exists
#     submission_number = 1
#     if os.path.exists(RESPONSES_FILE):
#         try:
#             existing = pd.read_excel(RESPONSES_FILE)
#             if "Response Number" in existing.columns:
#                 # Count distinct response numbers
#                 existing_responses = existing["Response Number"].dropna().unique()
#                 submission_number = len(existing_responses) + 1
#         except Exception as e:
#             print("Error reading existing file:", e)

#     timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

#     for i, answer in enumerate(data.answers):
#         rows.append({
#             "Form Number": f"{submission_number}",
#             "Timestamp": timestamp,
#             "Q#": i + 1,
#             "Question": answer.question,
#             "Answer": answer.choice,
#             "Justification": answer.justification or ""
#         })

#     df = pd.DataFrame(rows)

#     # Append to existing Excel if exists
#     if os.path.exists(RESPONSES_FILE):
#         existing = pd.read_excel(RESPONSES_FILE)
#         df = pd.concat([existing, df], ignore_index=True)

#     df.to_excel(RESPONSES_FILE, index=False)
#     return {"message": "Saved successfully"}

# # Endpoint to get the full history
# @app.get("/history/")
# def get_history():
#     if os.path.exists(RESPONSES_FILE):
#         return FileResponse(RESPONSES_FILE, filename="user_responses.xlsx", media_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
#     return {"error": "No history available"}



from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from fastapi.responses import FileResponse
from datetime import datetime
import pandas as pd
import os

app = FastAPI(
    title="Form Submission API",
    description="API to handle form submissions and history viewing",
    version="1.0.0"
)

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Excel filenames
FILE_MAP = {
    "ETL": "etl_responses.xlsx",
    "BI": "bi_responses.xlsx"
}

class Answer(BaseModel):
    question: str
    choice: str
    justification: Optional[str] = ""

class Submission(BaseModel):
    test_type: str  # ETL or BI
    answers: List[Answer]

@app.get("/")
def read_root():
    return {"message": "Hello World - FastAPI is running!"}

@app.post("/submit/")
def submit_form(data: Submission):
    test_type = data.test_type.upper()

    if test_type not in FILE_MAP:
        raise HTTPException(status_code=400, detail="Invalid test type")

    file_name = FILE_MAP[test_type]
    rows = []
    submission_number = 1

    if os.path.exists(file_name):
        existing = pd.read_excel(file_name)
        if "Response Number" in existing.columns:
            submission_number = existing["Response Number"].nunique() + 1

    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    for i, ans in enumerate(data.answers):
        rows.append({
            f"{test_type} Form": f"form {submission_number}",
            "Timestamp": timestamp,
            "Q#": i + 1,
            "Question": ans.question,
            "Answer": ans.choice,
            "Justification": ans.justification or ""
        })

    df = pd.DataFrame(rows)

    if os.path.exists(file_name):
        existing = pd.read_excel(file_name)
        df = pd.concat([existing, df], ignore_index=True)

    df.to_excel(file_name, index=False)
    return {"message": f"{test_type} responses saved successfully."}

@app.get("/history/{test_type}")
def get_history(test_type: str):
    test_type = test_type.upper()
    if test_type not in FILE_MAP:
        raise HTTPException(status_code=400, detail="Invalid test type")

    file_name = FILE_MAP[test_type]

    if os.path.exists(file_name):
        return FileResponse(file_name, filename=file_name, media_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')

    raise HTTPException(status_code=404, detail="No history found for selected test.")


# ✅ Run app
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
