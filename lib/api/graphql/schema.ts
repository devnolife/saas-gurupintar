import { gql } from "graphql-tag"

export const typeDefs = gql`
  enum JenjangPendidikan {
    SD
    SMP
    SMA
    SMK
  }

  enum Fase {
    A
    B
    C
    D
    E
  }

  type KegiatanDeskripsi {
    kegiatan: String
    deskripsi: String
  }

  type KegiatanDurasi {
    deskripsi: String
    durasi: String
  }

  type MateriPembelajaran {
    pendahuluan: [KegiatanDeskripsi]
    inti: [KegiatanDeskripsi]
    penutup: [KegiatanDeskripsi]
  }

  type AlurKegiatanPembelajaran {
    pendahuluan: [KegiatanDurasi]
    inti: [KegiatanDurasi]
    penutup: [KegiatanDurasi]
  }

  type AsesmenPembelajaran {
    diagnostik: String
    formatif: String
    sumatif: String
  }

  type SumberDanMediaPembelajaran {
    buku: [String]
    media_digital: [String]
    metode: [String]
  }

  type RefleksiGuru {
    pencapaian_tujuan: String
    tantangan: String
    strategi_perbaikan: String
  }

  type RPP {
    id: ID!
    satuan_pendidikan: String
    mataPelajaran: String
    kelas_semester: String
    alokasi_waktu: String
    materi_pokok: String
    materi_pembelajaran: MateriPembelajaran
    tujuan_pembelajaran: [String]
    profil_pelajar_pancasila: [String]
    alur_kegiatan_pembelajaran: AlurKegiatanPembelajaran
    asesmen_pembelajaran: AsesmenPembelajaran
    sumber_dan_media_pembelajaran: SumberDanMediaPembelajaran
    refleksi_guru: RefleksiGuru
  }

  input RPPInput {
    satuanPendidikan: String!
    mataPelajaran: String!
    topik: String!
    kelas: String!
    jenjangPendidikan: JenjangPendidikan!
    fase: Fase!
    cakupanMateri: String!
    alokasi_waktu: String!
    # Additional fields that might be in the teacher dashboard
    tujuanPembelajaran: [String]
    profilPelajarPancasila: [String]
    kompetensiAwal: String
    modelPembelajaran: String
    sumberBelajar: [String]
    mediaDigital: [String]
    metodePembelajaran: [String]
  }

  type Query {
    getRpp(id: ID!): RPP
    listRpps: [RPP]
  }

  type Mutation {
    createRpp(input: RPPInput!): RPP
    updateRpp(id: ID!, input: RPPInput!): RPP
    deleteRpp(id: ID!): Boolean
  }
`

