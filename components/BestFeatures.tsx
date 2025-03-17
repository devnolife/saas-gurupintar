"use client"

import { motion } from "framer-motion"
import { Users, TabletsIcon as Devices, PieChart } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { ResponsiveContainer, PieChart as RePieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts"

const pieData = [{ value: 85 }, { value: 15 }]
const barData = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 600 },
  { name: "Apr", value: 400 },
  { name: "May", value: 500 },
]

const features = [
  {
    title: "Antarmuka Terbaik",
    description: "Nikmati pengalaman mengajar yang lebih baik dengan antarmuka yang intuitif dan mudah digunakan.",
    icon: Users,
    chart: (
      <ResponsiveContainer width="100%" height={200}>
        <RePieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            startAngle={90}
            endAngle={450}
            dataKey="value"
          >
            <Cell fill="hsl(var(--primary))" />
            <Cell fill="hsl(var(--muted))" />
          </Pie>
        </RePieChart>
      </ResponsiveContainer>
    ),
  },
  {
    title: "Akses Multi-Perangkat",
    description: "Akses RPP dan materi pembelajaran Anda dari berbagai perangkat, kapan saja dan di mana saja.",
    icon: Devices,
    stats: [
      { name: "Pak Budi", role: "Guru Matematika", avatar: "/placeholder.svg" },
      { name: "Bu Siti", role: "Guru Bahasa", avatar: "/placeholder.svg" },
      { name: "Pak Ahmad", role: "Guru IPA", avatar: "/placeholder.svg" },
    ],
  },
  {
    title: "Laporan Akurat",
    description: "Dapatkan wawasan mendalam tentang perkembangan pembelajaran dengan laporan yang detail dan akurat.",
    icon: PieChart,
    chart: (
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={barData}>
          <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
          <YAxis stroke="hsl(var(--muted-foreground))" />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--background))",
              border: "1px solid hsl(var(--border))",
            }}
          />
          <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    ),
  },
]

export function BestFeatures() {
  return (
    <section className="w-full bg-gradient-to-b from-background to-background/50 py-24">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center space-y-12"
        >
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl lg:text-5xl">
              Fitur Terbaik{" "}
              <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">Selalu</span>
            </h2>
            <p className="mx-auto mt-4 max-w-[600px] text-muted-foreground">
              Guru Pintar melindungi data Anda dengan sistem keamanan kelas dunia yang membantu mendeteksi kecurangan
              dan mencegah peretasan. Amankan akun Anda.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="relative overflow-hidden">
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <feature.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="mb-2 text-xl font-bold">{feature.title}</h3>
                    <p className="mb-4 text-muted-foreground">{feature.description}</p>
                    {feature.chart && <div className="mt-6">{feature.chart}</div>}
                    {feature.stats && (
                      <div className="mt-6 space-y-4">
                        {feature.stats.map((stat, i) => (
                          <div key={i} className="flex items-center space-x-4">
                            <div className="relative h-10 w-10 overflow-hidden rounded-full bg-muted">
                              <img
                                src={stat.avatar || "/placeholder.svg"}
                                alt={stat.name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div>
                              <p className="text-sm font-medium leading-none">{stat.name}</p>
                              <p className="text-sm text-muted-foreground">{stat.role}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

