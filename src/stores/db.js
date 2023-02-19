import Dexie from 'dexie';

export const db = new Dexie('blog');

db.version(1).stores({
  posts: 'id, title, slug, description, content, date'
})
