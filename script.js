document.addEventListener('DOMContentLoaded', () => {
    // --- ELEMENTOS ---
    const musicPlayer = document.getElementById('musicaPlayer');
    const playBtn = document.getElementById('playBtn');
    const statsModal = new bootstrap.Modal(document.getElementById('statsModal'));

    // --- DADOS ---
    const statDetails = {
        years: { 
            title: 'Anos de Amizade', 
            text: 'Todos esses anos cheios de momentos incríveis, aprendizados e crescimento juntas.',
            img: 'images/na casa dela.jpg' 
        },
        laughs: { 
            title: 'Risadas Compartilhadas', 
            text: 'Você tem um dom para me fazer rir até doer a barriga, mesmo nos dias mais difíceis!',
            img: 'images/sorrisão.jpg' 
        },
        calls: { 
            title: 'Resenhas na minha Casa', 
            text: 'Nossas conversas onde resolvemos a vida e compartilhamos segredos são inesquecíveis.',
            img: 'images/selfie minha casa.jpg'
        },
        adventures: { 
            title: 'Aventuras Juntas', 
            text: 'Cada passeio ou simples dia diferente foi especial porque foi com você.',
            img: 'images/foto praia.jpg'
        }
    };
    
    // --- FUNÇÕES ---
    // Anima os contadores
    const animateCount = (element, target, duration = 2000) => {
        if (!element) return;
        let start = 0;
        const stepTime = Math.abs(Math.floor(duration / target));
        const timer = setInterval(() => {
            start += 1;
            element.textContent = start;
            if (start === target) {
                clearInterval(timer);
            }
        }, stepTime);
    };

    // Mostra o modal de estatísticas
    const showStat = (statType) => {
        const modalTitle = document.getElementById('statTitle');
        const modalContent = document.getElementById('statContent');
        const currentStat = statDetails[statType];
        
        if (currentStat) {
            modalTitle.textContent = currentStat.title;
            modalContent.innerHTML = `
                <p>${currentStat.text}</p>
                <img src="${currentStat.img}" class="img-fluid rounded mt-3 shadow" alt="${currentStat.title}">
            `;
            statsModal.show();
        }
    };

    // Alterna o player de música (play/pause)
    const togglePlayPause = () => {
        if (musicPlayer.paused) {
            musicPlayer.play();
            playBtn.innerHTML = '<i class="fas fa-pause"></i> Pausar';
        } else {
            musicPlayer.pause();
            playBtn.innerHTML = '<i class="fas fa-play"></i> Tocar';
        }
    };

    // --- EVENTOS (OUVINTES) ---
    document.getElementById('checkFriendshipBtn').addEventListener('click', function () {
        const meterFill = document.getElementById('friendshipMeter');
        meterFill.style.width = '100%';
        setTimeout(() => { meterFill.textContent = '∞% AMIZADE VERDADEIRA'; }, 500);
    });

    playBtn.addEventListener('click', togglePlayPause);
    
    document.querySelectorAll('[data-stat]').forEach(card => {
        card.addEventListener('click', () => showStat(card.dataset.stat));
    });

    document.getElementById('surpriseBtn').addEventListener('click', () => {
        startConfetti();
        setTimeout(() => {
            alert('SURPRESA!\n\nVocê é a melhor amiga que alguém poderia pedir! Obrigada por tudo! ❤️');
            setTimeout(stopConfetti, 4000);
        }, 500);
    });
    
    // --- INICIALIZAÇÃO ---
    animateCount(document.getElementById('yearsCount'), 5);
    animateCount(document.getElementById('laughsCount'), 999);
    animateCount(document.getElementById('callsCount'), 500);
    animateCount(document.getElementById('adventuresCount'), 100);
    document.getElementById('year').textContent = new Date().getFullYear();

    // --- LÓGICA DOS CONFETES ---
    const canvas = document.getElementById('confetti-canvas');
    const ctx = canvas.getContext('2d');
    let confettiActive = false;
    let particles = [];
    const colors = ['#FFD6E0', '#FF9BB3', '#FF6B8B', '#D4BBFF', '#BBE6FF'];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function startConfetti() {
        resizeCanvas();
        particles = [];
        for (let i = 0; i < 200; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height - canvas.height,
                r: Math.random() * 6 + 4,
                d: Math.random() * 5 + 2,
                color: colors[Math.floor(Math.random() * colors.length)],
                tilt: Math.random() * 20 - 10,
                tiltAngle: 0,
                tiltAngleIncrement: Math.random() * 0.07 + 0.05
            });
        }
        canvas.style.display = 'block';
        if (!confettiActive) {
            confettiActive = true;
            requestAnimationFrame(animateConfetti);
        }
    }

    function animateConfetti() {
        if (!confettiActive) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach((p, i) => {
            p.y += p.d;
            p.tiltAngle += p.tiltAngleIncrement;
            p.tilt = Math.sin(p.tiltAngle) * 15;
            ctx.beginPath();
            ctx.lineWidth = p.r;
            ctx.strokeStyle = p.color;
            ctx.moveTo(p.x + p.tilt, p.y);
            ctx.lineTo(p.x, p.y + p.tilt / 2);
            ctx.stroke();
            if (p.y > canvas.height) {
                particles[i] = { ...p, x: Math.random() * canvas.width, y: -20 };
            }
        });
        requestAnimationFrame(animateConfetti);
    }

    function stopConfetti() {
        confettiActive = false;
        setTimeout(() => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            canvas.style.display = 'none';
        }, 1000);
    }
    
    window.addEventListener('resize', resizeCanvas);
});
