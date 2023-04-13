import { writable } from 'svelte/store';
import { goto } from '$app/navigation';

export const isCollapsed = writable(false);

export const isSpotlightOpen = writable(false)
export const isSharerOpen = writable(false)

export const storeActions = writable([
  {
    title: 'Home',
    subTitle: 'Go to the home page',
    onRun: ({ action, storeProps, storeMethods }) => {
      goto('/');
    },
    shortcut: 'g h'
  },
  {
    title: 'GitHub',
    subTitle: 'Go to my Github profile in a new tab',
    onRun: ({ action, storeProps, storeMethods }) => {
      window.open('https://github.com/janoamaral');
    },
    shortcut: 'g g'
  },
  {
    title: 'LinkedIn',
    subTitle: 'Go to my LinkedIn profile in a new tab',
    onRun: ({ action, storeProps, storeMethods }) => {
      window.open('https://www.linkedin.com/in/janoamaral');
    },
    shortcut: 'g l'
  },
  {
    title: 'Blog',
    subTitle: 'Go to the blog',
    onRun: ({ action, storeProps, storeMethods }) => {
      goto('/blog?page=1');
    },
    shortcut: 'g b'
  }
])
