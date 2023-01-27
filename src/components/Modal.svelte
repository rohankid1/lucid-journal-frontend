<script lang="ts">
  export let title: string;
  let element: HTMLDialogElement;

  export function closeModal() {
    element.removeAttribute("open");
  }

  export function toggleModal() {
    element.toggleAttribute("open");
  }
</script>

<dialog bind:this={element}>
  <article>
    <header>
      <!-- svelte-ignore a11y-missing-content -->
      <a href="#close" aria-label="Close" class="close" on:click={closeModal} />
      <h1>{title}</h1>
    </header>
    <slot />
  </article>
</dialog>
