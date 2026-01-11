// NAVIGATION
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("navMenu");

menuBtn.addEventListener("click", () => {
    nav.classList.toggle("open");
    menuBtn.textContent = nav.classList.contains("open") ? "X" : "☰";
});

// FOOTER DATES
document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent =
    "Last Modification: " + document.lastModified;

// COURSE LIST ARRAY
const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        completed: false
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        completed: false
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        completed: false
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        completed: false
    }
];

// DISPLAY COURSES
const courseList = document.getElementById("courseList");
const totalCredits = document.getElementById("totalCredits");

function displayCourses(list) {
    courseList.innerHTML = "";

    list.forEach(course => {
        const div = document.createElement("div");
        div.className = "course";
        if (course.completed) div.classList.add("completed");
        div.textContent = `${course.subject} ${course.number}`;
        courseList.appendChild(div);
    });

    const credits = list.reduce((sum, c) => sum + c.credits, 0);
    totalCredits.textContent = `The total credits for courses listed above is ${credits}`;
}

// Initial load
displayCourses(courses);

// FILTER BUTTONS
document.querySelectorAll(".filters button").forEach(btn => {
    btn.addEventListener("click", () => {
        const filter = btn.dataset.filter;
        if (filter === "all") {
            displayCourses(courses);
        } else {
            displayCourses(courses.filter(c => c.subject === filter));
        }
    });
});
