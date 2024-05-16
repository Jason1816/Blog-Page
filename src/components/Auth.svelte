<script>
    import { authHandlers, authStore } from '../store/authStore';
    import { onMount } from 'svelte';
    import { get } from 'svelte/store';
    import { goto } from '$app/navigation';

    let register = false;
    let email = '';
    let password = '';
    let confirmPassword = '';

    onMount(() => {
        const unsubscribe = authStore.subscribe($authStore => {
            if ($authStore.currentUser) {
                goto('/home');
            }
        });

        return unsubscribe; // Clean up the subscription
    });

    async function handleSubmit() {
        if (!email || !password || (register && !confirmPassword)) {
            return;
        }

        if (register && password === confirmPassword) {
            try {
                await authHandlers.signup(email, password);
            } catch (err) {
                console.log(err);
            }
        } else {
            try {
                await authHandlers.login(email, password);
            } catch (err) {
                console.log(err);
            }
        }
    }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->


<div class="container">
    <h1>{register ? 'Register' : 'Log in'}</h1>
    <form on:submit|preventDefault={handleSubmit}>
        <div class="input-group">
            <input bind:value={email} type="email" placeholder="Email" required />
        </div>
        <div class="input-group">
            <input bind:value={password} type="password" placeholder="Password" required />
        </div>
        {#if register}
            <div class="input-group">
                <input bind:value={confirmPassword} type="password" placeholder="Confirm Password" required />
            </div>
        {/if}
        <button class="submit-button" type="submit">Submit</button>
    </form>
    <div class="link" on:click={() => { register = !register; }}>
        {#if !register}
            Don't have an account? <span>Sign Up</span>
        {:else}
            Already have an account? <span>Log in</span>
        {/if}
    </div>
    {#if !register}
        <div class="link" on:click={() => { authHandlers.resetPassword(email); }}>
            Forgot Password?
        </div>
    {/if}
</div>
<style>
      .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: auto;
        padding: 20px;
        max-width: 400px;
        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        border-radius: 8px;
        background: white;
    }

    h1 {
        margin-bottom: 20px;
    }

    .input-group {
        margin-bottom: 10px;
    }

    input {
        width: 100%;
        padding: 10px;
        border: 2px solid #ccc;
        border-radius: 4px;
        font-size: 16px;
        box-sizing: border-box; /* Ensures padding doesn't affect width */
    }

    .submit-button {
        padding: 10px 20px;
        background-color: #0056b3;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.2s;
    }

    .submit-button:hover {
        background-color: #003580;
    }

    .link {
        margin-top: 15px;
        cursor: pointer;
        color: #0056b3;
    }

    .link span {
        text-decoration: underline;
    }
</style>