import clientPromise from "../../lib/mongodb";
import type { NextApiRequest, NextApiResponse } from 'next';


export default async (req: NextApiRequest, res: NextApiResponse) => {


    const client = await clientPromise;
    const db = client.db("posts");
    const { title, content } = req.body;

    const post = await db.collection("posts").insertOne({
      date : new Date(),
      title,
      content,
    });

    res.json(post);
};