"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import type { ProcessedDocument, OceanShipmentData } from "@/lib/types"
import { processDocument as apiProcessDocument } from "@/lib/api"

interface DocumentContextType {
  documents: ProcessedDocument[]
  currentDocument: ProcessedDocument | null
  isProcessing: boolean
  error: string | null
  uploadDocument: (file: File) => Promise<void>
  updateDocumentData: (id: string, data: Partial<OceanShipmentData>) => void
  setCurrentDocument: (document: ProcessedDocument | null) => void
  clearError: () => void
}

const DocumentContext = createContext<DocumentContextType | undefined>(undefined)

export function DocumentProvider({ children }: { children: ReactNode }) {
  const [documents, setDocuments] = useState<ProcessedDocument[]>([])
  const [currentDocument, setCurrentDocument] = useState<ProcessedDocument | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const uploadDocument = useCallback(async (file: File) => {
    setIsProcessing(true)
    setError(null)

    try {
      // Validate file type
      const fileType = file.type
      const isValidType =
        fileType === "application/pdf" ||
        fileType === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        fileType === "application/vnd.ms-excel"

      if (!isValidType) {
        throw new Error("Invalid file type. Please upload a PDF or Excel file.")
      }

      // Process document via API
      const result = await apiProcessDocument([file])

      if (!result.success || !result.data) {
        throw new Error(result.error || "Failed to process document")
      }

      // Create file URL for preview
      const fileUrl = URL.createObjectURL(file)

      // Create processed document
      const newDocument: ProcessedDocument = {
        id: crypto.randomUUID(),
        fileName: file.name,
        fileType: file.name.toLowerCase().endsWith(".pdf") ? "pdf" : "excel",
        uploadedAt: new Date(),
        data: result.data,
        fileUrl,
      }

      setDocuments((prev) => [newDocument, ...prev])
      setCurrentDocument(newDocument)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred"
      setError(errorMessage)
      console.error("[v0] Upload error:", err)
    } finally {
      setIsProcessing(false)
    }
  }, [])

  const updateDocumentData = useCallback(
    (id: string, data: Partial<OceanShipmentData>) => {
      setDocuments((prev) => prev.map((doc) => (doc.id === id ? { ...doc, data: { ...doc.data, ...data } } : doc)))

      if (currentDocument?.id === id) {
        setCurrentDocument((prev) => (prev ? { ...prev, data: { ...prev.data, ...data } } : null))
      }
    },
    [currentDocument],
  )

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return (
    <DocumentContext.Provider
      value={{
        documents,
        currentDocument,
        isProcessing,
        error,
        uploadDocument,
        updateDocumentData,
        setCurrentDocument,
        clearError,
      }}
    >
      {children}
    </DocumentContext.Provider>
  )
}

export function useDocuments() {
  const context = useContext(DocumentContext)
  if (context === undefined) {
    throw new Error("useDocuments must be used within a DocumentProvider")
  }
  return context
}
