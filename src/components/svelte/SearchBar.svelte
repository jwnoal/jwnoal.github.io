<script>
  export let searchList;

  let inputValue = "";
  let titleArr = [];

  function handleChange(event) {
    const value = event.target.value;
    inputValue = value;

    if (value === "") {
      titleArr = [];
      return;
    }

    const posts = searchList.filter((post) => {
      const searchTermWords = value
        .trim()
        .replace(/\s+/g, " ")
        .toLowerCase()
        .split(" ");
      const title = post.title.trim().replace(/\s+/g, " ").toLowerCase();
      return searchTermWords.every((word) => title.includes(word));
    });
    titleArr = posts;
  }
</script>

<div>
  <input
    bind:value={inputValue}
    type="text"
    placeholder="请输入内容..."
    on:input={handleChange}
  />
  <ul>
    {#each titleArr as item (item.url)}
      <li>
        <a href={item.url}>{item.title}</a>
      </li>
    {/each}
  </ul>
</div>

<style>
  input {
    width: 24rem;
    background: transparent;
    border: 1px solid #3d7387;
    border-radius: 12px;
    padding: 5px 10px;
    color: #3d7387;
    margin-bottom: 20px;
    outline: none;
  }
</style>
