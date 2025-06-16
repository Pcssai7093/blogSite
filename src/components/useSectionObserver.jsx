import { useEffect, useState } from "react";

const useSectionObserver = (sectionIds) => {
  const [activeId, setActiveId] = useState("");
  
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1, // 60% visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    }, options);

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  return activeId;
};

export default useSectionObserver;
