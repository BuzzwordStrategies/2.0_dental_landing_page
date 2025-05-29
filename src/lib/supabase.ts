import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Server-side client for API routes
export const getServiceSupabase = () => {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_KEY!
  )
}

// Table names
export const TABLES = {
  LANDING_LEADS: 'dental_lab_landing_leads',
  SEO_AUDITS: 'dental_lab_seo_audits',
  BLOG_REQUESTS: 'dental_lab_blog_requests',
  BUNDLE_SELECTIONS: 'dental_lab_bundle_selections',
  CALENDLY_BOOKINGS: 'dental_lab_calendly_bookings'
}
