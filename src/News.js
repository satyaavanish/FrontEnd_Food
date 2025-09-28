import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./News.css";

function News() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get("https://backend-food-i0h7.onrender.com/api/news");
        setArticles(res.data.articles);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="news-container">
      <button onClick={() => navigate("/")} className="back-button">🔙 Home</button>
      <h2 className="news-header">📰 Food News</h2>

      {loading ? (
        <div className="loading-spinner"></div>
      ) : (
        <div className="articles-grid">
          {articles.map((article, index) => (
            <article key={index} className="news-card">
              <div className="article-image-container">
                <img 
                  src={article.image || "https://via.placeholder.com/300x200?text=Food+News"} 
                  alt={article.title} 
                  className="article-image"
                />
              </div>
              <div className="article-content">
                <h3 className="article-title">
                  <a href={article.url} target="_blank" rel="noopener noreferrer">
                    {article.title}
                  </a>
                </h3>
                <p className="article-date">
                  <i>{new Date(article.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</i>
                </p>
                <p className="article-description">{article.description}</p>
                <a href={article.url} target="_blank" rel="noopener noreferrer" className="read-more">
                  Read More →
                </a>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

export default News;
