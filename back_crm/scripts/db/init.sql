-- Create extensions if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum types
DO $$
BEGIN
    -- User roles enum
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_users_role') THEN
        CREATE TYPE enum_users_role AS ENUM ('admin', 'sales', 'support');
    END IF;
    
    -- Customer status enum
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_customers_status') THEN
        CREATE TYPE enum_customers_status AS ENUM ('active', 'inactive', 'pending');
    END IF;
    
    -- Lead status enum
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_leads_status') THEN
        CREATE TYPE enum_leads_status AS ENUM ('new', 'contacted', 'qualified', 'proposal', 'negotiation', 'closed_won', 'closed_lost');
    END IF;
    
    -- Lead priority enum
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_leads_priority') THEN
        CREATE TYPE enum_leads_priority AS ENUM ('low', 'medium', 'high');
    END IF;
END$$; 