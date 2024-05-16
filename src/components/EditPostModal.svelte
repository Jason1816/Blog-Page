<script>
    import { writable } from 'svelte/store';
    export let post = writable({ title: '', postText: '', id: null });
    export let show = writable(false);
    export let updatePostList;
  
    function close() {
      show.set(false);
    }
  
    async function saveChanges() {
      // Assume `post` is a writable store containing the post data
      const postData = $post;
      // Here you would typically call Firebase to update the post
      updatePostList(postData.id, postData.title, postData.postText);
      close();
    }
  </script>
  
  <style>
    .modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .modal-content {
      background: white;
      padding: 20px;
      border-radius: 8px;
      max-width: 500px;
      width: 90%;
    }
  </style>
  
  <div class="modal" bind:class={{hidden: !$show}}>
    <div class="modal-content">
      <h1>Edit Post</h1>
      <label for="title">Title:</label>
      <input type="text" id="title" bind:value={$post.title} />
      <label for="postText">Post:</label>
      <textarea id="postText" bind:value={$post.postText}></textarea>
      <button on:click={saveChanges}>Save Changes</button>
      <button on:click={close}>Cancel</button>
    </div>
  </div>