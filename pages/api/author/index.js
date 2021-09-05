import db from "../../../utils/db";

export default async (req, res) => {
  try {
    const { authorName } = req.body;
    const authors = await db.collection('authors').get();
    const authorsData = authors.docs.map(author => author.data());

    if (authorsData.some(author => author.name === authorName)) {
      res.status(208).json({state: 'There is an author with this name already! | 208 error'});
    } else {
      const { id } = await db.collection('authors').add({
        ...req.body,
        createdAt: new Date().toISOString(),
      });
      res.status(200).json({ authorName });
    } 
  } catch (e) {
    res.status(400).end();
  }
}