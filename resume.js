let applicants = [];
let currentApplicantIndex = 0;
let filteredApplicants = [];

fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    if (data && data.resume) {
      applicants = data.resume;
      filteredApplicants = [...applicants];
      displayApplicant();
      checkNavigationButtons();
    }
  })
  .catch((error) => console.error("Error fetching data:", error));

const resumeContent = document.getElementById("resume-content");
const prevButton = document.getElementById("prev-button");
const nextButton = document.getElementById("next-button");
const searchInput = document.getElementById("job-search");
const errorMessage = document.getElementById("error-message");
const err = document.getElementById("error");
function displayApplicant() {
  err.classList.add("visible");
  const applicant = filteredApplicants[currentApplicantIndex];
  resumeContent.innerHTML = "";

  if (applicant) {
    const resumeContainer = document.createElement("div");
    resumeContainer.className = "resume-container";

    const headerSection = document.createElement("div");
    headerSection.className = "header";

    const nameHeader = document.createElement("h1");
    nameHeader.textContent = applicant.basics.name;
    headerSection.appendChild(nameHeader);

    const lineBreak = document.createElement("br");
    headerSection.appendChild(lineBreak);

    const jobTitle = document.createElement("p");
    jobTitle.className = "job-title";
    jobTitle.textContent = `Applied For: ${applicant.basics.AppliedFor}`;
    headerSection.appendChild(jobTitle);

    const profileImage = document.createElement("img");
    profileImage.src = applicant.basics.image;
    profileImage.className = "profile-image";
    headerSection.appendChild(profileImage);

    resumeContainer.appendChild(headerSection);

    const personalInfoRow = document.createElement("div");
    personalInfoRow.className = "row";

    const leftColumn = document.createElement("div");
    leftColumn.className = "left-column";

    const personalInfoHeading = document.createElement("h2");
    personalInfoHeading.textContent = "Personal Information";
    leftColumn.appendChild(personalInfoHeading);

    const phoneInfo = document.createElement("h6");
    phoneInfo.textContent = `${applicant.basics.phone}`;
    leftColumn.appendChild(phoneInfo);

    const emailInfo = document.createElement("h6");
    emailInfo.textContent = `${applicant.basics.email}`;
    leftColumn.appendChild(emailInfo);

    const profileInfo = document.createElement("h6");
    profileInfo.textContent = `${applicant.basics.profiles.url}`;
    leftColumn.appendChild(profileInfo);

    const skillsHeading = document.createElement("h2");
    skillsHeading.textContent = "Technical Skills";
    leftColumn.appendChild(skillsHeading);

    const skillsList = document.createElement("ul");
    applicant.skills.keywords.forEach((skill) => {
      const skillItem = document.createElement("li");
      skillItem.textContent = skill;
      skillsList.appendChild(skillItem);
    });
    leftColumn.appendChild(skillsList);

    const hobbiesHeading = document.createElement("h2");
    hobbiesHeading.textContent = "Hobbies";
    leftColumn.appendChild(hobbiesHeading);

    const hobbiesList = document.createElement("ul");
    applicant.interests.hobbies.forEach((hobby) => {
      const hobbyItem = document.createElement("li");
      hobbyItem.textContent = hobby;
      hobbiesList.appendChild(hobbyItem);
    });
    leftColumn.appendChild(hobbiesList);

    const rightColumn = document.createElement("div");
    rightColumn.className = "right-column";

    const workExpHeading = document.createElement("h3");
    workExpHeading.textContent = "Work Experience in previous company";
    rightColumn.appendChild(workExpHeading);

    const workExpItem = document.createElement("p");
    workExpItem.innerHTML = `<strong>Company Name: </strong>${applicant.work["Company Name"]}<br><br>
                              <strong>Position:</strong> ${applicant.work.Position}<br><br>
                             <strong> Start Date: </strong> ${applicant.work["Start Date"]}<br><br>
                             <strong> End Date: </strong> ${applicant.work["End Date"]}<br><br>
                              <strong>Summary: </strong> ${applicant.work.Summary}`;
    rightColumn.appendChild(workExpItem);

    const projectsHeading = document.createElement("h3");
    projectsHeading.textContent = "Projects";
    rightColumn.appendChild(projectsHeading);

    const projectItem = document.createElement("p");
    projectItem.innerHTML = `<strong>${applicant.projects.name}: </strong>${applicant.projects.description}`;
    rightColumn.appendChild(projectItem);

    const educationHeading = document.createElement("h3");
    educationHeading.textContent = "Education";
    rightColumn.appendChild(educationHeading);

    const ugItem = document.createElement("p");
    ugItem.innerHTML = `<strong>&#8226; UG: </strong>${applicant.education.UG.institute}, ${applicant.education.UG.course}, ${applicant.education.UG["Start Date"]}, ${applicant.education.UG["End Date"]}, ${applicant.education.UG.cgpa}`;
    rightColumn.appendChild(ugItem);

    const seniorSecondaryItem = document.createElement("p");
    seniorSecondaryItem.innerHTML = `<strong>&#8226; PU: </strong>${applicant.education["Senior Secondary"].institute}, ${applicant.education["Senior Secondary"].cgpa}`;
    rightColumn.appendChild(seniorSecondaryItem);

    const highSchool = document.createElement("p");
    highSchool.innerHTML = `<strong>&#8226; High School: </strong>${applicant.education["High School"].institute}, ${applicant.education["High School"].cgpa}`;
    rightColumn.appendChild(highSchool);

    const internshipHeading = document.createElement("h3");
    internshipHeading.textContent = "Internship";
    rightColumn.appendChild(internshipHeading);

    const internshipList = document.createElement("ul");
    internshipList.innerHTML = `<p><strong>&#8226; Company Name: </strong>${applicant.Internship["Company Name"]}</p>
                              <p><strong>&#8226; Position:</strong> ${applicant.Internship.Position}</p>
                             <p><strong>&#8226; Start Date: </strong> ${applicant.Internship["Start Date"]}</p>
                             <p><strong>&#8226; End Date: </strong> ${applicant.Internship["End Date"]}</p>
                             <p> <strong>&#8226; Summary: </strong> ${applicant.Internship.Summary}</p>`;
    rightColumn.appendChild(internshipList);

    const achievementsHeading = document.createElement("h3");
    achievementsHeading.textContent = "Achievements";
    rightColumn.appendChild(achievementsHeading);

    const achievementsList = document.createElement("ul");
    applicant.achievements.Summary.forEach((achievement) => {
      const achievementItem = document.createElement("p");
      const bulletPoint = document.createElement("span");
      bulletPoint.innerHTML = "<strong>&#8226; </strong>";
      achievementItem.appendChild(bulletPoint);
      achievementItem.appendChild(document.createTextNode(achievement));
      achievementsList.appendChild(achievementItem);
    });
    rightColumn.appendChild(achievementsList);

    personalInfoRow.appendChild(leftColumn);
    personalInfoRow.appendChild(rightColumn);
    resumeContainer.appendChild(personalInfoRow);

    resumeContent.appendChild(resumeContainer);
  }
}

function checkNavigationButtons() {
  if (filteredApplicants.length <= 1) {
    prevButton.style.display = "none";
    nextButton.style.display = "none";
  } else if (currentApplicantIndex === 0) {
    prevButton.style.display = "none";
    nextButton.style.display = "inline";
  } else if (currentApplicantIndex === filteredApplicants.length - 1) {
    prevButton.style.display = "inline";
    nextButton.style.display = "none";
  } else {
    prevButton.style.display = "inline";
    nextButton.style.display = "inline";
  }
}

function filterApplicants(job) {
  return applicants.filter(
    (applicant) => applicant.basics.AppliedFor.toLowerCase() === job
  );
}

prevButton.addEventListener("click", () => {
  if (currentApplicantIndex > 0) {
    currentApplicantIndex--;
    displayApplicant();
    checkNavigationButtons();
  }
});

nextButton.addEventListener("click", () => {
  if (currentApplicantIndex < filteredApplicants.length - 1) {
    currentApplicantIndex++;
    displayApplicant();
    checkNavigationButtons();
  }
});

searchInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    const jobToSearch = searchInput.value;
    if (jobToSearch.trim() === "") {
      errorMessage.textContent = "No such results found";
      resumeContent.innerHTML = "";
      err.classList.remove("visible");
      return;
    }

    filteredApplicants = filterApplicants(jobToSearch);
    if (filteredApplicants.length === 0) {
      errorMessage.textContent = "No such results found";
      resumeContent.innerHTML = "";
      err.classList.remove("visible");
    } else {
      currentApplicantIndex = 0;
      displayApplicant();
      checkNavigationButtons();
      errorMessage.textContent = "";
      err.classList.add("visible");
    }
  }
});
