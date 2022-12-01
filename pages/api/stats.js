import {
  findVideoIdByUser,
  updateStats,
  insertStats,
} from "../../lib/db/hasura";
import { verifyToken } from "../../lib/jwt/jwtVerify";

export default async function stats(req, res) {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(403).send({});
    } else {
      const inputParams = req.method === "POST" ? req.body : req.query;
      const { videoId } = inputParams;
      if (videoId) {
        const userId = await verifyToken(token);
        const findVideo = await findVideoIdByUser(token, userId, videoId);
        const doesStatsExist = findVideo?.length > 0;

        if (req.method === "POST") {
          const { favourited, watched = true } = req.body;
          if (doesStatsExist) {
            // update it
            const response = await updateStats(token, {
              watched,
              userId,
              videoId,
              favourited,
            });
            return res.send({ data: response });
          } else {
            // add it
            console.log({ watched, userId, videoId, favourited });
            const response = await insertStats(token, {
              watched,
              userId,
              videoId,
              favourited,
            });
            return res.send({ data: response });
          }
        } else {
          if (doesStatsExist) {
            return res.send(findVideo);
          } else {
            return res.status(404).send({ user: null, msg: "Video not found" });
          }
        }
      }
    }
  } catch (error) {
    console.error("Error occurred /stats", error);
    return res.status(500).send({ done: false, error: error?.message });
  }
}
