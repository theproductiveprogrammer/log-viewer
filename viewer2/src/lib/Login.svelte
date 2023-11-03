<script>
  import { slide } from 'svelte/transition';
  import { login } from '../data.js';
  import { auth } from '../stores.js';

  export let serverURL;

  let error;
  let disabled;

  let name;
  let nameE;
  let pass;
  let passE;
  let timer;

  function showError(err) {
    if(err.message) error = err.message
    else error = err;
    disabled = true;
    clearTimeout(timer);
    timer = setTimeout(() => {
      disabled = false;
      timer = null;
      setTimeout(() => {
        if(pass) nameE.focus();
        else if(name) passE.focus();
        else nameE.focus()
      });
    }, 2000);
    setTimeout(() => error = "", 10000);
  }

  async function onSubmit() {
    disabled = true;
    try {
      const resp = await login(serverURL, name, pass);
      if(resp && resp.error) showError(resp.error);
      else if(resp && resp.token) auth.set(resp.token);
      else showError("Login failed");
    } catch(e) {
      showError(e);
    }
  }

  function enterH(e) {
    if(e.key === 'Enter') onSubmit();
  }
</script>

<div class="logs-login-overlay">
  <div class="logs-login-modal">
    <h1>Login</h1>
    {#if error}
      <div class="log-login-error" transition:slide>{error}</div>
    {/if}
    <label for="name">Username: </label>
    <input bind:value={name} bind:this={nameE} autofocus {disabled} type="text">
    <label for="name">Password: </label>
    <input bind:value={pass} bind:this={passE} {disabled} type="password">
    <button {disabled} on:click|preventDefault={onSubmit} on:keydown={enterH}>Submit</button>
  </div>
</div>

<style>
  .logs-login-overlay {
    z-index: 100;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(240,240,250,0.6);

    display: flex;
    justify-content: center;
    align-items: center;
  }
  .logs-login-modal {
    -webkit-animation-name: animIn;
    animation-name: animIn;
    -webkit-animation-duration: 1500ms;
    animation-duration: 1500ms;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
  }
  @keyframes animIn {
    0% {
      -webkit-transform: translate3d(0, -10%, 0) scale(0.1);
      transform: translate3d(0, -10%, 0) scale(0.1);
      visibility: visible;
    }
    20% {
      -webkit-transform: translate3d(0, 10%, 0);
      transform: translate3d(0, 10%, 0);
    }
    100% {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
    }
  }

  .logs-login-modal {
    width: 200px;
    box-shadow: 0 0 1px #999;
    border-radius: 8px;
    background: white;
    padding: 24px;
    padding-top: 12px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: normal;
  }

  label {
    margin-top: 0.5em;
  }
  input {
    padding: 4px;
  }
  button {
    padding: 4px;
    margin-top: 2em;
  }

  .log-login-error {
    width: 100%;
    color: #f00;
    text-align: center;

  }
</style>
