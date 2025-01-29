const students = [
    "Асилбек Аяулым", "Батырбек Әсем", "Жилкибай Нұрдаулет", "Кенжебек Ғалия", "Нурмахан Айғаным", 
    "Нурмахан Жұлдыз", "Сатыбалды Нұрғиса", "Сирлибаев Жанасил", "Темірбек Мұхаммед", "Темеш Аружан", 
    "Төребек Саян", "Хашимжанова Дилноза"
];

const studentContainer = document.getElementById('students');

// Загружаем рейтинги из localStorage
const loadRatings = () => JSON.parse(localStorage.getItem('ratings')) || {};

// Сохраняем рейтинги в localStorage
const saveRatings = (ratings) => {
    localStorage.setItem('ratings', JSON.stringify(ratings));
};

const ratings = loadRatings();

students.forEach(name => {
    const studentDiv = document.createElement('div');
    studentDiv.classList.add('student');

    const nameSpan = document.createElement('span');
    nameSpan.classList.add('student-name');
    nameSpan.textContent = name;

    const ratingContainer = document.createElement('div');
    ratingContainer.classList.add('rating-container');

    const ratingCountDisplay = document.createElement('span');
    ratingCountDisplay.classList.add('rating-count');

    const deleteButton = document.createElement('button');
    deleteButton.textContent = "-";
    deleteButton.classList.add('delete-button');
    deleteButton.style.display = 'none';

    const clearButton = document.createElement('button');
    clearButton.textContent = "C";
    clearButton.classList.add('clear-button');
    clearButton.style.display = 'none';

    let ratingCount = ratings[name] || 0;

    const updateRatingDisplay = () => {
        ratingContainer.innerHTML = '';
        
        for (let i = 0; i < ratingCount; i++) {
            const ratingDiv = document.createElement('div');
            ratingDiv.classList.add('rating');

            if (i >= 9) ratingDiv.style.backgroundColor = 'blue';
            else if (i >= 6) ratingDiv.style.backgroundColor = 'green';
            else if (i >= 3) ratingDiv.style.backgroundColor = 'orange';
            else ratingDiv.style.backgroundColor = 'red';

            ratingContainer.appendChild(ratingDiv);
        }

        ratingCountDisplay.textContent = `(${ratingCount})`;

        deleteButton.style.display = ratingCount > 0 ? 'flex' : 'none';
        clearButton.style.display = ratingCount > 0 ? 'flex' : 'none';
    };

    updateRatingDisplay();

    studentDiv.addEventListener('click', () => {
        if (ratingCount < 10) {
            ratingCount++;
            ratings[name] = ratingCount;
            saveRatings(ratings);
            updateRatingDisplay();
        }
    });

    deleteButton.addEventListener('click', (e) => {
        e.stopPropagation();
        if (ratingCount > 0) {
            ratingCount--;
            ratings[name] = ratingCount;
            saveRatings(ratings);
            updateRatingDisplay();
        }
    });

    clearButton.addEventListener('click', (e) => {
        e.stopPropagation();
        ratingCount = 0;
        ratings[name] = ratingCount;
        saveRatings(ratings);
        updateRatingDisplay();
    });

    studentDiv.appendChild(nameSpan);
    studentDiv.appendChild(ratingContainer);
    studentDiv.appendChild(ratingCountDisplay);
    studentDiv.appendChild(deleteButton);
    studentDiv.appendChild(clearButton);
    studentContainer.appendChild(studentDiv);
});
