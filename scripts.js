// script.js

// Fetch the projects JSON file and render projects
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        const projectsContainer = document.getElementById('projects-container');
        data.projects.forEach(project => {
            // Create project card
            const projectCard = document.createElement('div');
            projectCard.classList.add('project-card');
            projectCard.innerHTML = `
                <img src="${project.image}" alt="${project.title}" class="project-image">
                <h3>${project.title}</h3>
                <p class="project-description">${project.headline}</p>
                <p class="tags"></p>
                <button class="view-more" data-id="${project.id}">View More</button>
            `;
            project.tags.forEach(tag => {
                const tagEl = document.createElement('span');
                tagEl.classList.add('tag');
                tagEl.textContent = tag;
                projectCard.querySelector('.tags').appendChild(tagEl);
            });
            projectsContainer.appendChild(projectCard);

            // Attach click event to open modal
            projectCard.querySelector('.view-more').addEventListener('click', () => openModal(project));
        });
    })
    .catch(error => console.error('Error loading projects:', error));

// Function to open the modal with project details
function openModal(project) {
    document.getElementById('modal-title').textContent = project.title;
    document.getElementById('modal-description').textContent = project.description;
    
    // Tags
    const modalTags = document.getElementById('modal-tags');
    modalTags.innerHTML = ''; // Clear previous tags
    project.tags.forEach(tag => {
        const tagEl = document.createElement('span');
        tagEl.classList.add('tag');
        tagEl.textContent = tag;
        modalTags.appendChild(tagEl);
    });

    // Links
    document.getElementById('modal-github').href = project.links.github;
    const liveDemoLink = document.getElementById('modal-liveDemo');
    if (project.links.liveDemo) {
        liveDemoLink.href = project.links.liveDemo;
        liveDemoLink.classList.remove('hidden');
    } else {
        liveDemoLink.classList.add('hidden');
    }

    // Show modal
    document.getElementById('project-modal').classList.remove('hidden');
}

// Close modal on click of the close button
document.querySelector('.modal .close').addEventListener('click', () => {
    document.getElementById('project-modal').classList.add('hidden');
});
