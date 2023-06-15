import React from "react";
import {BsTools} from "react-icons/bs"
import { Link } from "react-router-dom";
import "./home.scss"
import heroImg from "../../assets/inv-img.png"
import { ShowOnLogin,ShowOnLogout } from "../../components/protect/LoginChecker";


const Home=()=>{
    return (
    <div className="home">
        <nav className="container --flex-between">
            <div className="logo">
                <BsTools size={35}/>
            </div>
            <ul className="home-links">
                <ShowOnLogout>
                <li>
                    <Link to="/register">Register</Link>
                </li>
                </ShowOnLogout>

                <ShowOnLogout>
                <li>
                    <button className="--btn --btn-primary" style={{ fontSize: '20px', padding: '10px 20px' }}>
                        <Link to="/login">Login</Link>
                    </button>
                </li>
                </ShowOnLogout>  

                <ShowOnLogin>
                <li>
                    <button className="--btn --btn-primary" style={{ fontSize: '20px', padding: '10px 20px' }}>
                        <Link to="/dashboard">Dashboard</Link>
                    </button>
                    
                </li>
                </ShowOnLogin>
                
            </ul>
        </nav>
        {/* hero section */}

        <section className="container hero">
            <div className="hero-text">
                <h1>
                Inventory & Stock of AJAY POWER TOOLS   
                </h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde illo in quidem et fuga tempora soluta dicta sed quam eligendi necessitatibus iure minima, temporibus, nulla, hic obcaecati ab. Quisquam, voluptatibus?</p>
            </div>
            <div className="hero-image">
                <img src={heroImg} alt="hero" />
            </div>
        </section>
    </div>
    )
}

export default Home;