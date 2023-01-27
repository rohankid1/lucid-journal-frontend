<script lang="ts">
  const html = document.querySelector("html");
  let lightTheme = false;

  html.setAttribute("data-theme", localStorage.getItem("data-theme") || "dark");
  if (localStorage.getItem("data-theme") === "light") lightTheme = true;
  else lightTheme = false;

  function theme() {
    lightTheme = !lightTheme;

    if (lightTheme) {
      localStorage.setItem("data-theme", "light");
      html.setAttribute("data-theme", "light");
    } else {
      localStorage.setItem("data-theme", "dark");
      html.setAttribute("data-theme", "dark");
    }
  }
</script>

<a href="#t" on:click|preventDefault={theme} role="button">Theme</a>