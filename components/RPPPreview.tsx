"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Check, Edit2, Save } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface RPPPreviewProps {
  generatedRPP: any
  isGenerating: boolean
  onUpdateRPP?: (updatedRPP: any) => void
}

export function RPPPreview({ generatedRPP, isGenerating, onUpdateRPP }: RPPPreviewProps) {
  const [editableRPP, setEditableRPP] = useState<any>(null)
  const [editMode, setEditMode] = useState(false)
  const [editingSections, setEditingSections] = useState<Record<string, boolean>>({})

  useEffect(() => {
    if (generatedRPP) {
      setEditableRPP({ ...generatedRPP })
    }
  }, [generatedRPP])

  const handleToggleEditMode = () => {
    if (editMode) {
      // Save all changes when exiting edit mode
      if (onUpdateRPP) {
        onUpdateRPP(editableRPP)
      }
    }
    setEditMode(!editMode)
    setEditingSections({})
  }

  const handleEditSection = (section: string) => {
    setEditingSections((prev) => ({ ...prev, [section]: true }))
  }

  const handleSaveSection = (section: string) => {
    setEditingSections((prev) => ({ ...prev, [section]: false }))
    if (onUpdateRPP) {
      onUpdateRPP(editableRPP)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setEditableRPP((prev) => ({ ...prev, [field]: value }))
  }

  const handleArrayInputChange = (field: string, index: number, value: string) => {
    const newArray = [...editableRPP[field]]
    newArray[index] = value
    setEditableRPP((prev) => ({ ...prev, [field]: newArray }))
  }

  if (!editableRPP && !isGenerating) {
    return (
      <Card className="shadow-md border-primary/10">
        <CardHeader>
          <CardTitle>Preview RPP</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-muted-foreground py-8">
            <p>RPP belum di-generate.</p>
            <p>Isi formulir di sebelah kiri dan klik "Generate RPP" untuk melihat hasilnya di sini.</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  }

  return (
    <Card className="shadow-md border-primary/10">
      <CardHeader className="flex flex-row items-center justify-between pb-2 bg-gradient-to-r from-primary/5 to-transparent">
        <CardTitle>Preview RPP</CardTitle>
        {!isGenerating && editableRPP && (
          <Button variant={editMode ? "default" : "outline"} size="sm" onClick={handleToggleEditMode} className="gap-1">
            {editMode ? <Save className="h-4 w-4" /> : <Edit2 className="h-4 w-4" />}
            {editMode ? "Save All Changes" : "Edit RPP"}
          </Button>
        )}
      </CardHeader>
      <CardContent className="p-0">
        {isGenerating ? (
          <RPPSkeleton />
        ) : editableRPP ? (
          <motion.div className="space-y-6 p-6" variants={containerVariants} initial="hidden" animate="visible">
            <motion.div variants={itemVariants} className="border-b pb-4">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  {editingSections.title ? (
                    <div className="space-y-2">
                      <Input
                        value={editableRPP.title}
                        onChange={(e) => handleInputChange("title", e.target.value)}
                        className="text-xl font-bold border-primary/30 focus-visible:ring-primary/30"
                      />
                      <Button size="sm" onClick={() => handleSaveSection("title")} className="gap-1">
                        <Check className="h-3 w-3" /> Save
                      </Button>
                    </div>
                  ) : (
                    <h2
                      className="text-xl font-bold group flex items-center gap-2"
                      onClick={() => editMode && handleEditSection("title")}
                    >
                      {editableRPP.title}
                      {editMode && (
                        <Edit2 className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer" />
                      )}
                    </h2>
                  )}
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge variant="outline" className="bg-primary/5 hover:bg-primary/10">
                      {editableRPP.subject}
                    </Badge>
                    <Badge variant="outline" className="bg-primary/5 hover:bg-primary/10">
                      Kelas {editableRPP.grade}
                    </Badge>
                    <Badge variant="outline" className="bg-primary/5 hover:bg-primary/10">
                      {editableRPP.duration}
                    </Badge>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              <motion.div variants={itemVariants}>
                <EditableSection
                  title="Identitas Modul"
                  content={editableRPP.identitasModule}
                  field="identitasModule"
                  editMode={editMode}
                  isEditing={!!editingSections.identitasModule}
                  onEdit={() => handleEditSection("identitasModule")}
                  onSave={() => handleSaveSection("identitasModule")}
                  onChange={(value) => handleInputChange("identitasModule", value)}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <EditableSection
                  title="Kompetensi Awal"
                  content={editableRPP.kompetensiAwal}
                  field="kompetensiAwal"
                  editMode={editMode}
                  isEditing={!!editingSections.kompetensiAwal}
                  onEdit={() => handleEditSection("kompetensiAwal")}
                  onSave={() => handleSaveSection("kompetensiAwal")}
                  onChange={(value) => handleInputChange("kompetensiAwal", value)}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <EditableSection
                  title="Profil Pelajar Pancasila"
                  content={editableRPP.profilPelajarPancasila}
                  field="profilPelajarPancasila"
                  editMode={editMode}
                  isEditing={!!editingSections.profilPelajarPancasila}
                  onEdit={() => handleEditSection("profilPelajarPancasila")}
                  onSave={() => handleSaveSection("profilPelajarPancasila")}
                  onChange={(value) => handleInputChange("profilPelajarPancasila", value)}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <EditableSection
                  title="Sarana & Prasarana"
                  content={editableRPP.saranaPrasarana}
                  field="saranaPrasarana"
                  editMode={editMode}
                  isEditing={!!editingSections.saranaPrasarana}
                  onEdit={() => handleEditSection("saranaPrasarana")}
                  onSave={() => handleSaveSection("saranaPrasarana")}
                  onChange={(value) => handleInputChange("saranaPrasarana", value)}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <EditableSection
                  title="Target Peserta Didik"
                  content={editableRPP.targetPesertaDidik}
                  field="targetPesertaDidik"
                  editMode={editMode}
                  isEditing={!!editingSections.targetPesertaDidik}
                  onEdit={() => handleEditSection("targetPesertaDidik")}
                  onSave={() => handleSaveSection("targetPesertaDidik")}
                  onChange={(value) => handleInputChange("targetPesertaDidik", value)}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <EditableSection
                  title="Model Pembelajaran"
                  content={editableRPP.modelPembelajaran}
                  field="modelPembelajaran"
                  editMode={editMode}
                  isEditing={!!editingSections.modelPembelajaran}
                  onEdit={() => handleEditSection("modelPembelajaran")}
                  onSave={() => handleSaveSection("modelPembelajaran")}
                  onChange={(value) => handleInputChange("modelPembelajaran", value)}
                />
              </motion.div>
            </div>

            <motion.div variants={itemVariants} className="border rounded-lg p-4 bg-primary/5">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">Tujuan Pembelajaran</h3>
                {editMode && !editingSections.learningObjectives && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleEditSection("learningObjectives")}
                    className="h-8 gap-1 text-xs"
                  >
                    <Edit2 className="h-3 w-3" /> Edit
                  </Button>
                )}
                {editMode && editingSections.learningObjectives && (
                  <Button
                    size="sm"
                    onClick={() => handleSaveSection("learningObjectives")}
                    className="h-8 gap-1 text-xs"
                  >
                    <Check className="h-3 w-3" /> Save
                  </Button>
                )}
              </div>
              {editingSections.learningObjectives ? (
                <div className="space-y-2">
                  {editableRPP.learningObjectives.map((obj: string, idx: number) => (
                    <div key={idx} className="flex gap-2 items-center">
                      <div className="w-6 text-center">{idx + 1}.</div>
                      <Input
                        value={obj}
                        onChange={(e) => handleArrayInputChange("learningObjectives", idx, e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <ul className="list-disc pl-5 space-y-1">
                  {editableRPP.learningObjectives.map((obj: string, idx: number) => (
                    <li key={idx}>{obj}</li>
                  ))}
                </ul>
              )}
            </motion.div>

            <motion.div variants={itemVariants} className="border rounded-lg p-4 bg-primary/5">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">Kegiatan Pembelajaran</h3>
                {editMode && !editingSections.activities && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleEditSection("activities")}
                    className="h-8 gap-1 text-xs"
                  >
                    <Edit2 className="h-3 w-3" /> Edit
                  </Button>
                )}
                {editMode && editingSections.activities && (
                  <Button size="sm" onClick={() => handleSaveSection("activities")} className="h-8 gap-1 text-xs">
                    <Check className="h-3 w-3" /> Save
                  </Button>
                )}
              </div>
              {editingSections.activities ? (
                <div className="space-y-2">
                  {editableRPP.activities.map((act: string, idx: number) => (
                    <div key={idx} className="flex gap-2 items-center">
                      <div className="w-6 text-center">{idx + 1}.</div>
                      <Textarea
                        value={act}
                        onChange={(e) => handleArrayInputChange("activities", idx, e.target.value)}
                        className="flex-1 min-h-[80px]"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <ol className="list-decimal pl-5 space-y-2">
                  {editableRPP.activities.map((act: string, idx: number) => (
                    <li key={idx} className="pl-1">
                      {act}
                    </li>
                  ))}
                </ol>
              )}
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              <motion.div variants={itemVariants}>
                <EditableSection
                  title="Penilaian (Assessment)"
                  content={editableRPP.assessment}
                  field="assessment"
                  editMode={editMode}
                  isEditing={!!editingSections.assessment}
                  onEdit={() => handleEditSection("assessment")}
                  onSave={() => handleSaveSection("assessment")}
                  onChange={(value) => handleInputChange("assessment", value)}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <EditableSection
                  title="Refleksi Guru"
                  content={editableRPP.refleksiGuru}
                  field="refleksiGuru"
                  editMode={editMode}
                  isEditing={!!editingSections.refleksiGuru}
                  onEdit={() => handleEditSection("refleksiGuru")}
                  onSave={() => handleSaveSection("refleksiGuru")}
                  onChange={(value) => handleInputChange("refleksiGuru", value)}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <EditableSection
                  title="Refleksi Peserta Didik"
                  content={editableRPP.refleksiPesertaDidik}
                  field="refleksiPesertaDidik"
                  editMode={editMode}
                  isEditing={!!editingSections.refleksiPesertaDidik}
                  onEdit={() => handleEditSection("refleksiPesertaDidik")}
                  onSave={() => handleSaveSection("refleksiPesertaDidik")}
                  onChange={(value) => handleInputChange("refleksiPesertaDidik", value)}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <EditableSection
                  title="Pengayaan & Remedial"
                  content={editableRPP.pengayaanRemedial}
                  field="pengayaanRemedial"
                  editMode={editMode}
                  isEditing={!!editingSections.pengayaanRemedial}
                  onEdit={() => handleEditSection("pengayaanRemedial")}
                  onSave={() => handleSaveSection("pengayaanRemedial")}
                  onChange={(value) => handleInputChange("pengayaanRemedial", value)}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <EditableSection
                  title="Bahan Bacaan"
                  content={editableRPP.bahanBacaan}
                  field="bahanBacaan"
                  editMode={editMode}
                  isEditing={!!editingSections.bahanBacaan}
                  onEdit={() => handleEditSection("bahanBacaan")}
                  onSave={() => handleSaveSection("bahanBacaan")}
                  onChange={(value) => handleInputChange("bahanBacaan", value)}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <EditableSection
                  title="Glosarium"
                  content={editableRPP.glosarium}
                  field="glosarium"
                  editMode={editMode}
                  isEditing={!!editingSections.glosarium}
                  onEdit={() => handleEditSection("glosarium")}
                  onSave={() => handleSaveSection("glosarium")}
                  onChange={(value) => handleInputChange("glosarium", value)}
                />
              </motion.div>
            </div>

            {editMode && (
              <motion.div
                variants={itemVariants}
                className="sticky bottom-0 bg-white dark:bg-gray-950 p-4 border-t flex justify-end gap-2 -mx-6 -mb-6 shadow-md"
              >
                <Button variant="outline" onClick={() => setEditMode(false)}>
                  Cancel
                </Button>
                <Button onClick={handleToggleEditMode}>
                  <Save className="h-4 w-4 mr-2" />
                  Save All Changes
                </Button>
              </motion.div>
            )}
          </motion.div>
        ) : (
          <div className="text-center text-muted-foreground py-4">
            <p>RPP belum di-generate.</p>
            <p>Isi formulir di sebelah kiri dan klik "Generate RPP" untuk melihat hasilnya di sini.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

interface EditableSectionProps {
  title: string
  content: string
  field: string
  editMode: boolean
  isEditing: boolean
  onEdit: () => void
  onSave: () => void
  onChange: (value: string) => void
}

function EditableSection({
  title,
  content,
  field,
  editMode,
  isEditing,
  onEdit,
  onSave,
  onChange,
}: EditableSectionProps) {
  return (
    <div className="border rounded-lg p-4 h-full bg-primary/5">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold">{title}</h3>
        {editMode && !isEditing && (
          <Button size="sm" variant="ghost" onClick={onEdit} className="h-8 gap-1 text-xs">
            <Edit2 className="h-3 w-3" /> Edit
          </Button>
        )}
        {editMode && isEditing && (
          <Button size="sm" onClick={onSave} className="h-8 gap-1 text-xs">
            <Check className="h-3 w-3" /> Save
          </Button>
        )}
      </div>
      {isEditing ? (
        <Textarea value={content} onChange={(e) => onChange(e.target.value)} className="min-h-[120px] w-full" />
      ) : (
        <p className="text-sm">{content || "-"}</p>
      )}
    </div>
  )
}

function RPPSkeleton() {
  return (
    <div className="space-y-6 p-6 animate-pulse">
      <div className="border-b pb-4">
        <Skeleton className="h-8 w-3/4 mb-4" />
        <div className="flex gap-2">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-6 w-24" />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="border rounded-lg p-4">
            <Skeleton className="h-6 w-32 mb-2" />
            <Skeleton className="h-20 w-full" />
          </div>
        ))}
      </div>

      <div className="border rounded-lg p-4">
        <Skeleton className="h-6 w-40 mb-2" />
        <div className="space-y-2">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-4 w-full" />
          ))}
        </div>
      </div>

      <div className="border rounded-lg p-4">
        <Skeleton className="h-6 w-40 mb-2" />
        <div className="space-y-2">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-4 w-full" />
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="border rounded-lg p-4">
            <Skeleton className="h-6 w-32 mb-2" />
            <Skeleton className="h-20 w-full" />
          </div>
        ))}
      </div>
    </div>
  )
}

