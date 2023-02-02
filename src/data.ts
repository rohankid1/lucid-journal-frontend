import type { CreatePost, Post } from "./models";
import url from "./config.json";

const env = process.env.NODE_ENV;

if (env === "production") {
  console.log("running production version");
}

const postUrl = env === 'production' ? url.production.urlPost : url.development.urlPost;
const getUrl = env === 'production' ? url.production.urlGet : url.development.urlGet;

export async function createPost(
  post: CreatePost,
  msg: string,
  cb: () => void
) {
  const { authorName, title, description, authKey } = post;

  let res = await fetch(postUrl, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      authorName,
      title,
      description,
      authKey,
    }),
  });

  if (res.status === 401) msg = await res.text();
  if (res.status === 200) cb();
}

export async function getPosts(): Promise<Post[]> {
  const res = await fetch(getUrl);
  const data: Post[] = await res.json();

  return data;
}
