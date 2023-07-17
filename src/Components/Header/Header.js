import { useState } from "react";
import "./Header.css"
export function Header(){
  const [input, setInput] = useState("");

  const handleChange=(value)=>{
    setInput(value)
  };
    return (
        <div className="header-container">
        <nav class="navbar navbar-expand-lg ">
    <div class="container-fluid">
    <p class="header-title">i-Gram</p>
      {/* <form class="d-flex" role="search"> */}
      <div className="search-container">
        <input class="form-control me-2 " type="search" placeholder="Search user..." aria-label="Search" onChange={(e)=>handleChange(e.target.value)}/>
        <div class="search-result" style={{display:input.length ?"block":"none" }}>
          <ul>
            <li>this is search</li>
            <li>this is search</li>
            <li>this is search</li>
            <li>this is search</li>
          </ul>
        </div>
        </div>
      {/* </form> */}
  </div>
</nav>
</div>
    )
}