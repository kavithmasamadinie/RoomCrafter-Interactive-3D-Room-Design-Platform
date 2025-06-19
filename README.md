# 🪑 RoomCrafter

**RoomCrafter** is a responsive, web-based interior design and visualization platform developed as part of the PUSL3122 module (HCI, Computer Graphics, and Visualization) at the University of Plymouth. This tool allows users to design and customize their interior spaces in both 2D and 3D, making room planning interactive, visual, and user-friendly.

![RoomCrafter Banner](https://your-screenshot-link-here.com) <!-- Optional: Add banner or screenshot -->

---

## 🔗 Project Links

- 💻 **Live Demo**: [RoomCrafter Walkthrough Video](https://youtu.be/DfN9FkOeAkE)
- 📁 **GitHub Repository**: [github.com/OWKiriella/Room-Crafter](https://github.com/kavithmasamadinie/RoomCrafter-Interactive-3D-Room-Design-Platform)
- 🎨 **Figma Designs**: [Prototype & UI Mockups](https://www.figma.com/design/pPP0mpemku7xJsGNt1kGXm/HCI?node-id=0-1)
- 📊 **User Feedback Survey**: [Google Forms](https://forms.gle/HupbcaCpYFjVjMW79)

---

## 🛠️ Technologies Used

- **Frontend**: [Next.js](https://nextjs.org/), [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS](https://tailwindcss.com/)
- **3D Rendering**: [Three.js](https://threejs.org/) via `@react-three/fiber` and `@react-three/drei`
- **UI Components**: `shadcn/ui`, [Lucide Icons](https://lucide.dev/)
- **State Management**: Local component state using custom hooks and `zustand`-like patterns
- **Storage**: LocalStorage for persistent designs and preferences

---

## 🎯 Features

- 🔐 **User Authentication** – Secure registration and login
- 🏡 **Dashboard** – Quick access to favorites, templates, and recent projects
- 🎨 **Custom Design Tools** – Create floor plans, add/modify furniture, switch between 2D/3D views
- 📦 **Furniture Catalog** – Browse and customize styles, colors, sizes
- 💡 **Room Lock** – Lock room structure and freely arrange items
- 🧭 **Interactive Controls** – Zoom, rotate, drag-and-drop, and live preview furniture
- 💾 **Save Designs** – Save and revisit your customized rooms

---

## 🧪 Usability Testing

> **Avg. Usability Rating**: 4.62/5  
> **Completion Rate**: 96.7% of tasks completed

**Testing Methods**:
- Task-based walkthroughs
- Think-aloud feedback
- Surveys and interviews

**Participant Profiles**:
- UX interns, interior design students, showroom assistants, and 3D designers

---

## 👩‍💻 Team Members & Roles

| Name                  | Role                          | Responsibilities                              |
|-----------------------|-------------------------------|-----------------------------------------------|
| Khashanie Barua       | Documentation & Presentation  | Report, data gathering, script writing        |
| Osadi Kiriella        | Designer & Developer          | UI/UX design, wireframing, front-end          |
| Wijemuni Silva        | Documentation & Presentation  | Prototyping, report writing                   |
| Athurugirige Amasha   | Developer & Project Lead      | UI/UX design, implementation, team coordination |
| Kavithma Samarawickrama | Usability & Evaluation Lead | Usability testing, development                |
| Godalla Waduge        | Usability & Evaluation Lead   | Prototyping, testing                          |

---

## 🧭 Architecture Overview

- **Next.js SSR** for fast performance and SEO
- **Three.js Renderer** for dynamic, real-time 3D interactions
- **Modular State Stores** (`furniture-store.ts`, `room-store.ts`, etc.)
- **Componentized UI** with reusable design patterns

---

## 🧱 Limitations & Future Work

| Feature                             | Status     | Notes |
|-------------------------------------|------------|-------|
| 3D Scene Rendering                  | 90%        | Some performance issues in complex scenes |
| Auto-Scaling Layout Suggestions     | 80%        | Manual adjustments still required         |
| Room-wide Shading Options          | 70%        | Needs improvement for granular control    |
| Color Customization                | 85%        | Multi-item coloring requires improvement  |
| Design Save & Edit                 | 100%       | Fully implemented                         |

---

## 📜 License

This project is for educational use as part of the BSc (Hons) Software Engineering program at the University of Plymouth.

---

## 📣 Acknowledgements

- Supervisor: **Dr. Taimur Bakhshi**
- University of Plymouth – HCI, Computer Graphics & Visualization Module (PUSL3122)
- Libraries & Tools: [React Three Fiber](https://docs.pmnd.rs/react-three-fiber), [TailwindCSS](https://tailwindcss.com), [Figma](https://figma.com)

---

> 🚀 **RoomCrafter** – Design your dream room, one click at a time.

