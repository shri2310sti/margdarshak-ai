/**
 * Roadmap Service v2
 * Smart role matching + dynamic fallback for ANY role (tech or non-tech)
 */

const ROLE_TEMPLATES = {
    "full stack developer": {
        summary: "A Full Stack Developer builds both client-facing UIs and server-side logic. This roadmap covers essential web technologies, frameworks, and deployment skills.",
        allSteps: [
            { title: "Master HTML & CSS Fundamentals", description: "Semantic HTML5, CSS3 layouts (Flexbox, Grid), and responsive design principles.", resources: ["MDN Web Docs", "freeCodeCamp HTML/CSS", "CSS Tricks"], estimatedTime: "2-3 weeks", keywords: ["html", "css", "markup", "styling"] },
            { title: "JavaScript Core Concepts", description: "Variables, functions, DOM manipulation, ES6+ features (arrow functions, promises, async/await), and error handling.", resources: ["javascript.info", "Eloquent JavaScript", "You Don't Know JS"], estimatedTime: "4-6 weeks", keywords: ["javascript", "js", "es6", "dom"] },
            { title: "React.js & Next.js", description: "Build dynamic UIs with React hooks and state management, then level up to Next.js for SSR, routing, and performance.", resources: ["React Official Docs", "Next.js Docs", "Scrimba React Course"], estimatedTime: "4-6 weeks", keywords: ["react", "next", "nextjs", "jsx"] },
            { title: "Node.js & Express Backend", description: "Create RESTful APIs with Node.js and Express. Understand middleware, routing, authentication (JWT), and error handling.", resources: ["Node.js Docs", "Express.js Guide", "The Odin Project"], estimatedTime: "3-4 weeks", keywords: ["node", "express", "backend", "api", "server"] },
            { title: "Database Design — SQL & NoSQL", description: "MongoDB with Mongoose for NoSQL and PostgreSQL for relational data. Learn schemas, queries, and relationships.", resources: ["MongoDB University", "PostgreSQL Tutorial", "Mongoose Docs"], estimatedTime: "3-4 weeks", keywords: ["mongodb", "sql", "database", "postgres", "mysql"] },
            { title: "Authentication & Security", description: "JWT auth, OAuth (Google/GitHub), bcrypt hashing, HTTPS, CORS, and common security best practices.", resources: ["OWASP Top 10", "Passport.js Docs", "JWT.io"], estimatedTime: "2 weeks", keywords: ["auth", "jwt", "security", "oauth"] },
            { title: "Build 2-3 Full Stack Projects", description: "Apply your skills building a CRUD app, e-commerce site, or social platform. Push everything to GitHub with good READMEs.", resources: ["GitHub", "Vercel", "roadmap.sh"], estimatedTime: "6-8 weeks", keywords: [] },
            { title: "DevOps & Deployment", description: "Deploy on Vercel/Render, understand CI/CD, Docker basics, environment variables, and monitoring.", resources: ["Vercel Docs", "Render.com", "Docker Getting Started"], estimatedTime: "2-3 weeks", keywords: ["docker", "deployment", "devops", "ci/cd"] },
        ],
    },

    "frontend developer": {
        summary: "A Frontend Developer crafts pixel-perfect, performant user interfaces. This roadmap takes you from HTML/CSS basics to advanced React patterns and performance optimization.",
        allSteps: [
            { title: "HTML5 & CSS3 Mastery", description: "Semantic HTML, accessibility (ARIA), CSS Grid, Flexbox, animations, and CSS custom properties.", resources: ["MDN Web Docs", "CSS Tricks", "web.dev"], estimatedTime: "2-3 weeks", keywords: ["html", "css", "markup"] },
            { title: "JavaScript & TypeScript", description: "ES6+, DOM APIs, Fetch API, modules. Then add TypeScript for type safety — a must for modern frontend roles.", resources: ["javascript.info", "TypeScript Handbook", "Total TypeScript"], estimatedTime: "5-6 weeks", keywords: ["javascript", "typescript", "js", "ts"] },
            { title: "React & State Management", description: "React hooks, context API, Redux Toolkit or Zustand for global state, and React Query for server state.", resources: ["React Docs", "Redux Toolkit Docs", "TkDodo Blog"], estimatedTime: "5-6 weeks", keywords: ["react", "redux", "state"] },
            { title: "Next.js & Performance", description: "App Router, SSR, SSG, ISR, image optimization, and Core Web Vitals (LCP, CLS, FID).", resources: ["Next.js Docs", "web.dev Performance", "Lighthouse"], estimatedTime: "3-4 weeks", keywords: ["next", "nextjs", "performance"] },
            { title: "Testing Frontend Code", description: "Unit tests with Jest, component tests with React Testing Library, E2E with Playwright or Cypress.", resources: ["Testing Library Docs", "Jest Docs", "Playwright Docs"], estimatedTime: "2-3 weeks", keywords: ["testing", "jest", "cypress"] },
            { title: "Build Portfolio Projects", description: "Create 3 polished projects: a landing page, an interactive app, and a dashboard. Deploy on Vercel.", resources: ["Vercel", "GitHub Pages", "Behance for design inspiration"], estimatedTime: "6-8 weeks", keywords: [] },
        ],
    },

    "backend developer": {
        summary: "A Backend Developer powers the server-side logic, databases, and APIs. This roadmap builds deep expertise in Node.js, databases, and cloud deployment.",
        allSteps: [
            { title: "Node.js Fundamentals", description: "Event loop, streams, file system, modules (CommonJS & ESM), npm ecosystem, and async patterns.", resources: ["Node.js Docs", "NodeSchool.io", "Node.js Design Patterns"], estimatedTime: "3-4 weeks", keywords: ["node", "nodejs"] },
            { title: "REST API Design with Express", description: "Route design, middleware, error handling, request validation with Zod/Joi, and API documentation with Swagger.", resources: ["Express.js Docs", "Swagger/OpenAPI", "Zod Docs"], estimatedTime: "3-4 weeks", keywords: ["express", "api", "rest"] },
            { title: "Databases — SQL & NoSQL", description: "PostgreSQL with Prisma ORM for relational data, MongoDB with Mongoose for documents. Indexing, transactions, query optimization.", resources: ["PostgreSQL Docs", "Prisma Docs", "MongoDB University"], estimatedTime: "4-5 weeks", keywords: ["mongodb", "sql", "postgres", "mysql", "database", "prisma"] },
            { title: "Authentication & Security", description: "JWT, refresh tokens, OAuth2, rate limiting, input sanitization, SQL injection prevention, and helmet.js.", resources: ["OWASP", "Auth0 Blog", "Passport.js"], estimatedTime: "2-3 weeks", keywords: ["auth", "jwt", "security"] },
            { title: "Caching & Performance", description: "Redis for caching, database query optimization, connection pooling, and load balancing concepts.", resources: ["Redis Docs", "Redis University", "High Performance Node.js"], estimatedTime: "2-3 weeks", keywords: ["redis", "cache", "performance"] },
            { title: "Deployment & DevOps", description: "Docker, docker-compose, CI/CD with GitHub Actions, deploy to Render/Railway/AWS.", resources: ["Docker Docs", "GitHub Actions", "Render.com"], estimatedTime: "3-4 weeks", keywords: ["docker", "devops", "deployment"] },
            { title: "Build Production-Grade APIs", description: "Build 2 complete backend projects: a REST API with full auth, and a real-time app with WebSockets.", resources: ["Socket.io", "GitHub", "Postman for testing"], estimatedTime: "5-6 weeks", keywords: [] },
        ],
    },

    "data scientist": {
        summary: "A Data Scientist extracts insights from data using statistics, machine learning, and visualization. This roadmap covers Python, ML frameworks, and real-world data projects.",
        allSteps: [
            { title: "Python for Data Science", description: "Python syntax, NumPy for numerical computing, Pandas for data manipulation, and Jupyter notebooks.", resources: ["Python Docs", "Kaggle Python Course", "Real Python"], estimatedTime: "3-4 weeks", keywords: ["python", "numpy", "pandas"] },
            { title: "Statistics & Mathematics", description: "Descriptive statistics, probability, hypothesis testing, linear algebra, and calculus basics for ML.", resources: ["Khan Academy Statistics", "StatQuest YouTube", "3Blue1Brown"], estimatedTime: "4-6 weeks", keywords: ["statistics", "math", "probability"] },
            { title: "Data Visualization", description: "Matplotlib, Seaborn, Plotly for charts. Understand which chart type communicates which insights effectively.", resources: ["Matplotlib Docs", "Seaborn Gallery", "Plotly Docs"], estimatedTime: "2 weeks", keywords: ["visualization", "matplotlib", "seaborn", "plotly"] },
            { title: "Machine Learning with Scikit-learn", description: "Supervised learning (regression, classification), unsupervised learning (clustering), model evaluation, cross-validation.", resources: ["Scikit-learn Docs", "Hands-On ML (book)", "fast.ai"], estimatedTime: "6-8 weeks", keywords: ["machine learning", "ml", "scikit-learn", "sklearn"] },
            { title: "Deep Learning with TensorFlow/PyTorch", description: "Neural networks, CNNs, RNNs, transformers. Build and train models on real datasets.", resources: ["fast.ai Course", "TensorFlow Tutorials", "PyTorch Docs"], estimatedTime: "6-8 weeks", keywords: ["deep learning", "tensorflow", "pytorch", "neural network"] },
            { title: "Real-World Data Projects", description: "Complete 3 end-to-end projects: EDA, an ML model deployment, and a Kaggle competition.", resources: ["Kaggle", "UCI ML Repository", "Hugging Face"], estimatedTime: "8 weeks", keywords: [] },
        ],
    },

    "devops engineer": {
        summary: "A DevOps Engineer bridges development and operations, automating infrastructure and ensuring reliable software delivery.",
        allSteps: [
            { title: "Linux & Shell Scripting", description: "Linux commands, bash scripting, file permissions, process management, and SSH.", resources: ["Linux Journey", "The Linux Command Line", "OverTheWire Bandit"], estimatedTime: "3-4 weeks", keywords: ["linux", "bash", "shell"] },
            { title: "Networking Fundamentals", description: "TCP/IP, DNS, HTTP/HTTPS, load balancing, firewalls, and VPCs.", resources: ["Cloudflare Learning", "Computer Networking: Top-Down Approach"], estimatedTime: "2-3 weeks", keywords: ["networking", "tcp", "dns"] },
            { title: "Docker & Containerization", description: "Docker images, containers, volumes, networks, docker-compose, and writing production Dockerfiles.", resources: ["Docker Docs", "Play with Docker", "Docker Deep Dive"], estimatedTime: "3-4 weeks", keywords: ["docker", "container"] },
            { title: "CI/CD Pipelines", description: "GitHub Actions, GitLab CI, or Jenkins. Automated testing, building, and deployment pipelines.", resources: ["GitHub Actions Docs", "GitLab CI Docs", "CircleCI"], estimatedTime: "3 weeks", keywords: ["ci/cd", "github actions", "jenkins", "pipeline"] },
            { title: "Kubernetes", description: "Pods, deployments, services, ingress, ConfigMaps, Secrets, Helm charts, and cluster management.", resources: ["Kubernetes Docs", "KodeKloud", "CKAD Prep"], estimatedTime: "6-8 weeks", keywords: ["kubernetes", "k8s", "helm"] },
            { title: "Cloud Platforms (AWS/GCP/Azure)", description: "EC2, S3, RDS, IAM on AWS. Cloud networking, auto-scaling, and managed services.", resources: ["AWS Free Tier", "A Cloud Guru", "AWS Certified Developer"], estimatedTime: "6-8 weeks", keywords: ["aws", "gcp", "azure", "cloud"] },
        ],
    },

    "ui ux designer": {
        summary: "A UI/UX Designer creates intuitive, visually appealing digital experiences. This roadmap covers design thinking, industry tools, and building a strong portfolio.",
        allSteps: [
            { title: "Design Fundamentals", description: "Typography, color theory, spacing, visual hierarchy, and grid systems — the grammar of good design.", resources: ["Google Material Design", "Refactoring UI (book)", "Canva Design School"], estimatedTime: "2-3 weeks", keywords: ["design", "typography", "color", "visual"] },
            { title: "UX Research & Design Thinking", description: "User interviews, personas, empathy maps, journey mapping, and the 5-stage design thinking process.", resources: ["IDEO Design Thinking", "Nielsen Norman Group", "Interaction Design Foundation"], estimatedTime: "3-4 weeks", keywords: ["ux", "research", "user research", "design thinking"] },
            { title: "Wireframing & Prototyping", description: "Low and high fidelity wireframes, user flows, clickable prototypes, and usability testing.", resources: ["Balsamiq", "Figma Tutorials", "Maze (user testing)"], estimatedTime: "3-4 weeks", keywords: ["wireframe", "prototype", "figma"] },
            { title: "Master Figma", description: "Components, auto layout, variants, design systems, prototyping interactions, and developer handoff.", resources: ["Figma Official Tutorials", "Figma Community", "DesignCourse YouTube"], estimatedTime: "4-5 weeks", keywords: ["figma", "sketch", "adobe xd"] },
            { title: "Accessibility & Usability", description: "WCAG guidelines, colour contrast, screen reader compatibility, and inclusive design principles.", resources: ["WCAG 2.1 Guidelines", "a11y Project", "WebAIM"], estimatedTime: "2 weeks", keywords: ["accessibility", "wcag", "a11y"] },
            { title: "Build a Design Portfolio", description: "Create 3-4 case studies showing your process: problem → research → design → outcome. Deploy on Behance.", resources: ["Behance", "Dribbble", "Notion for case studies"], estimatedTime: "6-8 weeks", keywords: [] },
        ],
    },

    "mobile developer": {
        summary: "A Mobile Developer builds native or cross-platform apps for iOS and Android. This roadmap covers React Native and the full mobile development lifecycle.",
        allSteps: [
            { title: "JavaScript & React Fundamentals", description: "Strong JS foundation is essential. Learn ES6+, React hooks, state management, and component patterns.", resources: ["javascript.info", "React Docs", "Scrimba React"], estimatedTime: "4-5 weeks", keywords: ["javascript", "react", "js"] },
            { title: "React Native Core", description: "Components, StyleSheet, Flexbox layout, navigation (React Navigation), and platform-specific APIs.", resources: ["React Native Docs", "Expo Docs", "William Candillon YouTube"], estimatedTime: "4-5 weeks", keywords: ["react native", "mobile", "expo"] },
            { title: "State Management & Storage", description: "Redux Toolkit or Zustand for global state, React Query for server state, and AsyncStorage for local data.", resources: ["Redux Toolkit Docs", "Zustand Docs", "MMKV Storage"], estimatedTime: "2-3 weeks", keywords: ["redux", "state management", "zustand"] },
            { title: "Connecting to Backend APIs", description: "Fetch/Axios for REST APIs, authentication flows (JWT + secure storage), and real-time with WebSockets.", resources: ["Axios Docs", "React Query Docs", "Socket.io Client"], estimatedTime: "2-3 weeks", keywords: ["api", "axios", "fetch"] },
            { title: "App Store Deployment", description: "Build APK/IPA, set up signing certificates, app store listings, screenshots, and the submission process.", resources: ["Expo EAS Build", "Google Play Console", "App Store Connect"], estimatedTime: "2 weeks", keywords: ["deployment", "app store", "google play"] },
            { title: "Build & Publish 2 Apps", description: "Build two complete apps: a utility app and a social/content app. Publish at least one to the Play Store.", resources: ["Google Play Console", "Expo Application Services", "GitHub"], estimatedTime: "8-10 weeks", keywords: [] },
        ],
    },
};

// ── Keyword → Template Map ─────────────────────────────────────────────────────
const KEYWORD_MAP = {
    "full stack": "full stack developer", fullstack: "full stack developer",
    "full-stack": "full stack developer", mern: "full stack developer",
    mean: "full stack developer", "web developer": "full stack developer",
    "web dev": "full stack developer",
    frontend: "frontend developer", "front end": "frontend developer",
    "front-end": "frontend developer", "react developer": "frontend developer",
    "ui developer": "frontend developer",
    backend: "backend developer", "back end": "backend developer",
    "back-end": "backend developer", "api developer": "backend developer",
    "node developer": "backend developer",
    "data science": "data scientist", "data analyst": "data scientist",
    "machine learning": "data scientist", "ml engineer": "data scientist",
    "ai engineer": "data scientist", "data engineer": "data scientist",
    devops: "devops engineer", "site reliability": "devops engineer",
    sre: "devops engineer", "platform engineer": "devops engineer",
    "infrastructure engineer": "devops engineer",
    "ui designer": "ui ux designer", "ux designer": "ui ux designer",
    "ui/ux": "ui ux designer", "ux/ui": "ui ux designer",
    designer: "ui ux designer", "product designer": "ui ux designer",
    "mobile developer": "mobile developer", "app developer": "mobile developer",
    "android developer": "mobile developer", "ios developer": "mobile developer",
    "react native": "mobile developer", flutter: "mobile developer",
};

// ── Helpers ────────────────────────────────────────────────────────────────────
function normalize(str) { return str.toLowerCase().trim(); }

function parseSkills(skillsString) {
    return skillsString.split(/[,;\n]+/).map((s) => normalize(s)).filter(Boolean);
}

// ── Smart Role Matcher ─────────────────────────────────────────────────────────
function findTemplate(targetRole) {
    const role = normalize(targetRole);

    // 1. Exact match
    if (ROLE_TEMPLATES[role]) return ROLE_TEMPLATES[role];

    // 2. Keyword map
    for (const [keyword, templateKey] of Object.entries(KEYWORD_MAP)) {
        if (role.includes(keyword)) return ROLE_TEMPLATES[templateKey];
    }

    // 3. Partial word match on template keys
    for (const [key, template] of Object.entries(ROLE_TEMPLATES)) {
        const words = key.split(" ").filter((w) => w.length > 3);
        if (words.some((word) => role.includes(word))) return template;
    }

    // 4. Unknown role → build a dynamic, role-specific roadmap
    return buildDynamicTemplate(targetRole);
}

// ── Dynamic Roadmap for Unknown Roles ─────────────────────────────────────────
function buildDynamicTemplate(targetRole) {
    const roleName = targetRole
        .split(" ")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join(" ");

    return {
        summary: `This roadmap will guide you step-by-step toward becoming a professional ${roleName}. Each phase builds on the last — from foundational knowledge to real-world experience and full job readiness.`,
        allSteps: [
            {
                title: `Understand the ${roleName} Role`,
                description: `Research what a ${roleName} does day-to-day. Read 10+ job descriptions, identify the most commonly required skills and certifications, and follow professionals in this field on LinkedIn.`,
                resources: ["LinkedIn Jobs", "Glassdoor", "Indeed", "YouTube career day-in-life videos"],
                estimatedTime: "1 week",
                keywords: [],
            },
            {
                title: "Build Domain Knowledge & Fundamentals",
                description: `Master the core concepts, terminology, and foundational skills every ${roleName} must know. Take structured courses, read industry-standard guides, and study best practices.`,
                resources: ["Coursera", "Udemy", "YouTube tutorials", "Official industry guides"],
                estimatedTime: "6-8 weeks",
                keywords: [],
            },
            {
                title: "Learn Key Tools & Technologies",
                description: `Identify 3-5 tools that ${roleName}s use most frequently (from job descriptions). Practice each hands-on — don't just watch tutorials, actually build or work on something with every tool.`,
                resources: ["Official tool documentation", "YouTube hands-on tutorials", "freeCodeCamp", "Skillshare"],
                estimatedTime: "4-6 weeks",
                keywords: [],
            },
            {
                title: "Practice with Real-World Projects",
                description: `Apply your skills by working on practice projects that mirror actual ${roleName} tasks. Start small and progressively increase complexity. Seek feedback from online communities.`,
                resources: ["GitHub", "Reddit communities", "Discord study groups", "ADPList (mentors)"],
                estimatedTime: "4-6 weeks",
                keywords: [],
            },
            {
                title: `Get Certified as a ${roleName}`,
                description: `Earn a relevant certification or complete a recognized training program. Certifications validate your skills and significantly improve your employability or client trust.`,
                resources: ["Coursera Professional Certificates", "Google Certificates", "Industry-specific certification bodies"],
                estimatedTime: "4-8 weeks",
                keywords: [],
            },
            {
                title: "Build Portfolio & Online Presence",
                description: `Showcase your best work in a polished portfolio. Set up a strong LinkedIn profile highlighting projects, skills, and certifications. Add testimonials or references if possible.`,
                resources: ["LinkedIn", "Personal website (WordPress/Wix/GitHub Pages)", "Behance or GitHub"],
                estimatedTime: "2 weeks",
                keywords: [],
            },
            {
                title: "Network, Apply & Land Your First Role",
                description: `Start applying to jobs or freelance projects, attend industry meetups and online communities, do mock interviews, and iterate based on feedback. Consistency is key.`,
                resources: ["Naukri.com", "LinkedIn Jobs", "Internshala", "Upwork (freelance)", "AngelList"],
                estimatedTime: "Ongoing",
                keywords: [],
            },
        ],
    };
}

// ── Filter based on existing skills ───────────────────────────────────────────
function filterSteps(allSteps, userSkills, experienceLevel) {
    if (experienceLevel === "beginner" || userSkills.length === 0) return allSteps;
    return allSteps.filter((step) => {
        if (!step.keywords || step.keywords.length === 0) return true;
        const alreadyKnows = step.keywords.every((kw) =>
            userSkills.some((skill) => skill.includes(kw) || kw.includes(skill))
        );
        return !alreadyKnows;
    });
}

// ── Adjust for experience level ───────────────────────────────────────────────
function adjustForExperience(steps, experienceLevel) {
    return steps.map((step, index) => ({
        order: index + 1,
        title: step.title,
        description:
            experienceLevel === "advanced"
                ? step.description + " Focus on edge cases, performance, and industry best practices."
                : step.description,
        resources: step.resources,
        estimatedTime: step.estimatedTime,
    }));
}

// ── Main Export ────────────────────────────────────────────────────────────────
function generateRoadmap(targetRole, currentSkills, experienceLevel) {
    const userSkills = parseSkills(currentSkills);
    const template = findTemplate(targetRole);
    const filteredSteps = filterSteps(template.allSteps, userSkills, experienceLevel);
    const finalSteps = adjustForExperience(filteredSteps, experienceLevel);

    const totalWeeks = finalSteps.reduce((acc, step) => {
        const match = step.estimatedTime?.match(/(\d+)/);
        return acc + (match ? parseInt(match[1]) : 0);
    }, 0);

    const totalEstimatedTime =
        totalWeeks > 0 ? `${totalWeeks}–${totalWeeks + 4} weeks total` : "Varies by pace";

    return { steps: finalSteps, summary: template.summary, totalEstimatedTime };
}

module.exports = { generateRoadmap };