document.addEventListener('DOMContentLoaded', () => {
    // ----- ELEMENTOS -----
    const statsModal = new bootstrap.Modal(document.getElementById('statsModal'));

    // ----- DADOS -----
    const memories = [
        "Lembro daquele dia em que eu tava triste, você colocou Hello Kitty pra assistirmos.",
        "Quando você me deu a primeira cartinha que eu recebi na vida.",
        "O passeio em Salvador com toda a rapaziada.",
    ];

    // ----- FUNÇÕES -----
    const animateCount = (element, target, duration = 2000) => {
        if (!element) return;
        let start = 0;
        const stepTime = 16;
        const increment = target / (duration / stepTime);
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                clearInterval(timer);
                start = target;
            }
            element.textContent = Math.floor(start);
        }, stepTime);
    };

   const showStat = (statType) => {
    const modalTitle = document.getElementById('statTitle');
    const modalContent = document.getElementById('statContent');
    
    const statsData = {
        years: { 
            title: 'Anos de Amizade', 
            text: 'Todos esses anos cheios de momentos incríveis, aprendizados e crescimento juntos.',
            img: 'images/na casa dela.jpg'
        },
        laughs: { 
            title: 'Risadas Compartilhadas', 
            text: 'Você tem um dom para me fazer rir até doer a barriga, mesmo nos dias mais difíceis.',
            img: 'images/foda né.jpg'
        },
        calls: { 
            title: 'Idas a minha casa para resenhar', 
            text: 'Essas conversas profundas onde resolvemos a vida e compartilhamos nossos segredos são inesquecíveis.',
            img: 'images/sorrisão.jpg'
        },
        adventures: { 
            title: 'Aventuras Juntos', 
            text: 'Cada viagem, passeio ou simples dia diferente foi especial porque foi com você.',
            img: 'images/foto praia.jpg'
        }
    };

    const currentStat = statsData[statType];
    if (currentStat) {
        const count = document.getElementById(`${statType}Count`).textContent;
        modalTitle.textContent = currentStat.title;
        
        modalContent.innerHTML = `
            <p>São mais de <strong>${count}</strong> momentos!</p>
            <p>${currentStat.text}</p>
            <img src="${currentStat.img}" class="img-fluid rounded mt-3 shadow" alt="${currentStat.title}">
        `;
        statsModal.show();
    }
};

    // ----- EVENTOS -----
    document.getElementById('checkFriendshipBtn').addEventListener('click', function () {
        const meterFill = document.getElementById('friendshipMeter');
        meterFill.style.width = '100%';
        setTimeout(() => { meterFill.textContent = '∞% AMIZADE'; }, 500);
    });

    document.getElementById('addPhotoBtn').addEventListener('click', () => alert('Depois que você me enviar mais fotos nossas, vou adicioná-las aqui! ❤️'));

    document.getElementById('randomMemoryBtn').addEventListener('click', () => {
        const randomMemory = memories[Math.floor(Math.random() * memories.length)];
        alert(randomMemory);
    });

    document.getElementById('surpriseBtn').addEventListener('click', () => {
        startConfetti();
        setTimeout(() => {
            alert('SURPRESA!\n\nVocê é a melhor amiga que alguém poderia pedir! Eu te amo muito! ❤️');
            setTimeout(stopConfetti, 3000);
        }, 500);
    });

    document.querySelectorAll('[data-stat]').forEach(card => {
        card.addEventListener('click', () => showStat(card.dataset.stat));
    });

    // ----- INICIALIZAÇÃO -----
    animateCount(document.getElementById('yearsCount'), 5);
    animateCount(document.getElementById('laughsCount'), 9999);
    animateCount(document.getElementById('callsCount'), 500);
    animateCount(document.getElementById('adventuresCount'), 100);

    // ----- LÓGICA DO CONFETE -----
    const confettiCanvas = document.getElementById('confetti-canvas');
    const confettiContext = confettiCanvas.getContext('2d');
    let confettiActive = false;
    let confettiParticles = [];
    const colors = ['#ff85a2', '#ffd6e0', '#ff4d8d', '#a2ffd6', '#d6a2ff', '#a2d6ff', '#fff585'];

    function resizeCanvas() {
        confettiCanvas.width = window.innerWidth;
        confettiCanvas.height = window.innerHeight;
    }

    function startConfetti() {
        resizeCanvas();
        confettiParticles = [];
        for (let i = 0; i < 200; i++) {
            confettiParticles.push({
                x: Math.random() * confettiCanvas.width,
                y: Math.random() * confettiCanvas.height - confettiCanvas.height,
                r: Math.random() * 6 + 4,
                d: Math.random() * 5 + 2,
                color: colors[Math.floor(Math.random() * colors.length)],
                tilt: Math.random() * 20 - 10,
                tiltAngle: 0,
                tiltAngleIncrement: Math.random() * 0.07 + 0.05
            });
        }
        confettiCanvas.style.display = 'block';
        if (!confettiActive) {
            confettiActive = true;
            requestAnimationFrame(animateConfetti);
        }
    }

    function animateConfetti() {
        if (!confettiActive) return;
        confettiContext.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
        confettiParticles.forEach((p, i) => {
            p.y += p.d;
            p.tiltAngle += p.tiltAngleIncrement;
            p.tilt = Math.sin(p.tiltAngle) * 15;
            confettiContext.beginPath();
            confettiContext.lineWidth = p.r;
            confettiContext.strokeStyle = p.color;
            confettiContext.moveTo(p.x + p.tilt, p.y);
            confettiContext.lineTo(p.x, p.y + p.tilt / 2);
            confettiContext.stroke();
            if (p.y > confettiCanvas.height) {
                confettiParticles[i] = { ...p, x: Math.random() * confettiCanvas.width, y: -20 };
            }
        });
        requestAnimationFrame(animateConfetti);
    }

    function stopConfetti() {
        confettiActive = false;
        setTimeout(() => {
            confettiContext.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
            confettiCanvas.style.display = 'none';
        }, 1000);
    }
    window.addEventListener('resize', resizeCanvas);
});