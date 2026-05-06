import { ExternalLink } from "lucide-react";
import "./Resources.css";

function Resources() {
  const resources = [
    {
      title: "Java Tutorial",
      description: "Useful for Java basics used in Spring Boot.",
      link: "https://www.w3schools.com/java/",
      type: "Programming",
    },
    {
      title: "Spring Boot Guide",
      description: "Official Spring quick-start guide.",
      link: "https://spring.io/guides/gs/spring-boot/",
      type: "Backend",
    },
    {
      title: "React Tutorial",
      description: "Frontend learning resource for React components.",
      link: "https://www.w3schools.com/react/",
      type: "Frontend",
    },
    {
      title: "Eclipse IDE Download",
      description: "Download Eclipse for Java development.",
      link: "https://www.eclipse.org/downloads/",
      type: "Software",
    },
    {
      title: "GitHub Docs",
      description: "Guidance for repositories, commits and branches.",
      link: "https://docs.github.com/",
      type: "Tooling",
    },
  ];

  return (
    <div className="resources-page">
      <div>
        <h1>Resources</h1>
        <p>Useful onboarding links and learning materials.</p>
      </div>

      <div className="resources-grid">
        {resources.map((resource) => (
          <a
            key={resource.title}
            href={resource.link}
            target="_blank"
            rel="noreferrer"
            className="resource-card card"
          >
            <span>{resource.type}</span>
            <h2>{resource.title}</h2>
            <p>{resource.description}</p>

            <div className="resource-link">
              Open resource <ExternalLink size={16} />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default Resources;