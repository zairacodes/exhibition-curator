# Exhibition Curator

Welcome and thank you for exploring Exhibition Curator, a web app where users can discover artworks and antiquities from the collections of The Metropolitan Museum of Art and The Art Institute of Chicago and curate their own personal exhibitions.

You can explore the live version of the app [here](https://exhibit-curator.netlify.app/).

## Overview

Exhibition Curator offers an intuitive and engaging way to navigate artworks from both [The Metropolitan Museum of Art](https://metmuseum.github.io/) and [The Art Institute of Chicago](https://api.artic.edu/docs/) via open access APIs. Users can search for specific pieces, filter results by collection and browse effortlessly with seamless pagination. The platform displays images and essential details about each artwork individually, allowing for a deeper appreciation. Each artwork has its own unique link, which can be easily shared with others for direct access to the artwork's details page.  
Beyond discovery, the app lets users curate their own personal exhibitions by creating and managing multiple collections. Artworks can be added or removed at any time and exhibitions are stored locally using localStorage, ensuring they remain available for easy access and review.  
Exhibition Curator is fully accessible and responsive, providing an inclusive experience for all users across all devices. The app clearly provides feedback on interactions, displays error messages and shows loading states while content is being fetched, ensuring a smooth and intuitive experience throughout.

### Preview

<img src="https://github.com/user-attachments/assets/257bb1dd-9177-4dc8-a861-db338d924ec4" width="100%" alt="Exhibition Curator Preview">

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript, React (including React Router)
- **Build Tool**: Vite
- **API Handling**: Axios (with axios-rate-limit)
- **Storage**: localStorage
- **Deployment**: Netlify
- **Accessibility Tools**: Lighthouse, WAVE
- **Graphics**: Canva

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/download/package-manager/): v21.7.2 or above

### Installing

To run the project locally, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/zairacodes/exhibition-curator.git
   cd exhibition-curator
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Run the dev environment**:

   ```bash
   npm run dev
   ```

Feel free to reach out if you have any questions or feedback!

---

[![Made with ♥ by Zaira](https://img.shields.io/badge/Made%20with%20%E2%9D%A4%20by-Zaira-red)](https://www.linkedin.com/in/zaira-n/)
