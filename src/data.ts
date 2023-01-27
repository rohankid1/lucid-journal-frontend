import type { CreatePost, Post } from "./models";

export async function createPost(
  post: CreatePost,
  msg: string,
  cb: () => void
) {
  const { authorName, title, description, authKey } = post;

  let res = await fetch("http://localhost:8080/posts/entries", {
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
  const res = await fetch("http://localhost:8080/posts");
  const data: Post[] = await res.json();

  return data;
}
