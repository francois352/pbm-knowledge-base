/**
 * Lead Generation Types
 * Consultation requests and customer acquisition
 */

export enum ConsultationStatus {
  NEW = 'new',
  CONTACTED = 'contacted',
  QUALIFIED = 'qualified',
  CONVERTED = 'converted',
  DECLINED = 'declined',
}

export enum InterestArea {
  NEUROFEEDBACK = 'neurofeedback',
  PBM_THERAPY = 'pbm_therapy',
  VIELIGHT_DEVICES = 'vielight_devices',
  WELLNESS_PROGRAM = 'wellness_program',
  QEEG_ASSESSMENT = 'qeeg_assessment',
  OTHER = 'other',
}

export interface ConsultationRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  interest: InterestArea;
  message: string;
  status: ConsultationStatus;
  source?: string; // tracking where the lead came from
  utmParams?: Record<string, string>;
  createdAt: Date;
  updatedAt?: Date;
  contactedAt?: Date;
  convertedAt?: Date;
  notes?: string;
}

export interface VielightProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  features: string[];
  imageUrl: string;
  category: 'neuro' | 'vagus' | 'combo';
  inStock: boolean;
}

export interface ProductPack {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  products: string[]; // product IDs
  features: string[];
  recommended: boolean;
}

export interface PractitionerProfile {
  id: string;
  userId: string;
  name: string;
  title: string;
  specialization: string[];
  bio: string;
  credentials: string[];
  imageUrl?: string;
  email: string;
  phone?: string;
  website?: string;
  availability: boolean;
}
