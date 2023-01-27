<script lang="ts">
  import Theme from "./components/Theme.svelte";
  import Form from "./components/Form.svelte";
  import Post from "./components/Post.svelte";
</script>

<main class="container">
  <h1>Lucid Dream Journal</h1>
  <Theme />
  <Form />
  <p>
    A <mark>Lucid dream</mark> is a dream in which the person is aware that they
    are dreaming. During this type of dream, they can control it, and do literally
    anything they want - yes, everything. Here, I am going to post my dreams.
  </p>
  <Post />
</main>
