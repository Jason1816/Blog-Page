<script>
    import { authHandlers } from "../store/authStore";
  </script>
  
  <nav>
    <!-- Title -->
    <a href="/" class="title">
      <b>JasonBlog</b>
    </a>
  
    <!-- Navigation -->
    <ul class="links">
      <li>
        <a href="/createpost">Create Post</a>
      </li>
      <li>
        <a href="#" on:click|preventDefault={authHandlers.logout}>Logout</a>
      </li>
    </ul>
  </nav>
  
  <style>
    nav {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 20px;
      background: linear-gradient(to right, #37375a, #5656ce);
      color: white;
    }
  
    .title {
      font-size: 1.5em;
      color: #FFFFFF;
    }
  
    .links {
      list-style: none;
      display: flex;
      gap: 16px;
    }
  
    .links li {
      padding: 10px;
    }
  
    a {
      color: white;
      text-decoration: none;
      transition: color 0.3s ease;
    }
  
    a:hover {
      color: #CCCCCC;
    }
  
    @media (min-width: 768px) {
      .links {
        gap: 24px;
      }
    }
  </style>