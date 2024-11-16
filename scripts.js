// script.js

// Fetch the experiecne JSON file and render experience
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        const experienceContainer = document.getElementById('experience-wrapper');
        data.experience.forEach(experience => {
            // Create experience card
            const experienceCard = document.createElement('div');
            experienceCard.classList.add('experience');
            experienceCard.innerHTML = `
                <div class="company-logo">
                    <img src="${experience.logo}" alt="${experience.company}" class="logo">
                </div>
                <div class="experience-text"> 
                    <div class="headline">
                        <div>
                            <h3>${experience.title}</h3>
                            <p>${experience.company}</p>                    
                        </div>
                        <div style="text-align:end">
                            <p style="color: #aaa">${experience.start} - ${experience.end}, ${experience.year}</p>
                            <p style="color: #aaa">${experience.location}</p>
                        </div>
                    </div>
                    <ul class="experience-description"></ul>
                </div>
            `;
            experience.description.forEach(desc => {
                const descEl = document.createElement('li');
                descEl.textContent = desc;
                experienceCard.querySelector('.experience-description').appendChild(descEl);
            });
            experienceContainer.appendChild(experienceCard);
        });
    })

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
                <div class="links">
                    <a href="${project.links.github}" class="view-more" target="_blank">GitHub</a>
                    <a href="${project.links.liveDemo}" class="view-more" target="_blank" ${project.links.liveDemo ? '' : 'hidden'}>Demo</a>
                </div>
            `;
            project.tags.forEach(tag => {
                const tagEl = document.createElement('span');
                tagEl.classList.add('tag');
                tagEl.textContent = tag;
                projectCard.querySelector('.tags').appendChild(tagEl);
            });
            projectsContainer.appendChild(projectCard);
        });
    })
    .catch(error => console.error('Error loading projects:', error));
