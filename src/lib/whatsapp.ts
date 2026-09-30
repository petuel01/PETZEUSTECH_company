import { COMPANY_INFO } from '../data/companyData';

export interface BookingWhatsAppParams {
  bookingReference: string;
  name: string;
  service: string;
  department: string;
  description: string;
  preferredDate: string;
  preferredTime: string;
  location: string;
}

/**
 * Builds a safe WhatsApp URL pre-populated with public booking parameters.
 * Strictly avoids private tokens, passwords, or internal database IDs.
 */
export function buildBookingWhatsAppUrl(params: BookingWhatsAppParams): string {
  const message = `Hello PETZEUSTECH, I would like to book a service.

Name: ${params.name}
Service: ${params.service}
Department: ${params.department}
Description: ${params.description}
Preferred date: ${params.preferredDate}
Preferred time: ${params.preferredTime}
Location: ${params.location}
Booking reference: ${params.bookingReference}`;

  const encoded = encodeURIComponent(message);
  return `https://wa.me/${COMPANY_INFO.whatsappRaw}?text=${encoded}`;
}

/**
 * Builds a direct general consultation WhatsApp link
 */
export function buildGeneralWhatsAppUrl(inquiryTopic?: string): string {
  const text = inquiryTopic
    ? `Hello PETZEUSTECH, I am inquiring about: ${inquiryTopic}.`
    : `Hello PETZEUSTECH, I would like to make an inquiry about your digital services.`;
  return `https://wa.me/${COMPANY_INFO.whatsappRaw}?text=${encodeURIComponent(text)}`;
}

/**
 * Generates an official unique booking reference code
 * Format: PTZ-YYYYMMDD-XXXX (e.g. PTZ-20260913-4829)
 */
export function generateBookingReference(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return `PTZ-${year}${month}${day}-${randomSuffix}`;
}
