// --- LÓGICA DO SLIDER ---
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
let autoSlide;

// Função para iniciar ou reiniciar o cronômetro do slider
function startAutoSlide() {
    clearInterval(autoSlide); // Limpa o temporizador atual
    autoSlide = setInterval(() => changeSlide(1, false), 6000); // Define um novo de 6s
}

function showSlide(index) {
    slides.forEach(s => s.classList.remove('active'));
    
    if (index >= slides.length) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = slides.length - 1;
    } else {
        currentSlide = index;
    }
    
    slides[currentSlide].classList.add('active');
}

// Função para mudar o slide (n é a direção, manual indica se foi clique do usuário)
function changeSlide(n, manual = true) {
    showSlide(currentSlide + n);
    
    // Se o usuário interagiu, resetamos o tempo para não pular rápido demais
    if (manual) {
        startAutoSlide();
    }
}

// Inicializa o slider automático ao carregar a página
startAutoSlide();


// --- MENU HAMBÚRGUER (MOBILE) ---
const hamburger = document.getElementById('hamburger-menu');
const navList = document.getElementById('nav-list');

hamburger.addEventListener('click', () => {
    navList.classList.toggle('active');
});


// --- SUBMENUS (MOBILE) ---
document.querySelectorAll('.dropdown > a, .dropdown-inner > a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        // Aplica a lógica apenas em telas menores (Mobile/Tablet)
        if (window.innerWidth <= 768) {
            e.preventDefault();
            e.stopPropagation();
            
            const parent = this.parentElement;
            parent.classList.toggle('active');
            
            // Seleciona o submenu imediato (nível 1 ou nível 2)
            const submenu = parent.querySelector('.submenu') || parent.querySelector('.submenu-level2');
            
            if (parent.classList.contains('active')) {
                // Define a altura máxima baseada no conteúdo real para a animação CSS funcionar
                submenu.style.maxHeight = submenu.scrollHeight + "px";
                
                // Se for um submenu interno (nível 2), precisamos expandir o pai também
                const grandParent = parent.closest('.submenu');
                if (grandParent) {
                    grandParent.style.maxHeight = (grandParent.scrollHeight + submenu.scrollHeight) + "px";
                }
            } else {
                submenu.style.maxHeight = "0";
            }
        }
    });
});