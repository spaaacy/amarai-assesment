import { FileUploader } from "@/components/file-uploader"
import { DataTable } from "@/components/data-table"
import { DocumentViewer } from "@/components/document-viewer"
import { HistoryList } from "@/components/history-list"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-foreground">Ocean Shipment Processor</h1>
          <p className="mt-2 text-muted-foreground">Upload and process ocean shipment documents</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
          <div className="space-y-8">
            <FileUploader />
            <DataTable />
            <DocumentViewer />
          </div>

          <aside className="space-y-6">
            <HistoryList />
          </aside>
        </div>
      </main>
    </div>
  )
}
