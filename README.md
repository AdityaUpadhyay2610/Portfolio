# Portfolio — Vite + React + Tailwind

A one-page portfolio with a side navbar (Home, About, Skills, Projects,
Contact) that becomes a toggleable off-canvas drawer on phones and stays
pinned as a rail on tablets/laptops.

## Run it

```bash
npm install
npm run dev
```

Then open the printed local URL. `npm run build` produces a production
build in `dist/`.

## Structure

```
src/
  App.jsx              layout shell + scroll-spy logic
  index.css            Tailwind directives + a handful of hand-written rules
  components/
    Sidebar.jsx         the side navbar (drawer on phone, rail on tablet/laptop)
    ProfileArt.jsx       placeholder line-art portrait for the Home section
    Home.jsx / About.jsx / Skills.jsx / Projects.jsx / Contact.jsx
    ui.jsx               shared bits: corner marks, section heading, eyebrow label
```

## Things to customize

- **Your photo** — `Home.jsx` currently renders `<ProfileArt />`, a
  placeholder line illustration. Drop a real photo at `public/profile.jpg`
  and swap it in:
  ```jsx
  <img src="/profile.jpg" alt="Portrait" className="w-full h-full object-cover" />
  ```
- **Logo initials** — the "AM" mark in `Sidebar.jsx`.
- **Copy** — name, bio, stats, skills, and project cards live directly in
  their section files; the arrays at the top of `Skills.jsx` and
  `Projects.jsx` are the fastest place to edit.
- **Contact form** — `Contact.jsx` prevents default submit and just flips a
  "sent" state. Wire `handleSubmit` up to Formspree, EmailJS, or your own
  API route.
- **Colors/fonts** — defined once in `tailwind.config.js` (`ink`, `panel`,
  `paper`, `amber`, `teal`, etc.) and `index.html` (Google Fonts links for
  Space Grotesk / Inter / JetBrains Mono).

## Responsive behavior

- **< 768px (phone):** sidebar is hidden by default; a toggle button
  (top-right) opens it as a full-height overlay drawer with a backdrop.
- **768–1023px (tablet):** sidebar is always visible as a compact icon
  rail.
- **≥ 1024px (laptop+):** sidebar is always visible full-width, with
  labels, section numbers, and a scroll-progress rail that fills as you
  scroll through the sections.
