import db from '../../utils/db';

export default async (req, res) => {
  try {
    const authors = await db.collection('authors').get();
    const authorsData = authors.docs.map(author => ({
      ...author.data(),
      authorId: author.id
    }));
    res.status(200).json({ authorsData });
  } catch (e) {
    res.status(400).end();
  }
}