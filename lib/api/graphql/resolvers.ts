import { prisma } from "../prisma"
import { generateRPP } from "../ai/rppGenerator"

export const resolvers = {
  Query: {
    getRpp: async (_: any, { id }: { id: string }) => {
      return await prisma.rPP.findUnique({
        where: { id },
      })
    },
    listRpps: async () => {
      return await prisma.rPP.findMany()
    },
  },
  Mutation: {
    createRpp: async (_: any, { input }: { input: any }) => {
      try {
        const generatorInput = {
          satuan_pendidikan: input.satuanPendidikan,
          mata_pelajaran: input.mataPelajaran,
          topik: input.topik,
          kelas: input.kelas,
          jenjang_pendidikan: input.jenjangPendidikan,
          fase: input.fase,
          cakupan_materi: input.cakupanMateri,
          alokasi_waktu: input.alokasi_waktu,
          tujuan_pembelajaran: input.tujuanPembelajaran || [],
          profil_pelajar_pancasila: input.profilPelajarPancasila || [],
          kompetensi_awal: input.kompetensiAwal || "",
          model_pembelajaran: input.modelPembelajaran || "",
          sumber_belajar: input.sumberBelajar || [],
          media_digital: input.mediaDigital || [],
          metode_pembelajaran: input.metodePembelajaran || [],
        }

        const generatedRPP = await generateRPP(generatorInput)

        // Save the generated RPP to the database
        const savedRPP = await prisma.rPP.create({
          data: {
            title: input.topik,
            subject: input.mataPelajaran,
            grade: input.kelas,
            duration: input.alokasi_waktu,
            kompetensiAwal: input.kompetensiAwal || "",
            profilPelajarPancasila: generatedRPP.profil_pelajar_pancasila,
            modelPembelajaran: input.modelPembelajaran || "",
            learningObjectives: generatedRPP.tujuan_pembelajaran,
            assessment: JSON.stringify(generatedRPP.asesmen_pembelajaran),
            refleksiGuru: JSON.stringify(generatedRPP.refleksi_guru),
            creatorId: "current-teacher-id", // This should come from auth context
            teacherId: "current-teacher-id", // This should come from auth context
          },
        })

        return savedRPP
      } catch (error: unknown) {
        console.error("Error creating RPP:", error)
        if (error instanceof Error) {
          throw new Error(`Failed to create RPP: ${error.message}`)
        }
        throw new Error('Failed to create RPP: Unknown error occurred')
      }
    },
    updateRpp: async (_: any, { id, input }: { id: string, input: any }) => {
      return await prisma.rPP.update({
        where: { id },
        data: {
          title: input.topik,
          subject: input.mataPelajaran,
          grade: input.kelas,
          duration: input.alokasi_waktu,
          kompetensiAwal: input.kompetensiAwal,
          profilPelajarPancasila: input.profilPelajarPancasila,
          modelPembelajaran: input.modelPembelajaran,
        },
      })
    },
    deleteRpp: async (_: unknown, { id }: { id: string }) => {
      await prisma.rPP.delete({
        where: { id },
      })
      return true
    },
  },
}

