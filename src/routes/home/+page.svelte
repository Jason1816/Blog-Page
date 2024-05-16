<script>
    import { onDestroy, onMount } from 'svelte';
    import { collection, query, where, onSnapshot, doc, deleteDoc, updateDoc } from 'firebase/firestore';
    import { db, auth } from '$lib/firebase';
    import { onAuthStateChanged } from 'firebase/auth';
    import { writable } from 'svelte/store';

    let postLists = [];
    let unsubscribe = () => {};
    let editingPost = writable(null);
    let showModal = writable(false);
    let currentUser = null;

    onMount(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, user => {
        currentUser=user;
      if (user) {
        const postsCollectionRef = collection(db, "posts");
        const q = query(postsCollectionRef); // Fetch all posts
        unsubscribe = onSnapshot(q, (snapshot) => {
          postLists = snapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id,
            isAuthor: user.uid === doc.data().author.id // Add isAuthor flag
          }));
        });
      } else {
        goto('/login');
      }
    });

      return () => {
        unsubscribe(); 
        unsubscribeAuth(); // Cleanup auth listener
      };
    });

    async function deletePost(id) {
      const postDoc = doc(db, "posts", id);
      await deleteDoc(postDoc);
    }

    function openEditModal(post) {
      editingPost.set(post);
      showModal.set(true);
    }

    async function saveChanges(updatedPost) {
      const postDocRef = doc(db, "posts", updatedPost.id);
      await updateDoc(postDocRef, { title: updatedPost.title, postText: updatedPost.postText });
      showModal.set(false);
    }
    function canModify(postAuthorId) {
    return currentUser && postAuthorId === currentUser.uid;
  }
</script>

<div class="homePage">
  {#each postLists as post}
    <div class="post">
      <div class="postHeader">
        <div class="title"><h1>{post.title}</h1></div>
        <div class="editDeletePost">
            {#if canModify(post.author.id)}
            <button on:click={() => openEditModal(post)}>✏️</button>
            <button on:click={() => deletePost(post.id)}>🗑️</button>
      {/if}
          
        </div>
      </div>
      <div class="postTextContainer">{post.postText}</div>
      <h3>@{post.author.name}</h3>
    </div>
  {/each}
</div>

{#if $showModal}
  <div class="modal">
    <div class="modal-content">
      <h1>Edit Post</h1>
      <input type="text" bind:value={$editingPost.title} />
      <textarea bind:value={$editingPost.postText}></textarea>
      <button on:click={() => saveChanges($editingPost)}>Save Changes</button>
      <button on:click={() => showModal.set(false)}>Cancel</button>
    </div>
  </div>
{/if}

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
