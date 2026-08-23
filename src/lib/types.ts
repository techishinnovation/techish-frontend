export interface BlogPost {
  id: string;
  title: string;
  description: string;
  image: string | null;
  slug: string;
  created_at: string;
}

export interface StaticBlogPost {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  date: string;
  category: string;
}

export type AnyBlogPost =
  | (BlogPost & { source: "api" })
  | (StaticBlogPost & { source: "static" });

export interface WorkMedia {
  id: string;
  file: string;
  media_type: "image" | "video";
  order: number;
}

export interface WorkItem {
  id: string;
  title: string;
  project_url: string;
  video_url: string;
  description: string;
  created_at: string;
  media: WorkMedia[];
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface SiteSettingsPublic {
  instagram_url: string;
  linkedin_url: string;
  threads_url: string;
  facebook_url: string;
  clutch_url: string;
  contact_email: string;
  contact_phone: string;
  contact_address: string;
  chatbot_enabled: boolean;
}

export interface SiteSettingsAdmin {
  gemini_api_key: string;
  instagram_url: string;
  linkedin_url: string;
  threads_url: string;
  facebook_url: string;
  clutch_url: string;
  contact_email: string;
  contact_phone: string;
  contact_address: string;
  mail_config_email: string;
  mail_config_app_password: string;
  updated_at: string;
}

export interface AdminUser {
  id: number;
  username: string;
  date_joined: string;
  is_staff: boolean;
  last_login: string | null;
}

export interface ChatTurn {
  role: "user" | "model";
  text: string;
}

export interface JobOpening {
  id: string;
  title: string;
  description: string;
  technology: string;
  application_email: string;
  created_at: string;
}

export type ReviewStatus = "pending" | "submitted" | "approved";

export interface ClientReviewAdmin {
  id: string;
  email: string;
  status: ReviewStatus;
  client_name: string;
  project_title: string;
  feedback: string;
  created_at: string;
  submitted_at: string | null;
}

export interface ClientReviewPublic {
  id: string;
  client_name: string;
  project_title: string;
  feedback: string;
}
