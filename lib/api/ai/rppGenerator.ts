import { Configuration, OpenAIApi } from "openai"

// Initialize OpenAI client
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

export async function generateRPP(input) {
  try {
    const prompt = `
      Buatkan Rencana Pelaksanaan Pembelajaran (RPP) dengan detail berikut:
      
      Satuan Pendidikan: ${input.satuan_pendidikan}
      Mata Pelajaran: ${input.mata_pelajaran}
      Topik: ${input.topik}
      Kelas: ${input.kelas}
      Jenjang Pendidikan: ${input.jenjang_pendidikan}
      Fase: ${input.fase}
      Cakupan Materi: ${input.cakupan_materi}
      Alokasi Waktu: ${input.alokasi_waktu}
      
      Hasilkan RPP lengkap dengan:
      1. Tujuan Pembelajaran
      2. Profil Pelajar Pancasila
      3. Materi Pembelajaran (pendahuluan, inti, penutup)
      4. Alur Kegiatan Pembelajaran dengan durasi
      5. Asesmen Pembelajaran (diagnostik, formatif, sumatif)
      6. Sumber dan Media Pembelajaran
      7. Refleksi Guru
      
      Format dalam JSON.
    `

    const response = await openai.createCompletion({
      model: "gpt-4",
      prompt: prompt,
      max_tokens: 2000,
      temperature: 0.7,
    })

    // Parse the generated JSON response
    const generatedRPP = JSON.parse(response.data.choices[0].text.trim())

    return {
      tujuan_pembelajaran: generatedRPP.tujuan_pembelajaran || [],
      profil_pelajar_pancasila: generatedRPP.profil_pelajar_pancasila || [],
      materi_pembelajaran: {
        pendahuluan: generatedRPP.materi_pembelajaran?.pendahuluan || [],
        inti: generatedRPP.materi_pembelajaran?.inti || [],
        penutup: generatedRPP.materi_pembelajaran?.penutup || [],
      },
      alur_kegiatan_pembelajaran: {
        pendahuluan: generatedRPP.alur_kegiatan_pembelajaran?.pendahuluan || [],
        inti: generatedRPP.alur_kegiatan_pembelajaran?.inti || [],
        penutup: generatedRPP.alur_kegiatan_pembelajaran?.penutup || [],
      },
      asesmen_pembelajaran: {
        diagnostik: generatedRPP.asesmen_pembelajaran?.diagnostik || "",
        formatif: generatedRPP.asesmen_pembelajaran?.formatif || "",
        sumatif: generatedRPP.asesmen_pembelajaran?.sumatif || "",
      },
      sumber_dan_media_pembelajaran: {
        buku: generatedRPP.sumber_dan_media_pembelajaran?.buku || [],
        media_digital: generatedRPP.sumber_dan_media_pembelajaran?.media_digital || [],
        metode: generatedRPP.sumber_dan_media_pembelajaran?.metode || [],
      },
      refleksi_guru: {
        pencapaian_tujuan: generatedRPP.refleksi_guru?.pencapaian_tujuan || "",
        tantangan: generatedRPP.refleksi_guru?.tantangan || "",
        strategi_perbaikan: generatedRPP.refleksi_guru?.strategi_perbaikan || "",
      },
    }
  } catch (error) {
    console.error("Error generating RPP:", error)
    throw new Error(`Failed to generate RPP: ${error.message}`)
  }
}

