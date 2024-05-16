<script>
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { collection, addDoc } from 'firebase/firestore';
    import { db, auth } from '$lib/firebase';
    import Header from '../../components/Header.svelte';
  
    let title = '';
    let postText = '';
  
    const postsCollectionRef = collection(db, "posts");
  
    onMount(() => {
      if (!auth.currentUser) {
        goto('/home');
      }
    });
  
    async function createPost() {
      await addDoc(postsCollectionRef, {
        title,
        postText,
        author: { name: auth.currentUser.email, id: auth.currentUser.uid },
      });
      goto('/home');
    }
  </script>
  
  <Header />
  
  <div class="createPostPage">
    <div class="cpContainer">
      <h1>Create A Post</h1>
      <div class="inputGp">
        <label>Title:</label>
        <input type="text" bind:value={title} placeholder="Title..." />
      </div>
      <div class="inputGp">
        <label>Post:</label>
        <textarea bind:value={postText} placeholder="Post..."></textarea>
      </div>
      <button on:click={createPost}>Submit Post</button>
    </div>
  </div>