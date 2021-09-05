import { db } from '../../../utils/db';

export default async (req, res) => {
  try {
    const { slug } = req.body;
    const entries = await db.collection('entries').get();
    const entriesData = entries.docs.map(entry => entry.data());

    if (entriesData.some(entry => entry.slug === slug)) {
      res.status(208).json({state: 'There is a post with this title already! | 208 error'});
    } else {
      const { id } = await db.collection('entries').add({
        ...req.body,
        createdAt: new Date().toISOString(),
      });
      res.status(200).json({ id });
    } 
  } catch (e) {
    res.status(400).end();
  }
}