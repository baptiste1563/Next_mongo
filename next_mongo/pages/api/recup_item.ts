import clientPromise from "../../lib/mongodb";
import type { NextApiRequest, NextApiResponse } from 'next'


export default async (req: NextApiRequest, res: NextApiResponse) => {

    const client = await clientPromise;
       const db = client.db("posts");

       const get = await db
           .collection("posts")
           .find({})
           .sort({date : -1})
           .toArray();

    res.json(get);
};