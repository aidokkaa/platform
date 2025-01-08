import React, { useEffect, useRef } from "react";
import "../scss/styles/features.scss";
import wave from '../images/wave-haikei.png'

const FeaturesSection = () => {
  const featuresRef = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("visible");
            }, index * 200); // Задержка для каждого элемента (200ms)
          }
        });
      },
      { threshold: 0.2 }
    );

    featuresRef.current.forEach((feature) => {
      if (feature) observer.observe(feature);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="features">
      <img className="img" src= {wave} alt="" />
      <div className="features__header">
        
        <h2 className="features__title">Empower Your Team to Do More</h2>
      </div>
      <ul className="features__list">
        
        {[
          {
            icon: "🛠️",
            title: "Intuitive Interface",
            description: "Simple, clean, and easy-to-navigate platform.",
          },
          {
            icon: "⚙️",
            title: "Automated Processes",
            description: "Save time and reduce errors with task automation.",
          },
          {
            icon: "📈",
            title: "Scalable Solutions",
            description: "Grow your business without outgrowing your tools.",
          },
          // {
          //   icon: "🔧",
          //   title: "Comprehensive Tools",
          //   description: "From project tracking to communication, everything you need is built-in.",
          // },
        ].map((feature, index) => (
          <li
            key={index}
            className="feature"
            ref={(el) => (featuresRef.current[index] = el)}
          >
            <span className="feature__icon">{feature.icon}</span>
            <div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default FeaturesSection;
