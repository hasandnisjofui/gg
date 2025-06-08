import express from "express";
import cors from "cors";

const server = express();

server.use(cors({
  origin: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

server.use(express.json());
const admins = [
  {
    id: 1,
    name: "Ali",
    surname: "Valiyev",
    email: "ali@mail.com",
    rol: "manager",
    efficiency: "faol",
  },
  {
    id: 2,
    name: "Olim",
    surname: "Xusanov",
    email: "olim@mail.com",
    rol: "manager",
    efficiency: "nofaol",
  },
  {
    id: 3,
    name: "Zara",
    surname: "Olimova",
    email: "zara@mail.com",
    rol: "manager",
    efficiency: "faol",
  },
  {
    id: 4,
    name: "Dilshod",
    surname: "Karimov",
    email: "dilshod@mail.com",
    rol: "manager",
    efficiency: "faol",
  },
  {
    id: 5,
    name: "Nodira",
    surname: "Matmurodova",
    email: "nodira@mail.com",
    rol: "manager",
    efficiency: "nofaol",
  },
  {
    id: 6,
    name: "Shoxrux",
    surname: "Rustamov",
    email: "shoxrux@mail.com",
    rol: "manager",
    efficiency: "faol",
  },
  {
    id: 7,
    name: "Kamola",
    surname: "Usmonova",
    email: "kamola@mail.com",
    rol: "manager",
    efficiency: "faol",
  },
  {
    id: 8,
    name: "Javlon",
    surname: "Xolmatov",
    email: "javlon@mail.com",
    rol: "manager",
    efficiency: "nofaol",
  },
  {
    id: 9,
    name: "Diyor",
    surname: "Shamsiev",
    email: "diyor@mail.com",
    rol: "manager",
    efficiency: "faol",
  },
  {
    id: 10,
    name: "Nargiza",
    surname: "Toraeva",
    email: "nargiza@mail.com",
    rol: "manager",
    efficiency: "faol",
  },
  {
    id: 11,
    name: "Bekzod",
    surname: "Jorayev",
    email: "bekzod@mail.com",
    rol: "manager",
    efficiency: "nofaol",
  },
  {
    id: 12,
    name: "Gulbahor",
    surname: "Eshmurodova",
    email: "gulbahor@mail.com",
    rol: "manager",
    efficiency: "faol",
  },
  {
    id: 13,
    name: "Temur",
    surname: "Sobirov",
    email: "temur@mail.com",
    rol: "manager",
    efficiency: "faol",
  },
  {
    id: 14,
    name: "Malika",
    surname: "Sodiqova",
    email: "malika@mail.com",
    rol: "manager",
    efficiency: "nofaol",
  },
  {
    id: 15,
    name: "Rustam",
    surname: "Norboev",
    email: "rustam@mail.com",
    rol: "manager",
    efficiency: "faol",
  },
];
const teachers = [
  {
    id: 1,
    name: "Davron01",
    surname: "Raimjonov",
    email: "raimjonov03@mail.ru",
    fan: "algebra",
    efficiency: "faol",
  },
  {
    id: 2,
    name: "Davron01",
    surname: "Raimjonov",
    email: "raimjonov04@mail.ru",
    fan: "algebra",
    efficiency: "faol",
  },
  {
    id: 3,
    name: "Shahriyor",
    surname: "Boriyev",
    email: "malikovshahriyor929@gmail.com",
    fan: "algebra",
    efficiency: "faol",
  },
  {
    id: 4,
    name: "Davron01",
    surname: "Raimjonov",
    email: "raimjonov05@mail.ru",
    fan: "algebra",
    efficiency: "faol",
  },
  {
    id: 5,
    name: "Shahriyor",
    surname: "Malikov",
    email: "malikovshahriyor9@gmail.com",
    fan: "algebra",
    efficiency: "ishdan bo'shatilgan",
  },
  {
    id: 6,
    name: "Davron",
    surname: "Raimjonov",
    email: "davron_raimjonov46@mail.ru",
    fan: "algebra",
    efficiency: "ishdan bo'shatilgan",
  },
  {
    id: 7,
    name: "Alibek",
    surname: "Tursunboyev",
    email: "alibekticherlar@mail.ru",
    fan: "algebra",
    efficiency: "faol",
  },
  {
    id: 8,
    name: "Alibek",
    surname: "Tursunboyev",
    email: "alibekgithub01@gmail.com",
    fan: "algebra",
    efficiency: "faol",
  },
  {
    id: 9,
    name: "Shahriyor",
    surname: "Malikov",
    email: "malikovs@gmail.com",
    fan: "algebra",
    efficiency: "faol",
  },
  {
    id: 10,
    name: "Alibek",
    surname: "Tursunboyev",
    email: "tursunboyevfrontend@gmail.com",
    fan: "algebra",
    efficiency: "faol",
  },
  {
    id: 11,
    name: "Abdulloh",
    surname: "Zokirov",
    email: "abzakirov@mail.ru",
    fan: "algebra",
    efficiency: "faol",
  },
];

server.post('/api/auth/sign-in', (req, res) => {
  const { email } = req.body;

  const admin = admins.find(a => a.email === email);
  const teacher = teachers.find(t => t.email === email);

  if (admin || teacher) {
    return res.json({
      token: "fake-jwt-token",
      role: admin ? "admin" : "teacher",
      email,
    });
  } else {
    return res.status(401).json({ message: "Email yoki parol noto‘g‘ri" });
  }
});

server.get('/api/staff/edited-admin', (req, res) => {
  res.json(admins);
});

server.get('/api/staff/edited-teacher', (req, res) => {
  res.json(teachers);
});

server.post('/api/staff/create-admin', (req, res) => {
  const yangiAdmin = req.body;
  yangiAdmin.id = admins.length + 1;
  admins.push(yangiAdmin);
  console.log("Yangi admin:", yangiAdmin);
  res.json({ message: "Yangi admin qabul qilindi", data: yangiAdmin });
});

server.post('/api/staff/create-teacher', (req, res) => {
  const yangiTeacher = req.body;
  yangiTeacher.id = teachers.length + 1;
  teachers.push(yangiTeacher);
  console.log("Yangi oqituvchi:", yangiTeacher);
  res.json({ message: "Yangi oqituvchi qabul qilindi", data: yangiTeacher });
});

const PORT = 7070;
server.listen(PORT, () => {
  console.log(`✅ Backend port ${PORT} da ishlayapti`);
});
