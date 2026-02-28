# 🦸🏻‍♂️ TalentQuery 🧑🏻‍💻

### Bilingual recruiting website + AI chatbot assistant for IT hiring conversations

TalentQuery is a marketing website for an IT recruiting agency focused on hiring in Latin America. It includes a bilingual experience (EN/ES), contact flows, and a chatbot endpoint powered by OpenAI so visitors can ask questions directly from the site.

---

## ✨ Features

| | Feature | What It Does |
|---|---|---|
| 🌍 | Bilingual content | Switches between English and Spanish using local JSON content files. |
| 🤖 | Chat assistant | Sends visitor questions to the backend `/chat` route and returns AI replies in the widget. |
| 📈 | Interactive stats | Renders hiring-market charts with Chart.js for the challenges section. |
| 📱 | Responsive layout | Mobile-friendly landing page sections built with Bootstrap + custom styles. |
| 📬 | Contact-first CTA flow | Email, WhatsApp, LinkedIn, and calendar booking links are built into the page. |

---

<p align="center">
  <img
    src="./client/img/talentquery.webp"
    alt="TalentQuery website screenshot"
    width="520"
    style="border-radius: 12px; box-shadow: 0 10px 28px rgba(16, 24, 40, 0.18); object-position: top;"
  />
</p>

---

## 🛠️ Tech Stack

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=flat-square&logo=bootstrap&logoColor=white)
![Sass](https://img.shields.io/badge/Sass-CC6699?style=flat-square&logo=sass&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=flat-square&logo=openai&logoColor=white)

---

## 🧩 Project Snapshot

- `client/` contains the static site (`index.html`), styles, scripts, language files, and assets.
- `server/server.mjs` serves the site, adds security headers/CORS, and handles the `/chat` endpoint.
- Chat uses the OpenAI API through an environment key (`OPENAI_API_KEY`) and returns plain JSON replies.
- `npm run build-css` compiles `client/css/custom.scss` into `client/css/custom.css`.

---

## 🚀 Live Demo

<p align="center">
  <a href="https://talentquery.onrender.com/" target="_blank" rel="noopener noreferrer">
    <img src="https://img.shields.io/badge/Live%20Demo-talentquery.onrender.com-22c55e?style=for-the-badge&logo=render&logoColor=white" alt="Live demo on Render" />
  </a>
</p>

---

## 💻 Run it locally

```bash
git clone https://github.com/jorguzman100/talentquery.git
cd talentquery
npm install
cp .env_example .env
npm run build-css
npm start
```

Local URL:

- App (site + API): `http://localhost:3000`

<details>
<summary>🔑 Required environment variables</summary>

```env
# .env
OPENAI_API_KEY=
PORT=3000

# Optional
OPENAI_MODEL=gpt-4o-mini
ALLOWED_ORIGINS=http://localhost:3000,https://talentquery.io,https://www.talentquery.io,https://talentquery.onrender.com
```
</details>

---

## 🤝 Contributors

- **Jorge Guzman** · [@jorguzman100](https://github.com/jorguzman100)
