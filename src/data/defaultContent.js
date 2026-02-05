export const defaultContent = {
  hero: {
    title: 'Full-Stack Developer',
    subtitle: 'Crafting exceptional web experiences with PHP Laravel & React',
    description:
      "I deliver high-quality, scalable solutions that combine powerful backend architecture with stunning, responsive frontends. Let's bring your vision to life.",
    imageUrl: '/profile.jpg',
    ctaPrimaryText: 'Book a Service',
    ctaPrimaryUrl: '/booking',
    ctaSecondaryText: 'View My Work',
    ctaSecondaryUrl: '#projects'
  },
  about: {
    title: 'About Me',
    subtitle: 'Building modern web products that scale',
    body:
      'I am a full-stack developer focused on Laravel APIs and React interfaces. I help teams ship reliable products with clean architecture, clear communication, and performance-first thinking.',
    highlights: [
      'Laravel API design and integrations',
      'React SPAs with polished UI/UX',
      'Hexagonal, clean architecture patterns',
      'Performance, security, and scalability'
    ]
  },
  projectsSection: {
    title: 'Featured Projects',
    subtitle: 'Showcasing high-quality solutions that deliver exceptional results'
  },
  servicesSection: {
    title: 'Services',
    subtitle: 'Reserve a service and I will reach out to confirm the schedule.'
  },
  services: [
    {
      id: 1,
      title: 'Laravel API Development',
      description: 'Design and build secure REST APIs with Laravel, auth, and integrations.',
      price: '$450+',
      duration: '3-5 days'
    },
    {
      id: 2,
      title: 'React Landing Page',
      description: 'Conversion-focused landing page with modern UI and responsive layout.',
      price: '$300+',
      duration: '2-3 days'
    },
    {
      id: 3,
      title: 'Full-Stack MVP',
      description: 'Laravel backend + React frontend MVP with admin dashboard.',
      price: '$950+',
      duration: '1-2 weeks'
    }
  ],
  projects: [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description:
        'Full-featured online store built with Laravel backend and React frontend. Features include cart management, payment integration, and admin dashboard.',
      thumbnail:
        '/ecommerce.png',
      link: 'https://ecommerce-project.mohamed-sherif.site',
      tags: ['Laravel', 'React', 'MySQL', 'Paymob']
    },
    {
      id: 2,
      title: 'Task Management System',
      description:
        'Collaborative task management application with real-time updates. Built with Laravel API and React SPA for seamless user experience.',
      thumbnail:
        'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop',
      link: 'https://github.com/yourusername/project2',
      tags: ['Laravel', 'React', 'WebSocket', 'PostgreSQL']
    },
    {
      id: 3,
      title: 'Social Media Dashboard',
      description:
        'Analytics dashboard for social media metrics with beautiful data visualizations and real-time updates.',
      thumbnail:
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
      link: 'https://github.com/yourusername/project3',
      tags: ['React', 'Chart.js', 'REST API']
    },
    {
      id: 4,
      title: 'Blog CMS',
      description:
        'Modern content management system with markdown support, SEO optimization, and multi-user capabilities.',
      thumbnail:
        'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=600&fit=crop',
      link: 'https://github.com/yourusername/project4',
      tags: ['Laravel', 'React', 'Markdown', 'Redis']
    },
    {
      id: 5,
      title: 'Real Estate Portal',
      description:
        'Property listing platform with advanced search filters, interactive maps, and booking system.',
      thumbnail:
        'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop',
      link: 'https://github.com/yourusername/project5',
      tags: ['Laravel', 'React', 'Maps API', 'MySQL']
    },
    {
      id: 6,
      title: 'Restaurant Ordering App',
      description:
        'Online food ordering system with menu management, order tracking, and delivery integration.',
      thumbnail:
        'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop',
      link: 'https://github.com/yourusername/project6',
      tags: ['Laravel', 'React', 'Payment Gateway']
    }
  ],
  contact: {
    title: "Let's Work Together",
    subtitle: "Ready to start your next project? Get in touch and let's create something amazing.",
    email: 'muhammed.shereaf@gmail.com',
    githubUrl: 'https://github.com/Muhammed-Sherif',
    githubLabel: 'github.com/Muhammed-Sherif',
    linkedinUrl: 'https://linkedin.com/in/mohamed-sherif-446994392/',
    linkedinLabel: 'linkedin.com/in/mohamed-sherif-446994392/',
    whatsappNumber: '+20 109 914 8624',
    whatsappUrl: 'https://wa.me/201099148624',
    benefits: [
      'High-quality, scalable code',
      'Fast turnaround times',
      'Creative problem solving',
      'Responsive and modern design',
      'Security-focused development',
      'Clear communication'
    ]
  },
  terms: {
    title: 'Terms and Conditions',
    contentHtml: '',
    contentHtmlAr: ''
  }
};

export const mergeContent = (incoming) => {
  if (!incoming || typeof incoming !== 'object') {
    return defaultContent;
  }

  return {
    ...defaultContent,
    ...incoming,
    hero: { ...defaultContent.hero, ...(incoming.hero || {}) },
    about: { ...defaultContent.about, ...(incoming.about || {}) },
    projectsSection: {
      ...defaultContent.projectsSection,
      ...(incoming.projectsSection || {})
    },
    servicesSection: {
      ...defaultContent.servicesSection,
      ...(incoming.servicesSection || {})
    },
    projects: Array.isArray(incoming.projects)
      ? incoming.projects
      : defaultContent.projects,
    services: Array.isArray(incoming.services)
      ? incoming.services
      : defaultContent.services,
    contact: { ...defaultContent.contact, ...(incoming.contact || {}) },
    terms: { ...defaultContent.terms, ...(incoming.terms || {}) }
  };
};
