import React, { useState } from "react";
import "./GitHubSearch.css";
import axios from "axios";
import { FaGithub, FaMapMarkerAlt } from "react-icons/fa";
import { PiBuildingsFill } from "react-icons/pi";
import { FaXTwitter } from "react-icons/fa6";
const GitHubSearch = () => {
  const [username, setUsername] = useState("");
  const [profile, setProfile] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://api.github.com/users/${username}`
      );
      setProfile(response.data);
      setError(null);
    } catch (error) {
      setProfile(null);
      setError("User not found");
    }
  };
  return (
    <div className="main-container">
      <h1 className="main-heading">GitHub Profile Search</h1>

      <form action="" onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          placeholder="Enter the username"
          value={username}
          className="search-input"
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit" className="search-btn">
          Search
        </button>
      </form>

      {error && <p className="error">{error}</p>}
      
      {profile && (
        <div className='profile-container'>
            <div className='profile-content'>
                <div className='profile-img'>
                    <img src={profile.avatar_url} alt='Avatar' className='profile-avatar'></img>
                </div>
                <div className='profile-details'>

                    <div className='profile-des'>
                        <h2 className='profile-name'>{profile.name}</h2>
                        <p className='profile-created'>Joined: {new Date(profile.created_at).toLocaleDateString()}</p>
                    </div>

                    <a href={profile.html_url} target='_blank' rel="noreferrer" className='profile-username'>@{profile.login}</a>
                    <p className='profile-bio'>{profile.bio}</p>

                    <div className='profile-stats'>
                        <p className='profile-repos'>Repositories<br/><span className='stats'>{profile.public_repos}</span></p>
                        <p className='profile-followers'>Followers<br/><span className='stats'>{profile.followers}</span></p>
                        <p className='profile-following'>Following<br/><span className='stats'>{profile.following}</span></p>
                    </div>

                    <div className='profile-info'>
                        <p className='profile-location'><FaMapMarkerAlt/> {profile.location}</p>
                       
                    </div>

                    <div className='profile-links'>
                        <a href={`https://twitter.com/${profile.twitter_username}`} target='_blank' rel="noreferrer" className='twitter-link'><FaXTwitter/>{profile.twitter_username}</a>
                        <a href={profile.html_url} target='_blank' rel="noreferrer" className='profile-url'><FaGithub/>View Profile</a>
                    </div>
                </div>
            </div>
        </div>
      )}
      


    </div>
  );
};

export default GitHubSearch;
