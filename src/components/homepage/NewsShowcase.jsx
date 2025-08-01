import React, { useState, useRef, useEffect } from 'react';
import Translate, { translate } from '@docusaurus/Translate';

const NewsShowcase = () => {
  const newsData = [
    {
      title: "报名启动 | 2025 MoonBit全球编程创新挑战赛官宣",
      description: "这是一项面向全球开发者的专业挑战赛，旨在推动计算机软件开发相关专业建设，服务国家在基础软件和人工智能云原生领域的人才战略。首届大赛吸引了超过1888支队伍参赛，覆盖了清华大学、剑桥大学、中山大学、香港科技大学（广州）等多所国内外知名高校。",
      img: "img/newsshowcase/MoonBit.jpg",
      link: "https://mp.weixin.qq.com/s/2r4cKs5D7JJDqgH4lhdH_A"
    },
    {
      title: "RISC-V校园行｜PLCT实验室走进香港城市大学，开启RISC-V开源人才培养新篇章",
      description: "2025年7月19日，'RISC-V 校园行'活动在香港城市大学成功举办，吸引了近百名香港高校学生到场聆听。PLCT实验室深度参与此次活动，通过技术分享、互动交流与成果展示，向香港高校学子全面呈现实验室在 RISC-V 软件生态攻坚、人才培养与产业协同中的实践与思考。",
      img: "img/newsshowcase/hongkongcity.jpeg",
      link: "https://mp.weixin.qq.com/s/-PGCCl1k919KtcU8Para1w"
    },
    {
      title: "OpenCloudOS入驻RuyiSDK开发者社区，双方达成深度合作",
      description: "OpenCloudOS 正式入驻 RuyiSDK 开发者社区，标志着两大开源力量在 RISC-V 领域深度协同的开端。双方将围绕操作系统 RISC-V 架构技术和生态建设、高性能计算及开发者生态建设方面，开展全方位协作。",
      img: "img/newsshowcase/opencloud.png",
      link: "https://mp.weixin.qq.com/s/R1y8tVzddT7_im2FUhfJVw"
    },
  ];

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const mainRef = useRef(null);

  /**
   * Truncates text to a specified maximum length, avoiding word breaks.
   * It applies different length limits for Chinese Hanzi and other scripts.
   * @param {string} text The text to truncate.
   * @param {number} charLimit The character limit for non-Hanzi text.
   * @param {number} hanziLimit The character limit for Hanzi text.
   * @returns {string} The truncated text with an ellipsis, or the original text.
   */
  const truncateText = (text, charLimit, hanziLimit) => {
    const hasHanzi = /[\u4e00-\u9fa5]/.test(text);
    const limit = hasHanzi ? hanziLimit : charLimit;

    if (text.length <= limit) {
      return text;
    }

    let truncated = text.substring(0, limit);

    if (!hasHanzi) {
      // Avoid breaking a word in the middle for non-Hanzi text
      const lastSpaceIndex = truncated.lastIndexOf(' ');
      if (lastSpaceIndex !== -1) {
        truncated = truncated.substring(0, lastSpaceIndex);
      }
    }
    
    return truncated + '...';
  };

  const handleNewsClick = (idx) => {
    setSelectedIndex(idx);
  };

  const handleCardClick = (link) => {
    window.open(link, '_blank');
  };

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768); // 768px breakpoint
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!isMobile && mainRef.current) {
      const wrapper = mainRef.current.querySelector('.cards-wrapper');
      wrapper.style.transition = 'transform 0.5s ease';
      wrapper.style.transform = `translateY(-${selectedIndex * 100}%)`;
    }
  }, [selectedIndex, isMobile]);

  return (
    <div className="newsshowcase-container">
      <style>{`
        .newsshowcase-container {
          display: flex;
          overflow-x: auto;
          width: 100%;
          height: calc(37.5rem + 2rem); /* 600px + 32px */
          gap: 1rem;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
          margin: 0 auto; /* Added for centering */
          padding: 0.5rem 2rem 1.5rem; /* 8px 32px 24px */
          background-color: #f5f5f7;
        }

        /* New media query for very wide screens */
        @media (min-width: 90rem) { /* 1440px or adjust as needed */
          .newsshowcase-container {
            max-width: 90rem; /* For example, 1440px */
            border-radius: 0.625rem; /* 10px - Optional: to make it look like a contained block */
            box-shadow: 0 0.5rem 1.875rem rgba(255, 255, 255, 0); /* Optional: subtle shadow */
          }
        }

        .newsshowcase-sidebar {
          width: 20rem; /* 320px */
          height: 37.5rem; /* 600px */
          overflow-y: auto;
          scrollbar-width: none;
          -ms-overflow-style: none;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          padding: 0rem 1rem 1rem 0;
        }
        .newsshowcase-sidebar::-webkit-scrollbar {
          display: none;
        }
        .newsshowcase-title-item {
          padding: 1rem 1.5rem;
          background: white;
          border-radius: 0.625rem; /* 10px */
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          font-size: 1rem;
          font-weight: 500;
          color: #1d1d1f;
          border: 0.0625rem solid rgba(230, 230, 230, 1); /* 1px */
          user-select: none;
          box-shadow: 0 0.5rem 1.875rem rgba(0, 0, 0, 0.1); /* 0 8px 30px */
          margin: 0;
        }
        .newsshowcase-title-item:hover {
          transform: scale(1.01);
          box-shadow: 0 0.75rem 2.5rem rgba(0, 0, 0, 0.15); /* 0 12px 40px */
        }
        .newsshowcase-title-item.newsshowcase-active {
          background: #002677;
          color: #fff;
          box-shadow: none;
          transform: scale(1.01);
        }
        .newsshowcase-main {
          flex: 1;
          height: 37.5rem; /* 600px */
          position: relative;
          overflow: hidden;
        }
        .cards-wrapper {
          display: flex;
          flex-direction: column;
          width: 100%;
          height: 100%;
        }
        .newsshowcase-card {
          background: white;
          border-radius: 0.625rem; /* 10px */
          overflow: hidden;
          box-shadow: 0 0.5rem 1.875rem rgba(0, 0, 0, 0.1); /* 0 8px 30px */
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          border: 0.0625rem solid rgba(230, 230, 230, 1); /* 1px */
          flex-shrink: 0;
        }
        .newsshowcase-card:hover {
          transform: scale(1.01);
          box-shadow: 0 0.75rem 2.5rem rgba(0, 0, 0, 0.15); /* 0 12px 40px */
        }
        .newsshowcase-image {
          width: 100%;
          height: 60%;
          max-height: 60%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }
        .newsshowcase-card:hover .newsshowcase-image {
          transform: scale(1.02);
        }
        .newsshowcase-content {
          padding: 2rem;
          background: white;
          flex: 1;
          display: flex;
          flex-direction: column;
          position: relative;
        }
        .newsshowcase-card-title {
          font-size: 2rem;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 1rem;
          line-height: 1.2;
          letter-spacing: -0.03125rem; /* -0.5px */
        }
        .newsshowcase-description {
          font-size: 1rem;
          color: #333;
          line-height: 1.6;
          flex: 1;
        }
        .newsshowcase-link-indicator {
          position: absolute;
          bottom: 1.5rem;
          right: 1.5rem;
          display: inline-flex;
          align-items: center;
          color: #0A2C7E;
          font-weight: bold;
          font-size: 1rem;
          opacity: 0;
          transform: translateX(0.625rem); /* 10px */
          transition: all 0.3s ease;
          background: #FDEFC3;
          padding: 0.5rem 1rem;
          border-radius: 99rem;
          border: 0.0625rem solid rgb(255, 228, 138); /* Assuming 1px solid */
          gap: 0.5rem; /* Adjusted for consistency */
        }
        .newsshowcase-card:hover .newsshowcase-link-indicator {
          opacity: 1;
          transform: translateX(0);
        }
        .newsshowcase-arrow {
          font-size: 1rem;
        }
        @media (max-width: 48rem) { /* 768px */
          .newsshowcase-container {
            flex-direction: column;
            height: auto;
            padding: 1rem;
            max-width: 100%; /* Ensure it uses full width on mobile */
          }
          .newsshowcase-sidebar, .newsshowcase-main {
            display: none;
          }
          .accordion-wrapper {
            display: flex;
            flex-direction: column;
            gap: 1rem;
          }
          .accordion-item {
            margin-bottom: 1rem;
            border: 0.0625rem solid rgba(230, 230, 230, 1);
            border-radius: 0.625rem;
            overflow: hidden;
            background: white;
          }
          .accordion-title {
            padding: 1rem;
            background: white;
            cursor: pointer;
            user-select: none;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-weight: 500;
            color: #1d1d1f;
          }
          .accordion-title.active {
            background: #002677;
            color: #fff;
          }
          .accordion-content {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.5s ease;
            background: white;
          }
          .accordion-content.expanded {
            max-height: 62.5rem; /* 1000px, for ample space */
          }
          .accordion-content .newsshowcase-card {
            box-shadow: none;
            border: none;
            border-radius: 0;
            margin: 0;
          }
          .accordion-content .newsshowcase-image {
            height: 12.5rem; /* 200px */
            border-radius: 0;
          }
          .accordion-content .newsshowcase-content {
            padding: 1rem;
          }
          .accordion-content .newsshowcase-card-title {
            font-size: 1.5rem;
          }
          .accordion-content .newsshowcase-description {
            font-size: 0.875rem;
          }
          .accordion-content .newsshowcase-link-indicator {
            position: static;
            opacity: 1;
            transform: none;
            margin-top: 1rem;
            justify-content: center;
            width: fit-content;
            margin-left: auto;
            margin-right: auto;
          }
        }
      `}</style>

      {!isMobile && (
        <>
          <div className="newsshowcase-sidebar">
            {newsData.map((news, idx) => (
              <div
                key={idx}
                className={`newsshowcase-title-item ${selectedIndex === idx ? 'newsshowcase-active' : ''}`}
                onClick={() => handleNewsClick(idx)}
              >
                <Translate>{news.title}</Translate>
              </div>
            ))}
          </div>
          <div className="newsshowcase-main" ref={mainRef}>
            <div className="cards-wrapper">
              {newsData.map((news, idx) => (
                <div
                  key={idx}
                  className="newsshowcase-card"
                  onClick={() => handleCardClick(news.link)}
                >
                  <img src={news.img} alt={translate({ message: news.title, id: `newsShowcase.news.${idx}.titleAlt`})} className="newsshowcase-image" />
                  <div className="newsshowcase-content">
                    <h2 className="newsshowcase-card-title"><Translate>{news.title}</Translate></h2>
                    <p className="newsshowcase-description">
                      <Translate>
                        {news.description}
                      </Translate>
                    </p>
                    <div className="newsshowcase-link-indicator">
                      <Translate>前往阅读</Translate>
                      <span className="newsshowcase-arrow">→</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {isMobile && (
        <div className="accordion-wrapper">
          {newsData.map((news, idx) => (
            <div key={idx} className="accordion-item">
              <div
                className={`accordion-title ${selectedIndex === idx ? 'active' : ''}`}
                onClick={() => {
                  setSelectedIndex(prevIndex => prevIndex === idx ? -1 : idx); // Allow toggle
                }}
              >
                <span><Translate>{news.title}</Translate></span>
                <span>{selectedIndex === idx ? '−' : '+'}</span>
              </div>
              <div className={`accordion-content ${selectedIndex === idx ? 'expanded' : ''}`}>
                <div className="newsshowcase-card" onClick={() => handleCardClick(news.link)}>
                  <img src={news.img} alt={translate({ message: news.title, id: `newsShowcase.news.${idx}.titleAltMobile`})} className="newsshowcase-image" />
                  <div className="newsshowcase-content">
                    <h2 className="newsshowcase-card-title"><Translate>{news.title}</Translate></h2>
                    <p className="newsshowcase-description"><Translate>{news.description}</Translate></p>
                    <div className="newsshowcase-link-indicator">
                      <Translate>前往阅读</Translate>
                      <span className="newsshowcase-arrow">→</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsShowcase;