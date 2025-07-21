from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI(title="Stepgy API", description="API for Stepgy project website")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

# Contact Form Models
class ContactSubmission(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    message: str = Field(..., min_length=1, max_length=1000)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    status: str = "new"

class ContactSubmissionCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr  
    message: str = Field(..., min_length=1, max_length=1000)

class ContactSubmissionResponse(BaseModel):
    success: bool
    message: str
    id: str

# Site Content Models for future use
class SiteContent(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    section: str
    content: dict
    updated_at: datetime = Field(default_factory=datetime.utcnow)

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Stepgy API - Energía con tus pasos"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

# Contact Form Endpoints
@api_router.post("/contact", response_model=ContactSubmissionResponse)
async def submit_contact_form(contact_data: ContactSubmissionCreate):
    try:
        # Create contact submission
        contact_dict = contact_data.dict()
        contact_obj = ContactSubmission(**contact_dict)
        
        # Insert into MongoDB
        result = await db.contact_submissions.insert_one(contact_obj.dict())
        
        if result.inserted_id:
            return ContactSubmissionResponse(
                success=True,
                message="¡Mensaje enviado exitosamente! Nos pondremos en contacto contigo pronto.",
                id=contact_obj.id
            )
        else:
            raise HTTPException(status_code=500, detail="Error al guardar el mensaje")
            
    except Exception as e:
        logging.error(f"Error submitting contact form: {str(e)}")
        raise HTTPException(status_code=500, detail="Error interno del servidor")

@api_router.get("/contact/test")
async def test_contact_endpoint():
    return {
        "message": "Contact endpoint is working",
        "timestamp": datetime.utcnow(),
        "status": "ok"
    }

# Admin endpoints for viewing contact submissions
@api_router.get("/admin/contacts", response_model=List[ContactSubmission])
async def get_contact_submissions():
    try:
        contacts = await db.contact_submissions.find().sort("created_at", -1).to_list(100)
        return [ContactSubmission(**contact) for contact in contacts]
    except Exception as e:
        logging.error(f"Error fetching contacts: {str(e)}")
        raise HTTPException(status_code=500, detail="Error al obtener contactos")

@api_router.put("/admin/contacts/{contact_id}")
async def update_contact_status(contact_id: str, status: str = "read"):
    try:
        result = await db.contact_submissions.update_one(
            {"id": contact_id},
            {"$set": {"status": status}}
        )
        
        if result.modified_count == 1:
            return {"success": True, "message": "Estado actualizado"}
        else:
            raise HTTPException(status_code=404, detail="Contacto no encontrado")
            
    except Exception as e:
        logging.error(f"Error updating contact status: {str(e)}")
        raise HTTPException(status_code=500, detail="Error al actualizar estado")

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
