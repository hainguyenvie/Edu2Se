# Database Setup Guide for AitheduConnect

## Current Status
- ✅ Authentication system working with in-memory storage
- ✅ Google Sign-In integration complete
- ⚠️ Database connection needs proper Supabase configuration

## Supabase Database Setup

### Step 1: Get Your Database Connection String

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to **Settings** → **Database**
4. Copy the **Connection string** under "Connection pooling"
5. Replace `[YOUR-PASSWORD]` with your actual database password

The URL should look like:
```
postgresql://postgres.xxxxx:[YOUR-PASSWORD]@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres
```

### Step 2: Add Database URL Secret

1. In Replit, go to the **Secrets** tab (lock icon in sidebar)
2. Add a new secret:
   - Key: `DATABASE_URL`
   - Value: Your complete Supabase connection string with password

### Step 3: Create Database Tables

Once the DATABASE_URL is configured, the system will automatically:

1. Connect to your Supabase database
2. Create the required tables:
   - `users` - User accounts and authentication
   - `tutors` - Tutor profiles and information
   - `subjects` - Available subjects for tutoring
   - `videos` - Tutor showcase videos

### Step 4: Verify Database Connection

After adding the DATABASE_URL secret:

1. The server will restart automatically
2. Check the console logs for:
   - ✅ "Using database storage" - Database connected successfully
   - ❌ "Database connection failed" - Check your connection string

### Database Schema

The system uses these main tables:

#### Users Table
- `id` - Unique user identifier
- `username` - Email address (used for login)
- `email` - User's email
- `password` - Hashed password
- `full_name` - User's display name
- `role` - 'student', 'tutor', or 'admin'
- `is_email_verified` - Email verification status
- `created_at`, `updated_at`, `last_login` - Timestamps

#### Tutors Table
- `id` - Unique tutor identifier
- `user_id` - Reference to users table
- `name` - Tutor display name
- `subjects` - Array of subjects they teach
- `grades` - Array of grade levels
- `price_per_hour` - Hourly rate
- `rating` - Average rating
- `education` - Education background
- `description` - Tutor description
- `status` - 'online', 'offline', 'busy'

## Migration from Memory to Database

The system is designed to automatically switch from in-memory storage to database storage once the DATABASE_URL is properly configured. All existing functionality will continue to work seamlessly.

## Troubleshooting

### Connection Errors
- Verify your password is correct in the connection string
- Check that your Supabase project is active
- Ensure the connection string format is correct

### Table Creation Issues
- The system automatically creates tables on first connection
- If tables already exist, it will use them
- Sample data is inserted for subjects if the table is empty

## Security Notes

- Never commit your DATABASE_URL to version control
- Use Replit Secrets to store sensitive database credentials
- The connection uses SSL by default through Supabase
- User passwords are hashed with bcrypt before storage