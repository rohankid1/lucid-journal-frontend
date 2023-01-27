<script lang="ts">
  import type { Post } from "../models";
  import { getPosts } from "../data";
  import editPost from "../editPost";

  let promise = getPosts();
  let filterText: string = "";
  let res: number;

  function setGet<T, R extends T>(variable: T, other: R) {
    variable = other;
    return variable;
  }
</script>

{#await promise}
  Loading...
{:then data}
  {#if filterText.trim() === ""}
    <sup>{data.length} {data.length === 1 ? "result" : "results"}</sup>
  {:else}
    <sup
      >{setGet(
        res,
        data.filter((item) => item.title.toLowerCase().includes(filterText))
          .length
      )}
      {res === 1 ? "result" : "results"}</sup
    >
  {/if}
  <div class="grid">
    <input type="text" bind:value={filterText} />
  </div>
  <hr />
  <article style="white-space: break-spaces;">
    {#if filterText.trim() !== ""}
      {#each data.filter((item) => item.title
          .toLowerCase()
          .includes(filterText.toLowerCase())) as post (post.id)}
        <details>
          <summary>{post.title} - <i>by {post.author}</i></summary>
          <p>{post.description}</p>
          <b>Posted on {post.date.toString()}</b>
        </details>
      {:else}
        <h1>No entries</h1>
      {/each}
    {:else}
      {#each data.reverse() as post (post.id)}
        <a href="#" on:click|preventDefault={() => editPost(post.id)}>Edit</a>
        <details>
          <summary>{post.title} - <i>by {post.author}</i></summary>
          <p>{post.description}</p>
          <b>Posted on {post.date.toString()}</b>
        </details>
      {/each}
    {/if}
  </article>
{:catch err}
  <h1>Unable to fetch data at this moment.</h1>
{/await}
