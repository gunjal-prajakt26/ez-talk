import "./Header.css"
export function Header(){
    return (
        <div className="header-container">
        <nav class="navbar navbar-expand-lg ">
    <div class="container-fluid">
    <p class="header-title">i-Gram</p>
      <form class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Search user..." aria-label="Search"/>
      </form>
  </div>
</nav>
        </div>
    )
}