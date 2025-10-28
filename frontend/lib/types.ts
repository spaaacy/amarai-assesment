import { z } from "zod"

// Zod schema for Ocean Shipment Data
export const OceanShipmentDataSchema = z.object({
  billOfLadingNumber: z.string().min(1, "Bill of Lading is required"),
  containerNumber: z.string().min(1, "Container Number is required"),
  consigneeName: z.string().min(1, "Consignee Name is required"),
  consigneeAddress: z.string().min(1, "Consignee Address is required"),
  dateOfExport: z.string().min(1, "Date of Export is required"),
  lineItemsCount: z.string().min(1, "Line items count is required"),
  averageGrossWeight: z.string().min(1, "Gross Weight is required"),
  averagePrice: z.string().min(1, "Average Price is required"),

})

export type OceanShipmentData = z.infer<typeof OceanShipmentDataSchema>

// Zod schema for Processed Document
export const ProcessedDocumentSchema = z.object({
  id: z.string(),
  fileName: z.string(),
  fileType: z.enum(["pdf", "excel"]),
  uploadedAt: z.date(),
  data: OceanShipmentDataSchema,
  fileUrl: z.string().optional(),
})

export type ProcessedDocument = z.infer<typeof ProcessedDocumentSchema>

// API Response types
export interface ProcessDocumentResponse {
  success: boolean
  data?: OceanShipmentData
  error?: string
  message?: string
}
