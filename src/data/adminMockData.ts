export const dashboardStats = {
  mentorCount: 25,
  studentCount: 150,
  liveSessionCount: 3,
  upcomingSessionCount: 8
};

export const mentors = [
  {
    id: "M001",
    name: "Dr. Sarah Johnson",
    domain: "JEE",
    rating: 4.8,
    sessions: 45
  },
  {
    id: "M002",
    name: "Prof. Raj Kumar",
    domain: "NEET",
    rating: 4.9,
    sessions: 38
  },
  {
    id: "M003",
    name: "Dr. Priya Sharma",
    domain: "NEET",
    rating: 4.7,
    sessions: 52
  },
  {
    id: "M004",
    name: "Arjun Mehta",
    domain: "JEE",
    rating: 4.6,
    sessions: 32
  },
  {
    id: "M005",
    name: "Rahul Kumar",
    domain: "UPSC",
    rating: 4.7,
    sessions: 22
  },
  {
    id: "M006",
    name: "Sneha Gupta",
    domain: "GATE",
    rating: 4.5,
    sessions: 35
  },
  {
    id: "M007",
    name: "Dr. Amit Patel",
    domain: "JEE",
    rating: 4.9,
    sessions: 67
  },
  {
    id: "M008",
    name: "Prof. Kavya Singh",
    domain: "NEET",
    rating: 4.8,
    sessions: 41
  },
  {
    id: "M009",
    name: "Vikram Joshi",
    domain: "UPSC",
    rating: 4.4,
    sessions: 28
  },
  {
    id: "M010",
    name: "Dr. Meera Reddy",
    domain: "GATE",
    rating: 4.6,
    sessions: 39
  }
];

export const students = [
  {
    id: "S001",
    name: "Arjun Patel",
    email: "arjun.patel@email.com",
    domain: "JEE",
    sessionsAttended: 12,
    performance: 85
  },
  {
    id: "S002",
    name: "Priya Sharma",
    email: "priya.sharma@email.com",
    domain: "NEET",
    sessionsAttended: 15,
    performance: 92
  },
  {
    id: "S003",
    name: "Rohit Singh",
    email: "rohit.singh@email.com",
    domain: "JEE",
    sessionsAttended: 8,
    performance: 78
  },
  {
    id: "S004",
    name: "Ananya Gupta",
    email: "ananya.gupta@email.com",
    domain: "NEET",
    sessionsAttended: 22,
    performance: 95
  },
  {
    id: "S005",
    name: "Vikash Kumar",
    email: "vikash.kumar@email.com",
    domain: "UPSC",
    sessionsAttended: 18,
    performance: 88
  },
  {
    id: "S006",
    name: "Kavya Reddy",
    email: "kavya.reddy@email.com",
    domain: "GATE",
    sessionsAttended: 14,
    performance: 82
  },
  {
    id: "S007",
    name: "Amit Verma",
    email: "amit.verma@email.com",
    domain: "JEE",
    sessionsAttended: 25,
    performance: 91
  },
  {
    id: "S008",
    name: "Neha Joshi",
    email: "neha.joshi@email.com",
    domain: "NEET",
    sessionsAttended: 11,
    performance: 76
  },
  {
    id: "S009",
    name: "Ravi Mehta",
    email: "ravi.mehta@email.com",
    domain: "UPSC",
    sessionsAttended: 16,
    performance: 84
  },
  {
    id: "S010",
    name: "Srishti Agarwal",
    email: "srishti.agarwal@email.com",
    domain: "GATE",
    sessionsAttended: 20,
    performance: 89
  }
];

export const sessionData = {
  liveSessions: [
    // JEE Sessions
    {
      id: "L001",
      mentorName: "Dr. Sarah Johnson",
      mentorId: "M001",
      subject: "Physics - Mechanics",
      domain: "JEE",
      studentsAttending: 25,
      feedbackGiven: false
    },
    {
      id: "L002",
      mentorName: "Arjun Mehta",
      mentorId: "M004",
      subject: "Mathematics - Algebra",
      domain: "JEE",
      studentsAttending: 28,
      feedbackGiven: false
    },
    {
      id: "L003",
      mentorName: "Dr. Amit Patel",
      mentorId: "M007",
      subject: "Chemistry - Thermodynamics",
      domain: "JEE",
      studentsAttending: 22,
      feedbackGiven: true
    },
    {
      id: "L004",
      mentorName: "Dr. Sarah Johnson",
      mentorId: "M001",
      subject: "Physics - Electromagnetism",
      domain: "JEE",
      studentsAttending: 30,
      feedbackGiven: false
    },
    // NEET Sessions
    {
      id: "L005",
      mentorName: "Prof. Raj Kumar",
      mentorId: "M002",
      subject: "Chemistry - Organic",
      domain: "NEET",
      studentsAttending: 18,
      feedbackGiven: false
    },
    {
      id: "L006",
      mentorName: "Dr. Priya Sharma",
      mentorId: "M003",
      subject: "Biology - Cell Biology",
      domain: "NEET",
      studentsAttending: 32,
      feedbackGiven: true
    },
    {
      id: "L007",
      mentorName: "Prof. Kavya Singh",
      mentorId: "M008",
      subject: "Biology - Genetics",
      domain: "NEET",
      studentsAttending: 26,
      feedbackGiven: false
    },
    {
      id: "L008",
      mentorName: "Prof. Raj Kumar",
      mentorId: "M002",
      subject: "Chemistry - Inorganic",
      domain: "NEET",
      studentsAttending: 20,
      feedbackGiven: true
    },
    // UPSC Sessions
    {
      id: "L009",
      mentorName: "Rahul Kumar",
      mentorId: "M005",
      subject: "History - Ancient India",
      domain: "UPSC",
      studentsAttending: 15,
      feedbackGiven: true
    },
    {
      id: "L010",
      mentorName: "Vikram Joshi",
      mentorId: "M009",
      subject: "Geography - Physical Geography",
      domain: "UPSC",
      studentsAttending: 18,
      feedbackGiven: false
    },
    // GATE Sessions
    {
      id: "L011",
      mentorName: "Sneha Gupta",
      mentorId: "M006",
      subject: "Computer Science - Data Structures",
      domain: "GATE",
      studentsAttending: 35,
      feedbackGiven: false
    },
    {
      id: "L012",
      mentorName: "Dr. Meera Reddy",
      mentorId: "M010",
      subject: "Electronics - Digital Circuits",
      domain: "GATE",
      studentsAttending: 24,
      feedbackGiven: true
    }
  ],
  upcomingSessions: [
    // JEE Upcoming Sessions
    {
      id: "U001",
      mentorName: "Dr. Sarah Johnson",
      mentorId: "M001",
      subject: "Physics - Optics",
      domain: "JEE",
      studentsRegistered: 28,
      canDelete: true
    },
    {
      id: "U002",
      mentorName: "Arjun Mehta",
      mentorId: "M004",
      subject: "Mathematics - Calculus",
      domain: "JEE",
      studentsRegistered: 32,
      canDelete: true
    },
    {
      id: "U003",
      mentorName: "Dr. Amit Patel",
      mentorId: "M007",
      subject: "Chemistry - Organic Reactions",
      domain: "JEE",
      studentsRegistered: 25,
      canDelete: true
    },
    // NEET Upcoming Sessions
    {
      id: "U004",
      mentorName: "Prof. Raj Kumar",
      mentorId: "M002",
      subject: "Chemistry - Physical Chemistry",
      domain: "NEET",
      studentsRegistered: 22,
      canDelete: true
    },
    {
      id: "U005",
      mentorName: "Dr. Priya Sharma",
      mentorId: "M003",
      subject: "Biology - Ecology",
      domain: "NEET",
      studentsRegistered: 35,
      canDelete: true
    },
    {
      id: "U006",
      mentorName: "Prof. Kavya Singh",
      mentorId: "M008",
      subject: "Biology - Human Physiology",
      domain: "NEET",
      studentsRegistered: 30,
      canDelete: true
    },
    // UPSC Upcoming Sessions
    {
      id: "U007",
      mentorName: "Rahul Kumar",
      mentorId: "M005",
      subject: "History - Medieval India",
      domain: "UPSC",
      studentsRegistered: 18,
      canDelete: true
    },
    {
      id: "U008",
      mentorName: "Vikram Joshi",
      mentorId: "M009",
      subject: "Political Science - Indian Constitution",
      domain: "UPSC",
      studentsRegistered: 20,
      canDelete: true
    },
    // GATE Upcoming Sessions
    {
      id: "U009",
      mentorName: "Sneha Gupta",
      mentorId: "M006",
      subject: "Computer Science - Algorithms",
      domain: "GATE",
      studentsRegistered: 40,
      canDelete: true
    },
    {
      id: "U010",
      mentorName: "Dr. Meera Reddy",
      mentorId: "M010",
      subject: "Electronics - Communication Systems",
      domain: "GATE",
      studentsRegistered: 28,
      canDelete: true
    }
  ],
  endedSessions: [
    // JEE Ended Sessions
    {
      id: "E001",
      mentorName: "Dr. Sarah Johnson",
      mentorId: "M001",
      subject: "Mathematics - Calculus",
      domain: "JEE",
      studentsAttended: 22,
      feedbackCollected: true
    },
    {
      id: "E002",
      mentorName: "Arjun Mehta",
      mentorId: "M004",
      subject: "Physics - Waves",
      domain: "JEE",
      studentsAttended: 26,
      feedbackCollected: true
    },
    {
      id: "E003",
      mentorName: "Dr. Amit Patel",
      mentorId: "M007",
      subject: "Chemistry - Atomic Structure",
      domain: "JEE",
      studentsAttended: 28,
      feedbackCollected: false
    },
    // NEET Ended Sessions
    {
      id: "E004",
      mentorName: "Prof. Raj Kumar",
      mentorId: "M002",
      subject: "Chemistry - Coordination Compounds",
      domain: "NEET",
      studentsAttended: 20,
      feedbackCollected: true
    },
    {
      id: "E005",
      mentorName: "Dr. Priya Sharma",
      mentorId: "M003",
      subject: "Biology - Plant Physiology",
      domain: "NEET",
      studentsAttended: 33,
      feedbackCollected: true
    },
    {
      id: "E006",
      mentorName: "Prof. Kavya Singh",
      mentorId: "M008",
      subject: "Biology - Molecular Biology",
      domain: "NEET",
      studentsAttended: 29,
      feedbackCollected: false
    },
    // UPSC Ended Sessions
    {
      id: "E007",
      mentorName: "Rahul Kumar",
      mentorId: "M005",
      subject: "History - Modern India",
      domain: "UPSC",
      studentsAttended: 16,
      feedbackCollected: true
    },
    {
      id: "E008",
      mentorName: "Vikram Joshi",
      mentorId: "M009",
      subject: "Economics - Indian Economy",
      domain: "UPSC",
      studentsAttended: 19,
      feedbackCollected: true
    },
    // GATE Ended Sessions
    {
      id: "E009",
      mentorName: "Sneha Gupta",
      mentorId: "M006",
      subject: "Computer Science - Operating Systems",
      domain: "GATE",
      studentsAttended: 38,
      feedbackCollected: true
    },
    {
      id: "E010",
      mentorName: "Dr. Meera Reddy",
      mentorId: "M010",
      subject: "Electronics - Control Systems",
      domain: "GATE",
      studentsAttended: 25,
      feedbackCollected: false
    }
  ]
};

export const studentSessionData = {
  L001: [
    { name: "Arjun Patel", email: "arjun.patel@email.com", status: "Attending" as const },
    { name: "Rohit Singh", email: "rohit.singh@email.com", status: "Attending" as const },
    { name: "Amit Verma", email: "amit.verma@email.com", status: "Attending" as const },
    { name: "Vikash Kumar", email: "vikash.kumar@email.com", status: "Not Attending" as const },
    { name: "Ravi Mehta", email: "ravi.mehta@email.com", status: "Attending" as const },
    { name: "Siddharth Jain", email: "siddharth.jain@email.com", status: "Attending" as const },
    { name: "Karan Singh", email: "karan.singh@email.com", status: "Not Attending" as const },
    { name: "Nikhil Sharma", email: "nikhil.sharma@email.com", status: "Attending" as const }
  ],
  L002: [
    { name: "Priya Sharma", email: "priya.sharma@email.com", status: "Attending" as const },
    { name: "Ananya Gupta", email: "ananya.gupta@email.com", status: "Not Attending" as const },
    { name: "Kavya Reddy", email: "kavya.reddy@email.com", status: "Attending" as const },
    { name: "Neha Joshi", email: "neha.joshi@email.com", status: "Attending" as const },
    { name: "Srishti Agarwal", email: "srishti.agarwal@email.com", status: "Attending" as const },
    { name: "Pooja Singh", email: "pooja.singh@email.com", status: "Not Attending" as const },
    { name: "Divya Patel", email: "divya.patel@email.com", status: "Attending" as const },
    { name: "Shruti Gupta", email: "shruti.gupta@email.com", status: "Attending" as const }
  ]
};

export const payments = [
  {
    id: "P001",
    studentName: "Arjun Patel",
    email: "arjun.patel@email.com",
    domain: "JEE",
    sessionId: "L001",
    amount: 500,
    status: "Completed",
    paymentDate: "2024-01-15"
  },
  {
    id: "P002",
    studentName: "Priya Sharma",
    email: "priya.sharma@email.com",
    domain: "NEET",
    sessionId: "L002",
    amount: 750,
    status: "Completed",
    paymentDate: "2024-01-16"
  },
  {
    id: "P003",
    studentName: "Rohit Singh",
    email: "rohit.singh@email.com",
    domain: "JEE",
    sessionId: "L003",
    amount: 600,
    status: "Pending",
    paymentDate: "2024-01-17"
  },
  {
    id: "P004",
    studentName: "Ananya Gupta",
    email: "ananya.gupta@email.com",
    domain: "NEET",
    sessionId: "L004",
    amount: 800,
    status: "Completed",
    paymentDate: "2024-01-18"
  },
  {
    id: "P005",
    studentName: "Vikash Kumar",
    email: "vikash.kumar@email.com",
    domain: "UPSC",
    sessionId: "L005",
    amount: 650,
    status: "Failed",
    paymentDate: "2024-01-19"
  },
  {
    id: "P006",
    studentName: "Kavya Reddy",
    email: "kavya.reddy@email.com",
    domain: "GATE",
    sessionId: "L001",
    amount: 550,
    status: "Completed",
    paymentDate: "2024-01-20"
  },
  {
    id: "P007",
    studentName: "Amit Verma",
    email: "amit.verma@email.com",
    domain: "JEE",
    sessionId: "L002",
    amount: 700,
    status: "Completed",
    paymentDate: "2024-01-21"
  },
  {
    id: "P008",
    studentName: "Neha Joshi",
    email: "neha.joshi@email.com",
    domain: "NEET",
    sessionId: "L003",
    amount: 620,
    status: "Pending",
    paymentDate: "2024-01-22"
  }
];