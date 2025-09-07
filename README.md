# Edgar Demeude Portfolio

This project is a **personal portfolio website** showcasing my work in research, photography, music, and video. It is built using **Next.js**, **TypeScript**, and **Tailwind CSS**, with smooth animations powered by **Framer Motion** and **Lenis** for smooth scrolling.

## Features

- **Research Section** – Displays my projects, papers, or articles with a clean layout.
- **Photography Section** – Shows photo collections, organized by year or category, with a responsive grid, hover effects, and a lightbox for viewing full images.
- **Videos Section** – Presents video content categorized by instruments or types (e.g., Drums, Piano), with thumbnails linking directly to videos.
- **Music Section** – A dedicated section for music projects.
- **About Section** – Includes biography, description of work, and links to social media (YouTube, Instagram).
- **Smooth Animations** – Cascade animation for galleries, smooth scroll interactions across the site, and animated dropdowns for language and projects.
- **Responsive Design** – Fully responsive, optimized for mobile, tablet, and desktop, with a custom breakpoint for the mobile menu (≤1050px).
- **Dark Mode Support** – Optional dark theme toggle with seamless vertical alignment for icons and text.
- **Language Selector** – Dropdown menu for switching between English, French, and Japanese.
- **Social Links Section** – Added at the end of About page, links to YouTube and Instagram, with hover animations and scaling effects.
- **Mobile-Friendly Navbar** – Fully functional burger menu with project submenu, dynamic opening/closing animations.


## Tech Stack

- **Frontend:** Next.js 13 (App Router)  
- **Styling:** Tailwind CSS, custom responsive layouts  
- **Animations:** Framer Motion, Lenis smooth scroll  
- **Routing:** Dynamic routing for galleries and video pages  
- **Lightbox:** Custom lightbox for photo galleries  

## Project Structure

```
public/
├── photos/
│   ├── 2023_japan23/
│   ├── 2024_japan24/
│   ├── 2024_turino/
│   └── ongoing_lyon/
├── thumbnails/
├── collections.json
scripts/
├── generateData.js
src/
└── app/
    ├── about/
    ├── components/
    ├── hooks/
    ├── legal-notice/
    ├── music/
    ├── photography/
    │   └── gallery/
    ├── research/
    ├── utils/
    ├── videos/
    ├── globals.css
    ├── layout.tsx
    └── page.tsx
```

## Live Site

Check the live site here: [https://edgar-demeude.vercel.app/](https://edgar-demeude.vercel.app/)

## License

This project is **public**, for sharing and reference on my CV. The project is licensed under the MIT License – see the [LICENSE](./LICENSE.md) file for details.
