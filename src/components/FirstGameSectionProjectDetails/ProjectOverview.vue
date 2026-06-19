<template>
  <ProjectDetailsBase :config="config" />
</template>

<script setup>
  import { computed } from 'vue';
  import { useTimePortalStore } from '@/stores/portals';
  import ProjectDetailsBase from './ProjectDetailsBase.vue';

  const portalStore = useTimePortalStore();

  const openExternal = url => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const projects = {
    projectOne: {
      title: 'Iterate',
      number: '01',
      type: 'Self Improvement',
      accent: '#38f9b5',
      accentRgb: '56, 249, 181',
      logo: 'iterateLogo.png',
      logoAlt: 'Iterate logo',
      logoClass: 'projectDetails__logo--iterate',
      description:
        'A focused React app for improving your life with iteration, built with a clean feature structure, Supabase, and polished product-style UI.',
      buttons: [
        {
          label: 'View Project',
          icon: 'fa-solid fa-arrow-up-right-from-square',
          onClick: () => openExternal('https://iterate-jade.vercel.app/'),
        },
        {
          label: 'View Code',
          icon: 'fa-brands fa-github',
          onClick: () => openExternal('https://github.com/Juka99/.iterate'),
        },
      ],
      technologies: [
        {
          name: 'React',
          icon: 'react.webp',
          iconAlt: 'React logo',
          note: 'Interface framework',
        },
        {
          name: 'TypeScript',
          icon: 'typescript.svg',
          iconAlt: 'TypeScript logo',
          note: 'Typed application logic',
        },
        {
          name: 'Supabase',
          icon: 'supabase.svg',
          iconAlt: 'Supabase logo',
          note: 'Data and authentication',
        },
      ],
      highlights: [
        {
          title: 'Iterative growth',
          icon: 'fa-solid fa-arrow-trend-up',
          text: 'Tools designed around small, repeatable improvements.',
        },
        {
          title: 'Clean structure',
          icon: 'fa-solid fa-sitemap',
          text: 'Feature-focused architecture that stays easy to extend.',
        },
        {
          title: 'Product polish',
          icon: 'fa-solid fa-wand-magic-sparkles',
          text: 'Thoughtful interaction details across the experience.',
        },
      ],
    },
    projectTwo: {
      title: 'Orbit',
      number: '02',
      type: 'Personal Dashboard',
      accent: '#ff8a72',
      accentRgb: '255, 138, 114',
      logo: 'orbitLogo.png',
      logoAlt: 'Orbit logo',
      logoClass: 'projectDetails__logo--orbit',
      description:
        'A Vue 3 and TypeScript app for keeping important personal things in check, starting with notes, water, and calorie tracking.',
      buttons: [
        {
          label: 'View Project',
          icon: 'fa-solid fa-arrow-up-right-from-square',
          onClick: () => openExternal('https://orbit-ten-murex.vercel.app/'),
        },
        {
          label: 'View Code',
          icon: 'fa-brands fa-github',
          onClick: () => openExternal('https://github.com/Juka99/Orbit'),
        },
      ],
      technologies: [
        {
          name: 'Vue 3',
          icon: 'vue.webp',
          iconAlt: 'Vue logo',
          note: 'Reactive interface',
        },
        {
          name: 'TypeScript',
          icon: 'typescript.svg',
          iconAlt: 'TypeScript logo',
          note: 'Typed application logic',
        },
        {
          name: 'Supabase',
          icon: 'supabase.svg',
          iconAlt: 'Supabase logo',
          note: 'Data and authentication',
        },
      ],
      highlights: [
        {
          title: 'Notes',
          icon: 'fa-solid fa-note-sticky',
          text: 'Capture and organize the things worth remembering.',
        },
        {
          title: 'Water tracking',
          icon: 'fa-solid fa-droplet',
          text: 'Build a visible and reliable hydration habit.',
        },
        {
          title: 'Calorie tracking',
          icon: 'fa-solid fa-utensils',
          text: 'Keep daily nutrition goals close and easy to review.',
        },
      ],
    },
  };

  const config = computed(
    () => projects[portalStore.activePortal] || projects.projectOne
  );
</script>
