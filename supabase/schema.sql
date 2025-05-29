-- Landing page specific tables (separate from bundle builder)

-- Main leads table
CREATE TABLE dental_lab_landing_leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  
  -- Contact info
  lab_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  website_url TEXT,
  
  -- Lead source
  source TEXT NOT NULL, -- 'seo_audit', 'blog_generator', 'calendly', 'bundle_selection'
  
  -- Marketing consent
  marketing_consent BOOLEAN DEFAULT false,
  
  -- Additional data
  metadata JSONB,
  
  -- Status tracking
  status TEXT DEFAULT 'new' -- 'new', 'contacted', 'qualified', 'customer'
);

-- SEO Audit requests
CREATE TABLE dental_lab_seo_audits (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  lead_id UUID REFERENCES dental_lab_landing_leads(id),
  
  -- Audit specific fields
  primary_services TEXT[],
  competitor_url TEXT,
  biggest_frustration TEXT,
  
  -- Delivery tracking
  webhook_sent BOOLEAN DEFAULT false,
  webhook_sent_at TIMESTAMP WITH TIME ZONE,
  pdf_delivered BOOLEAN DEFAULT false,
  pdf_delivered_at TIMESTAMP WITH TIME ZONE
);

-- Blog post requests
CREATE TABLE dental_lab_blog_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  lead_id UUID REFERENCES dental_lab_landing_leads(id),
  
  -- Blog specific fields
  topic TEXT NOT NULL,
  services_related TEXT[],
  thoughts TEXT,
  lab_specialties TEXT[],
  target_audience TEXT, -- 'dentists' or 'patients'
  
  -- Delivery tracking
  webhook_sent BOOLEAN DEFAULT false,
  webhook_sent_at TIMESTAMP WITH TIME ZONE,
  content_delivered BOOLEAN DEFAULT false,
  content_delivered_at TIMESTAMP WITH TIME ZONE
);

-- Bundle selections from landing page
CREATE TABLE dental_lab_bundle_selections (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  lead_id UUID REFERENCES dental_lab_landing_leads(id),
  
  -- Bundle data
  bundle_type TEXT NOT NULL, -- 'survivor', 'competitor', 'dominator', 'custom'
  services JSONB NOT NULL,
  subscription_months INTEGER NOT NULL,
  base_price DECIMAL(10,2) NOT NULL,
  final_price DECIMAL(10,2) NOT NULL,
  
  -- Challenge that led to selection
  initial_challenge TEXT,
  
  -- Conversion tracking
  proceeded_to_builder BOOLEAN DEFAULT false,
  converted_to_customer BOOLEAN DEFAULT false
);

-- Calendly bookings tracking
CREATE TABLE dental_lab_calendly_bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  lead_id UUID REFERENCES dental_lab_landing_leads(id),
  
  -- Booking data
  calendly_event_id TEXT,
  scheduled_time TIMESTAMP WITH TIME ZONE,
  
  -- Status
  showed_up BOOLEAN,
  outcome TEXT -- 'qualified', 'not_qualified', 'no_show', 'rescheduled'
);

-- Create indexes for performance
CREATE INDEX idx_leads_email ON dental_lab_landing_leads(email);
CREATE INDEX idx_leads_created ON dental_lab_landing_leads(created_at DESC);
CREATE INDEX idx_audits_lead ON dental_lab_seo_audits(lead_id);
CREATE INDEX idx_blogs_lead ON dental_lab_blog_requests(lead_id);
CREATE INDEX idx_bundles_lead ON dental_lab_bundle_selections(lead_id);
CREATE INDEX idx_calendly_lead ON dental_lab_calendly_bookings(lead_id);
