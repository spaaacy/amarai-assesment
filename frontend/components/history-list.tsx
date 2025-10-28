"use client"

import { useDocuments } from "@/contexts/document-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FileText, FileSpreadsheet, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

export function HistoryList() {
  const { documents, currentDocument, setCurrentDocument } = useDocuments()

  if (documents.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Upload History</CardTitle>
          <CardDescription>Your recent uploads will appear here</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Clock className="h-12 w-12 text-muted-foreground/50" />
            <p className="mt-4 text-sm text-muted-foreground">No uploads yet</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload History</CardTitle>
        <CardDescription>
          {documents.length} document{documents.length !== 1 ? "s" : ""} uploaded
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px] pr-4">
          <div className="space-y-3">
            {documents.map((doc) => {
              const isActive = currentDocument?.id === doc.id
              const Icon = doc.fileType === "pdf" ? FileText : FileSpreadsheet

              return (
                <Button
                  key={doc.id}
                  variant="ghost"
                  className={cn("h-auto w-full justify-start p-4 text-left", isActive && "bg-accent")}
                  onClick={() => setCurrentDocument(doc)}
                >
                  <div className="flex w-full items-start gap-3">
                    <div className={cn("rounded-lg p-2", isActive ? "bg-primary/10" : "bg-muted")}>
                      <Icon className={cn("h-5 w-5", isActive ? "text-primary" : "text-muted-foreground")} />
                    </div>
                    <div className="flex-1 space-y-1 overflow-hidden">
                      <p className="truncate text-sm font-medium leading-none">{doc.fileName}</p>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">
                          {doc.fileType.toUpperCase()}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {doc.uploadedAt.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                      <p className="truncate text-xs text-muted-foreground">B/L: {doc.data.billOfLading || "N/A"}</p>
                    </div>
                  </div>
                </Button>
              )
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
