"use client";

import { useState } from "react";
import { useDocuments } from "@/contexts/document-context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Save, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ExportButtons } from "@/components/export-buttons";
import type { OceanShipmentData } from "@/lib/types";

export function DataTable() {
  const { currentDocument, updateDocumentData } = useDocuments();
  const [editedData, setEditedData] = useState<OceanShipmentData | null>(null);
  const [hasChanges, setHasChanges] = useState(false);

  if (!currentDocument) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Shipment Data</CardTitle>
          <CardDescription>Upload a document to view and edit shipment information</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>No document selected. Please upload a document to get started.</AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  const data = editedData || currentDocument.data;

  const handleFieldChange = (field: keyof OceanShipmentData, value: string) => {
    const newData = { ...data, [field]: value };
    setEditedData(newData);
    setHasChanges(true);
  };

  const handleSave = () => {
    if (editedData) {
      updateDocumentData(currentDocument.id, editedData);
      setHasChanges(false);
    }
  };

  const handleReset = () => {
    setEditedData(null);
    setHasChanges(false);
  };

  const fields: Array<{
    key: keyof OceanShipmentData;
    label: string;
    type: "input" | "textarea";
  }> = [
    { key: "billOfLadingNumber", label: "Bill of Lading", type: "input" },
    { key: "containerNumber", label: "Container Number", type: "input" },
    { key: "consigneeName", label: "Consignee Name", type: "input" },
    { key: "consigneeAddress", label: "Consignee Address", type: "textarea" },
    { key: "dateOfExport", label: "Date of Export", type: "input" },
    { key: "lineItemsCount", label: "Line Items Count", type: "input" },
    { key: "averageGrossWeight", label: "Gross Weight", type: "input" },
    { key: "averagePrice", label: "Average Price", type: "input" },
  ];

  console.log({ fields, data });
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>Shipment Data</CardTitle>
            <CardDescription>Review and edit the extracted shipment information</CardDescription>
          </div>
          <ExportButtons />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {fields.map((field) => (
              <div key={field.key} className={field.type === "textarea" ? "md:col-span-2" : ""}>
                <Label htmlFor={field.key} className="text-sm font-medium">
                  {field.label}
                </Label>
                {field.type === "input" ? (
                  <Input
                    id={field.key}
                    value={data[field.key] ?? ""}
                    onChange={(e) => handleFieldChange(field.key, e.target.value)}
                    className="mt-2"
                  />
                ) : (
                  <Textarea
                    id={field.key}
                    value={data[field.key] ?? ""}
                    onChange={(e) => handleFieldChange(field.key, e.target.value)}
                    className="mt-2 min-h-[100px]"
                  />
                )}
              </div>
            ))}
          </div>

          {hasChanges && (
            <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/50 p-4">
              <AlertCircle className="h-5 w-5 text-muted-foreground" />
              <p className="flex-1 text-sm text-muted-foreground">You have unsaved changes</p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleReset}>
                  Reset
                </Button>
                <Button size="sm" onClick={handleSave}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
