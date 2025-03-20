export type CurriculumSubject = {
  id: string
  name: string
  grade: string
  description: string
  objectives: string[]
  topics: {
    title: string
    subtopics: string[]
    duration: string
  }[]
  resources: {
    type: string
    title: string
    link?: string
  }[]
  assessmentMethods: string[]
  teacherId: string
}

export const curriculumSubjects: CurriculumSubject[] = [
  {
    id: "SUB001",
    name: "Advanced Mathematics",
    grade: "12",
    description:
      "This course covers advanced mathematical concepts including calculus, statistics, and linear algebra to prepare students for university-level mathematics.",
    objectives: [
      "Develop proficiency in differential and integral calculus",
      "Apply statistical methods to analyze real-world data",
      "Understand and apply concepts of linear algebra",
      "Develop mathematical reasoning and proof techniques",
    ],
    topics: [
      {
        title: "Calculus",
        subtopics: ["Limits and Continuity", "Differentiation", "Integration", "Applications of Calculus"],
        duration: "10 weeks",
      },
      {
        title: "Statistics",
        subtopics: ["Probability Distributions", "Hypothesis Testing", "Regression Analysis", "Data Visualization"],
        duration: "8 weeks",
      },
      {
        title: "Linear Algebra",
        subtopics: [
          "Vectors and Vector Spaces",
          "Matrices and Determinants",
          "Eigenvalues and Eigenvectors",
          "Linear Transformations",
        ],
        duration: "8 weeks",
      },
    ],
    resources: [
      {
        type: "Textbook",
        title: "Advanced Mathematics for High School Students",
      },
      {
        type: "Online Resource",
        title: "Khan Academy - Calculus",
        link: "https://www.khanacademy.org/math/calculus-1",
      },
      {
        type: "Software",
        title: "GeoGebra",
      },
    ],
    assessmentMethods: ["Weekly problem sets", "Mid-term examination", "Final project", "End-of-term examination"],
    teacherId: "TCH001",
  },
  {
    id: "SUB002",
    name: "Biology",
    grade: "11",
    description:
      "This course explores the fundamental principles of biology, focusing on cellular processes, genetics, evolution, and ecology.",
    objectives: [
      "Understand cellular structure and function",
      "Explain genetic inheritance and molecular genetics",
      "Analyze evolutionary processes and biodiversity",
      "Evaluate ecological relationships and environmental impacts",
    ],
    topics: [
      {
        title: "Cell Biology",
        subtopics: ["Cell Structure and Function", "Cellular Respiration", "Photosynthesis", "Cell Division"],
        duration: "8 weeks",
      },
      {
        title: "Genetics",
        subtopics: ["Mendelian Genetics", "Molecular Genetics", "Gene Expression", "Genetic Engineering"],
        duration: "9 weeks",
      },
      {
        title: "Evolution and Ecology",
        subtopics: ["Natural Selection", "Speciation", "Ecosystem Dynamics", "Conservation Biology"],
        duration: "9 weeks",
      },
    ],
    resources: [
      {
        type: "Textbook",
        title: "Modern Biology",
      },
      {
        type: "Lab Manual",
        title: "Biology Laboratory Investigations",
      },
      {
        type: "Online Resource",
        title: "HHMI BioInteractive",
        link: "https://www.biointeractive.org/",
      },
    ],
    assessmentMethods: ["Laboratory reports", "Research papers", "Quizzes and tests", "Field study project"],
    teacherId: "TCH002",
  },
  {
    id: "SUB003",
    name: "World History",
    grade: "10",
    description:
      "This course examines major historical events, movements, and developments that have shaped human civilization from ancient times to the present day.",
    objectives: [
      "Analyze significant historical events and their global impact",
      "Evaluate primary and secondary historical sources",
      "Understand diverse cultural perspectives throughout history",
      "Develop critical thinking skills through historical inquiry",
    ],
    topics: [
      {
        title: "Ancient Civilizations",
        subtopics: ["Mesopotamia and Egypt", "Ancient Greece", "Roman Empire", "Early Asian Civilizations"],
        duration: "7 weeks",
      },
      {
        title: "Middle Ages to Renaissance",
        subtopics: ["Feudal Systems", "Islamic Golden Age", "Renaissance and Reformation", "Age of Exploration"],
        duration: "8 weeks",
      },
      {
        title: "Modern Era",
        subtopics: ["Industrial Revolution", "World Wars", "Decolonization", "Globalization"],
        duration: "11 weeks",
      },
    ],
    resources: [
      {
        type: "Textbook",
        title: "Perspectives on World History",
      },
      {
        type: "Atlas",
        title: "Historical World Atlas",
      },
      {
        type: "Online Resource",
        title: "World History Encyclopedia",
        link: "https://www.worldhistory.org/",
      },
    ],
    assessmentMethods: [
      "Document-based questions",
      "Historical essays",
      "Timeline projects",
      "Debates and presentations",
    ],
    teacherId: "TCH003",
  },
  {
    id: "SUB004",
    name: "Physics",
    grade: "12",
    description:
      "This course explores the fundamental principles of physics, including mechanics, electricity and magnetism, thermodynamics, and modern physics.",
    objectives: [
      "Apply principles of classical mechanics to solve problems",
      "Understand electromagnetic phenomena and applications",
      "Analyze thermodynamic systems and processes",
      "Explore concepts of modern physics including quantum mechanics",
    ],
    topics: [
      {
        title: "Mechanics",
        subtopics: ["Kinematics", "Newton's Laws", "Work, Energy, and Power", "Rotational Motion"],
        duration: "9 weeks",
      },
      {
        title: "Electricity and Magnetism",
        subtopics: ["Electric Fields and Forces", "Circuits", "Magnetic Fields", "Electromagnetic Induction"],
        duration: "8 weeks",
      },
      {
        title: "Modern Physics",
        subtopics: ["Special Relativity", "Quantum Mechanics", "Nuclear Physics", "Particle Physics"],
        duration: "9 weeks",
      },
    ],
    resources: [
      {
        type: "Textbook",
        title: "Fundamentals of Physics",
      },
      {
        type: "Lab Equipment",
        title: "Physics Laboratory Kit",
      },
      {
        type: "Online Resource",
        title: "PhET Interactive Simulations",
        link: "https://phet.colorado.edu/en/simulations/category/physics",
      },
    ],
    assessmentMethods: ["Problem sets", "Laboratory experiments", "Physics projects", "Written examinations"],
    teacherId: "TCH004",
  },
  {
    id: "SUB005",
    name: "English Literature",
    grade: "11",
    description:
      "This course explores significant works of literature from various periods, genres, and cultures, focusing on critical analysis and interpretation.",
    objectives: [
      "Analyze literary works for themes, style, and cultural context",
      "Develop critical reading and analytical writing skills",
      "Compare and contrast literary movements and traditions",
      "Articulate informed interpretations through discussion and essays",
    ],
    topics: [
      {
        title: "Classical Literature",
        subtopics: ["Epic Poetry", "Greek Tragedy", "Roman Literature", "Classical Influences"],
        duration: "7 weeks",
      },
      {
        title: "Modern Literature",
        subtopics: ["The Novel", "Modern Poetry", "Drama", "Short Fiction"],
        duration: "10 weeks",
      },
      {
        title: "World Literature",
        subtopics: ["Asian Literature", "African Literature", "Latin American Literature", "Comparative Studies"],
        duration: "9 weeks",
      },
    ],
    resources: [
      {
        type: "Anthology",
        title: "The Norton Anthology of World Literature",
      },
      {
        type: "Novels",
        title: "Selected Works (varies by semester)",
      },
      {
        type: "Online Resource",
        title: "Project Gutenberg",
        link: "https://www.gutenberg.org/",
      },
    ],
    assessmentMethods: [
      "Literary analysis essays",
      "Class discussions",
      "Creative writing projects",
      "Oral presentations",
    ],
    teacherId: "TCH005",
  },
]

export const getCurriculumSubjectById = (id: string): CurriculumSubject | undefined => {
  return curriculumSubjects.find((subject) => subject.id === id)
}

