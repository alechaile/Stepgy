# Stepgy Backend Integration Contracts

## Overview
This document defines the API contracts and integration plan for converting the Stepgy frontend from mock data to a fully functional backend system.

## Current Mock Data Analysis

### Mock Data in `/frontend/src/data/mock.js`:
- `stepgyData.hero` - Hero section content
- `stepgyData.about` - About section content  
- `stepgyData.problem` - Problem description
- `stepgyData.solution` - Solution steps with icons
- `stepgyData.technology` - Tech components and performance data
- `stepgyData.prototype` - Prototype information and images
- `stepgyData.team` - Team member information
- `stepgyData.gallery` - Gallery categories and images
- `stepgyData.contact` - Contact information and form config
- `stepgyData.footer` - Footer content

## Priority Backend Implementation

### 1. HIGH PRIORITY - Contact Form System

**Endpoint:** `POST /api/contact`
```json
{
  "name": "string (required)",
  "email": "string (required, email format)",
  "message": "string (required)"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Mensaje enviado exitosamente",
  "id": "generated_id"
}
```

**MongoDB Model:** `ContactSubmission`
```javascript
{
  _id: ObjectId,
  name: String,
  email: String, 
  message: String,
  createdAt: Date,
  status: String // "new", "read", "replied"
}
```

### 2. MEDIUM PRIORITY - Content Management

**Endpoints:** 
- `GET /api/content` - Get all site content
- `PUT /api/content` - Update site content (admin)

**Response Structure:**
```json
{
  "hero": { "title": "string", "subtitle": "string", "cta": "string" },
  "about": { "title": "string", "content": "string" },
  "problem": { "title": "string", "content": "string" },
  "team": [
    {
      "name": "string",
      "role": "string", 
      "description": "string"
    }
  ],
  "contact": {
    "instagram": "string",
    "email": "string",
    "location": "string"
  }
}
```

### 3. LOW PRIORITY - Analytics & Admin

**Endpoints:**
- `GET /api/admin/contacts` - List contact submissions
- `PUT /api/admin/contacts/:id` - Update contact status
- `GET /api/admin/stats` - Basic site statistics

## Frontend Integration Plan

### Phase 1: Contact Form Integration
**Files to modify:**
- `/frontend/src/components/Home.jsx` - Replace mock form submission
- Remove mock alert, add proper API call with loading states
- Add error handling and success feedback

**Changes needed:**
```javascript
// Replace this mock code:
console.log('Form submitted:', formData);
alert('¡Mensaje enviado! Nos pondremos en contacto contigo pronto.');

// With actual API call:
const response = await axios.post(`${API}/contact`, formData);
// Add proper loading, success, and error states
```

### Phase 2: Dynamic Content (Optional)
**Files to modify:**
- `/frontend/src/components/Home.jsx` - Replace stepgyData import with API call
- `/frontend/src/data/mock.js` - Keep as fallback data

## Backend Models Required

### 1. ContactSubmission Model
```python
class ContactSubmission(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    message: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    status: str = "new"  # new, read, replied
```

### 2. SiteContent Model (Future)
```python
class SiteContent(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    section: str  # hero, about, problem, etc.
    content: dict  # flexible JSON content
    updated_at: datetime = Field(default_factory=datetime.utcnow)
```

## API Routes to Implement

### Essential Routes:
1. `POST /api/contact` - Contact form submission
2. `GET /api/contact/test` - Test endpoint

### Future Routes:
1. `GET /api/content` - Get site content
2. `PUT /api/content` - Update content
3. `GET /api/admin/contacts` - Admin contact list

## Integration Testing Checklist

### Contact Form Testing:
- [ ] Form validation works (required fields)
- [ ] Email format validation
- [ ] Success message displays correctly
- [ ] Form clears after successful submission
- [ ] Error handling for network failures
- [ ] Loading state during submission

### Content Loading Testing:
- [ ] Page loads without mock data
- [ ] API content displays correctly
- [ ] Fallback to mock data if API fails
- [ ] Loading states for content

## Database Schema

```sql
-- Contact Submissions Collection
{
  "_id": ObjectId,
  "name": "Alejo Chaile",
  "email": "alejo@example.com", 
  "message": "Hola, me interesa el proyecto Stepgy...",
  "created_at": ISODate,
  "status": "new"
}

-- Site Content Collection (Future)
{
  "_id": ObjectId,
  "section": "hero",
  "content": {
    "title": "Stepgy – Energía con tus pasos",
    "subtitle": "Una baldosa que transforma...",
    "cta": "Conocé el proyecto"
  },
  "updated_at": ISODate
}
```

## Error Handling Strategy

### Frontend Error Handling:
- Form validation errors → Show field-specific messages
- Network errors → Show retry option
- Server errors → Show generic error message with support contact

### Backend Error Handling:
- Invalid email format → 400 with specific message
- Missing required fields → 400 with field list
- Database errors → 500 with generic message
- Rate limiting → 429 with retry after

## Deployment Considerations

### Environment Variables:
- `SMTP_HOST` - For email notifications (future)
- `SMTP_USER` - Email service user
- `ADMIN_EMAIL` - Where to send contact notifications

### Security:
- Rate limiting on contact form (max 5 submissions per IP per hour)
- Input sanitization and validation
- Email format verification

## Success Metrics

### Contact Form Success:
- Form submission works without errors
- Data is properly stored in MongoDB
- User receives confirmation feedback
- Admin can view submissions

### Performance:
- Form submission < 2 seconds
- Page load with API data < 3 seconds
- Graceful fallback to mock data if API fails

This contracts document will guide the seamless integration between frontend and backend, ensuring a bug-free full-stack application.