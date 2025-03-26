import { prisma } from "../prisma"
import { generateRPP } from "../ai/rppGenerator"

export const resolvers = {
  Query: {
    getRpp: async (_, { id }) => {
      return await prisma.rPP.findUnique({
        where: { id },
      })
    },
    listRpps: async () => {
      return await prisma.rPP.findMany()
    },
  },
  Mutation: {
    createRpp: async (_, { input }) => {
      try {
        // Transform input to match the AI generator's expected format
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

        // Generate the RPP document using AI
        const generatedRPP = await generateRPP(generatorInput)

        // Save the generated RPP to the database
        const savedRPP = await prisma.rPP.create({
          data: {
            satuan_pendidikan: input.satuanPendidikan,
            mataPelajaran: input.mataPelajaran,
            kelas_semester: input.kelas,
            alokasi_waktu: input.alokasi_waktu,
            materi_pokok: input.topik,
            tujuan_pembelajaran: generatedRPP.tujuan_pembelajaran,
            profil_pelajar_pancasila: generatedRPP.profil_pelajar_pancasila,
            materi_pembelajaran: generatedRPP.materi_pembelajaran,
            alur_kegiatan_pembelajaran: generatedRPP.alur_kegiatan_pembelajaran,
            asesmen_pembelajaran: generatedRPP.asesmen_pembelajaran,
            sumber_dan_media_pembelajaran: generatedRPP.sumber_dan_media_pembelajaran,
            refleksi_guru: generatedRPP.refleksi_guru,
            // Link to the teacher who created it (assuming you have auth context)
            teacherId: "current-teacher-id", // This should come from auth context
          },
        })

        return savedRPP
      } catch (error) {
        console.error("Error creating RPP:", error)
        throw new Error(`Failed to create RPP: ${error.message}`)
      }
    },
    updateRpp: async (_, { id, input }) => {
      // Implementation for updating an RPP
      return await prisma.rPP.update({
        where: { id },
        data: {
          // Update fields as needed
          satuan_pendidikan: input.satuanPendidikan,
          mataPelajaran: input.mataPelajaran,
          // Add other fields as needed
        },
      })
    },
    deleteRpp: async (_, { id }) => {
      await prisma.rPP.delete({
        where: { id },
      })
      return true
    },
  },
}

