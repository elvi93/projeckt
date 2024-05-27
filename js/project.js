const getLatestProject = async () => {
    try {
      let response = await fetch("https://raw.githubusercontent.com/ironhack-jc/mid-term-api/main/projects");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      let cleanResponseProjects = await response.json();
      let projectContainer = document.querySelector(".main-project");
  
      projectContainer.innerHTML = '';
  
      if (cleanResponseProjects.length > 0) {
        let project = cleanResponseProjects[0];
        projectContainer.innerHTML = `
          <div class="project">
            <h2>${project.name}</h2>
            <p>${project.description}</p>
            <p>${project.content}</p>
            <img src="${project.image}" alt="${project.title}" />
          </div>
        `;
      }
    } catch (error) {
      console.error("Error fetching the latest project:", error);
    }
  };
  
  getLatestProject();
  

  const getRecentProject = async () => {
    try {
        let response = await fetch("https://raw.githubusercontent.com/ironhack-jc/mid-term-api/main/projects");
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        let cleanResponseProjects = await response.json();
        let projectContainer = document.querySelector(".projects-container");

        projectContainer.innerHTML = '';

        let limitedProjects = cleanResponseProjects.slice(1, 4);

        for (const project of limitedProjects) {
            let projectInfo = `
                <div class="project">
                    <img src="${project.image}" alt="${project.title}" />
                    <h3>${project.name}</h3>
                    <p>${project.description}</p>
                    <a href="#">Learn More</a>
                </div>
            `;
            projectContainer.innerHTML += projectInfo;
        }
    } catch (errorFromCatchBlock) {
        console.error(errorFromCatchBlock);
    }
};

getRecentProject();