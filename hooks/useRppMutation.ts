import { gql, useMutation } from "@apollo/client"

const CREATE_RPP = gql`
  mutation CreateRpp($input: RPPInput!) {
    createRpp(input: $input) {
      id
      satuan_pendidikan
      mataPelajaran
      kelas_semester
      alokasi_waktu
      materi_pokok
      materi_pembelajaran {
        pendahuluan {
          kegiatan
          deskripsi
        }
        inti {
          kegiatan
          deskripsi
        }
        penutup {
          kegiatan
          deskripsi
        }
      }
      tujuan_pembelajaran
      profil_pelajar_pancasila
      alur_kegiatan_pembelajaran {
        pendahuluan {
          deskripsi
          durasi
        }
        inti {
          deskripsi
          durasi
        }
        penutup {
          deskripsi
          durasi
        }
      }
      asesmen_pembelajaran {
        diagnostik
        formatif
        sumatif
      }
      sumber_dan_media_pembelajaran {
        buku
        media_digital
        metode
      }
      refleksi_guru {
        pencapaian_tujuan
        tantangan
        strategi_perbaikan
      }
    }
  }
`

export function useRppMutation() {
  const [createRpp, { data, loading, error }] = useMutation(CREATE_RPP)

  const createNewRpp = async (rppData) => {
    try {
      const response = await createRpp({
        variables: {
          input: {
            satuanPendidikan: rppData.satuanPendidikan,
            mataPelajaran: rppData.mataPelajaran,
            topik: rppData.topik,
            kelas: rppData.kelas,
            jenjangPendidikan: rppData.jenjangPendidikan,
            fase: rppData.fase,
            cakupanMateri: rppData.cakupanMateri,
            alokasi_waktu: rppData.alokasi_waktu,
            tujuanPembelajaran: rppData.tujuanPembelajaran,
            profilPelajarPancasila: rppData.profilPelajarPancasila,
            kompetensiAwal: rppData.kompetensiAwal,
            modelPembelajaran: rppData.modelPembelajaran,
            sumberBelajar: rppData.sumberBelajar,
            mediaDigital: rppData.mediaDigital,
            metodePembelajaran: rppData.metodePembelajaran,
          },
        },
      })

      return response.data.createRpp
    } catch (err) {
      console.error("Error creating RPP:", err)
      throw err
    }
  }

  return {
    createRpp: createNewRpp,
    data,
    loading,
    error,
  }
}

