# 🎨 ResumeBot Architecture & Flow Diagrams

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER BROWSER                             │
│                                                                  │
│  ┌────────────────────────────────────────────────────────┐    │
│  │            Next.js Frontend (Port 3000)                 │    │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────┐ │    │
│  │  │ Landing  │  │   Auth   │  │Dashboard │  │  Bot   │ │    │
│  │  │   Page   │  │  Pages   │  │   Page   │  │  Chat  │ │    │
│  │  └──────────┘  └──────────┘  └──────────┘  └────────┘ │    │
│  │                                                          │    │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────┐ │    │
│  │  │ Create   │  │  Share   │  │  Edit    │  │  Demo  │ │    │
│  │  │ Resume   │  │   Page   │  │  Resume  │  │  Page  │ │    │
│  │  └──────────┘  └──────────┘  └──────────┘  └────────┘ │    │
│  └────────────────────────────────────────────────────────┘    │
└───────────────────────────┬──────────────────────────────────────┘
                            │
                            │ HTTP/REST API
                            │
┌───────────────────────────▼──────────────────────────────────────┐
│                  Express Backend (Port 3001)                      │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                    API Routes                            │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────┐  │   │
│  │  │   Auth   │  │  Resume  │  │   Bot    │  │  Chat  │  │   │
│  │  │  /auth   │  │ /resume  │  │  /bot    │  │ /chat  │  │   │
│  │  └──────────┘  └──────────┘  └──────────┘  └────────┘  │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                   Middleware                             │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐             │   │
│  │  │   CORS   │  │   JWT    │  │  Error   │             │   │
│  │  │  Config  │  │   Auth   │  │ Handler  │             │   │
│  │  └──────────┘  └──────────┘  └──────────┘             │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────┬─────────────────────────────────────────┬─────────────┘
          │                                         │
          │                                         │
          ▼                                         ▼
┌─────────────────────┐                   ┌──────────────────┐
│   MongoDB Database  │                   │   OpenAI API     │
│                     │                   │                  │
│  ┌──────────────┐  │                   │  ┌────────────┐  │
│  │    Users     │  │                   │  │ GPT-3.5    │  │
│  │  Collection  │  │                   │  │  Turbo     │  │
│  └──────────────┘  │                   │  └────────────┘  │
│                     │                   │                  │
│  ┌──────────────┐  │                   │  AI generates    │
│  │   Resumes    │  │                   │  intelligent     │
│  │  Collection  │  │                   │  responses       │
│  └──────────────┘  │                   │                  │
│                     │                   └──────────────────┘
│  ┌──────────────┐  │
│  │ ChatHistory  │  │
│  │  Collection  │  │
│  └──────────────┘  │
└─────────────────────┘
```

## User Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    VISITOR JOURNEY                          │
└─────────────────────────────────────────────────────────────┘

1. DISCOVER
   │
   ├─► Landing Page
   │   └─► See features, benefits
   │
   ├─► Try Demo
   │   └─► Test AI chat without signup
   │
   └─► Click "Get Started"
       │
       ▼

2. REGISTER
   │
   ├─► Fill registration form
   │   └─► Name, Email, Password
   │
   ├─► Account created
   │   └─► JWT token stored
   │
   └─► Redirect to Dashboard
       │
       ▼

3. CREATE RESUME BOT
   │
   ├─► Step 1: Personal Info
   │   └─► Name, Contact, Links
   │
   ├─► Step 2: Summary
   │   └─► Professional bio
   │
   ├─► Step 3: Education
   │   └─► Degrees, Institutions
   │
   ├─► Step 4: Experience
   │   └─► Jobs, Responsibilities
   │
   ├─► Step 5: Skills & Projects
   │   └─► Tech stack, Portfolio
   │
   ├─► Step 6: Certifications
   │   └─► Credentials, Achievements
   │
   ├─► Click "Create Bot"
   │   └─► Bot ID generated (e.g., a1b2c3d4)
   │
   └─► Redirect to Share Page
       │
       ▼

4. SHARE & DISTRIBUTE
   │
   ├─► Copy shareable link
   │   └─► https://app.com/bot/a1b2c3d4
   │
   ├─► Download QR code
   │   └─► Add to printed resume
   │
   ├─► Copy embed code
   │   └─► Add to personal website
   │
   ├─► Share on social media
   │   └─► LinkedIn, Twitter, etc.
   │
   └─► Track analytics
       │
       ▼

5. ENGAGE RECRUITERS
   │
   ├─► Recruiter visits bot link
   │   └─► View count increments
   │
   ├─► Recruiter asks questions
   │   └─► "What's your experience?"
   │
   ├─► AI responds from resume
   │   └─► Interaction count increments
   │
   ├─► Recruiter shares with team
   │   └─► Share count increments
   │
   └─► User sees analytics
       │
       ▼

6. MANAGE & UPDATE
   │
   ├─► View dashboard
   │   └─► See all bots
   │
   ├─► Check analytics
   │   └─► Views, Interactions, Shares
   │
   ├─► Edit resume
   │   └─► Update information
   │
   ├─► Create new bot
   │   └─► For different role
   │
   └─► Delete old bots
```

## Data Flow Diagram

```
┌──────────────────────────────────────────────────────────────┐
│                  CHAT INTERACTION FLOW                        │
└──────────────────────────────────────────────────────────────┘

USER ASKS QUESTION
     │
     │ "What's your experience?"
     │
     ▼
┌─────────────────┐
│  Bot Frontend   │
│  (React)        │
└────────┬────────┘
         │
         │ POST /api/chat/:botId
         │ { message: "What's...", sessionId: "..." }
         │
         ▼
┌─────────────────┐
│  Backend API    │
│  (Express)      │
└────────┬────────┘
         │
         ├─► Fetch Resume Data
         │   └─► MongoDB: Resume Collection
         │       └─► Returns: { personalInfo, experience, ... }
         │
         ├─► Build Context String
         │   └─► Format resume into text
         │       "Name: John Doe
         │        Experience: 3 years at..."
         │
         ├─► Get Chat History
         │   └─► MongoDB: ChatHistory Collection
         │       └─► Last 10 messages for context
         │
         ├─► Build OpenAI Prompt
         │   └─► System: "You are AI representing..."
         │       User History: [previous messages]
         │       Current: "What's your experience?"
         │
         │
         ▼
┌─────────────────┐
│   OpenAI API    │
│   GPT-3.5       │
└────────┬────────┘
         │
         │ AI Processing
         │ - Understand question
         │ - Find relevant resume data
         │ - Generate natural response
         │
         ▼
┌─────────────────┐
│  AI Response    │
└────────┬────────┘
         │
         │ "I have 3+ years of experience as a
         │  Full Stack Developer. I've worked at
         │  Tech Innovators Inc..."
         │
         ▼
┌─────────────────┐
│  Backend API    │
└────────┬────────┘
         │
         ├─► Save to Chat History
         │   └─► MongoDB: ChatHistory Collection
         │       messages.push({ role: 'user', ... })
         │       messages.push({ role: 'assistant', ... })
         │
         ├─► Update Analytics
         │   └─► MongoDB: Resume Collection
         │       resume.analytics.interactions++
         │
         │
         ▼
┌─────────────────┐
│  Bot Frontend   │
└────────┬────────┘
         │
         │ Display AI response
         │ Update chat UI
         │
         ▼
     USER SEES ANSWER
```

## Component Hierarchy

```
App Root
│
├── Landing Page (/)
│   ├── Hero Section
│   ├── Features Grid
│   ├── Benefits List
│   ├── Demo Preview
│   └── Footer
│
├── Auth Pages
│   ├── Register (/register)
│   │   └── Registration Form
│   └── Login (/login)
│       └── Login Form
│
├── Dashboard (/dashboard)
│   ├── Navigation Bar
│   ├── User Profile
│   ├── Resume Bots Grid
│   │   └── Bot Card (for each bot)
│   │       ├── Bot Info
│   │       ├── Analytics
│   │       └── Action Buttons
│   └── Create New Bot Button
│
├── Resume Builder (/create)
│   ├── Progress Stepper
│   ├── Multi-Step Form
│   │   ├── Step 1: Personal Info
│   │   ├── Step 2: Summary
│   │   ├── Step 3: Education
│   │   ├── Step 4: Experience
│   │   ├── Step 5: Skills & Projects
│   │   └── Step 6: Certifications
│   └── Navigation Buttons
│
├── Bot Chat (/bot/:botId)
│   ├── Header
│   │   ├── Bot Avatar
│   │   └── Bot Info
│   ├── Chat Area
│   │   ├── Welcome Message
│   │   ├── Message List
│   │   │   └── Message Bubble (user/ai)
│   │   └── Typing Indicator
│   ├── Input Area
│   │   ├── Text Input
│   │   └── Send Button
│   └── Quick Questions
│
├── Share Page (/share/:botId)
│   ├── Success Message
│   ├── Shareable Link Card
│   ├── QR Code Card
│   ├── Embed Code Card
│   ├── Widget Code Card
│   ├── Analytics Display
│   └── Action Buttons
│
└── Demo Page (/demo)
    ├── Demo Header
    ├── Demo Chat Interface
    ├── Quick Questions
    └── CTA Section
```

## Database Relationships

```
┌─────────────────┐
│      User       │
│  _id: ObjectId  │
│  email: String  │
│  password: Hash │
│  name: String   │
└────────┬────────┘
         │
         │ 1:N relationship
         │ (one user, many resumes)
         │
         ▼
┌─────────────────┐
│     Resume      │
│  _id: ObjectId  │
│  userId: ───────┼──► References User._id
│  botId: String  │
│  personalInfo   │
│  education[]    │
│  experience[]   │
│  skills{}       │
│  projects[]     │
│  analytics{}    │
└────────┬────────┘
         │
         │ 1:N relationship
         │ (one resume, many chat sessions)
         │
         ▼
┌─────────────────┐
│  ChatHistory    │
│  _id: ObjectId  │
│  botId: ────────┼──► References Resume.botId
│  sessionId      │
│  messages[]     │
│    ├─ role      │
│    ├─ content   │
│    └─ timestamp │
└─────────────────┘
```

## Authentication Flow

```
REGISTRATION                          LOGIN
     │                                  │
     │ POST /api/auth/register          │ POST /api/auth/login
     ▼                                  ▼
┌─────────────┐                    ┌─────────────┐
│  Validate   │                    │  Validate   │
│  Input      │                    │  Input      │
└──────┬──────┘                    └──────┬──────┘
       │                                  │
       ▼                                  ▼
┌─────────────┐                    ┌─────────────┐
│  Check if   │                    │  Find User  │
│  User Exists│                    │  by Email   │
└──────┬──────┘                    └──────┬──────┘
       │                                  │
       │ User exists? ─► Error            │ Not found? ─► Error
       │                                  │
       ▼                                  ▼
┌─────────────┐                    ┌─────────────┐
│  Hash       │                    │  Compare    │
│  Password   │                    │  Password   │
│  (bcrypt)   │                    │  (bcrypt)   │
└──────┬──────┘                    └──────┬──────┘
       │                                  │
       ▼                                  │ Match? No ─► Error
┌─────────────┐                           │
│  Create     │                           ▼
│  User in DB │                    ┌─────────────┐
└──────┬──────┘                    │  Generate   │
       │                           │  JWT Token  │
       ▼                           └──────┬──────┘
┌─────────────┐                           │
│  Generate   │                           │
│  JWT Token  │◄──────────────────────────┘
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Return    │
│  Token to   │
│   Client    │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Store in   │
│ localStorage│
└─────────────┘
```

## Analytics Tracking

```
BOT VIEW
  └─► GET /api/bot/:botId
      └─► resume.analytics.views++
          └─► Save to MongoDB

CHAT INTERACTION
  └─► POST /api/chat/:botId
      └─► resume.analytics.interactions++
          └─► Save to MongoDB

SHARE ACTION
  └─► POST /api/bot/:botId/share
      └─► resume.analytics.shares++
          └─► Save to MongoDB

DASHBOARD VIEW
  └─► GET /api/resume/my-resumes
      └─► Display all analytics
          └─► views, interactions, shares
```

---

**This architecture ensures:**
- ✅ Scalability (microservices-ready)
- ✅ Maintainability (clear separation)
- ✅ Security (JWT, hashed passwords)
- ✅ Performance (efficient queries)
- ✅ User Experience (fast, responsive)
