<script lang="ts">
  import Modal from "./Modal.svelte";
  import { createPost } from "../data";
  import { onMount } from "svelte";

  const authorStorage = localStorage.getItem("author");
  let titleInput: string;
  let descInput: string;
  let authKey: string;
  let errVal: string;
  let authorName: string = authorStorage || "";
  let modal: Modal;
  let modalToggle: () => void;

  function toggleModal() {
    modalToggle();
  }

  async function handleSubmit() {
    await createPost(
      {
        authKey: authKey,
        authorName: authorName,
        description: descInput,
        title: titleInput,
      },
      errVal,
      () => {
        if (!authorStorage) localStorage.setItem("author", authorName);
        alert("Posted!");
        titleInput = "";
        descInput = "";
        location.reload();
      }
    );
  }

  onMount(() => {
    modalToggle = function () {
      modal.toggleModal();
    };
  });
</script>

<a href="#s" on:click|preventDefault={toggleModal} role="button">Post</a>
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-missing-attribute -->
<a on:click|preventDefault role="button">Edit</a>
<hr />
<Modal title="New Post" bind:this={modal}>
  <article>
    <form on:submit|preventDefault={handleSubmit}>
      {#if authorStorage}
        <label for="author">
          Name
          <input
            type="text"
            placeholder="Name"
            value={authorStorage}
            disabled
          />
        </label>
      {:else}
        <label for="author">
          Name
          <input
            type="text"
            placeholder="Name"
            bind:value={authorName}
            min="3"
            max="20"
          />
        </label>
      {/if}

      <label for="title">
        Title
        <input
          type="text"
          placeholder="Title"
          bind:value={titleInput}
          min="5"
          max="40"
        />
      </label>

      <label for="Description">
        Description
        <textarea
          style="resize: vertical;"
          bind:value={descInput}
          minlength="3"
        />
      </label>

      <label for="key">
        Authorisation Key
        <input type="password" bind:value={authKey} />
      </label>
      <p style="color: crimson;">{errVal || ""}</p>
      <button type="submit">Create Post</button>
    </form>
  </article>
</Modal>
